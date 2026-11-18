<template>
  <div ref="gHeroHolder" class="w-full h-full ">
    <svg
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <template v-if="showKeyLines">
        <line
          v-for="kp in keyPositions"
          :key="`${kp.type}_${kp.row}_${kp.col}`"
          :x1="kp.x + kp.width / 2"
          :x2="kp.x + kp.width / 2"
          :y1="dotRadius/2"
          :y2="keyRowY(kp)"
          class="stroke-olivetti-shade-20 dark:stroke-olivetti-shade-40"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />

        <circle
         v-for="kp in keyPositions"
          :key="`${kp.type}_${kp.row}_${kp.col}`"
          :cx="kp.x + kp.width / 2"
          :cy="0"
          :r="dotRadius/4"
           class="fill-white "
        />

        <circle
         v-for="kp in keyPositions"
          :key="`${kp.type}_${kp.row}_${kp.col}`"
          :cx="kp.x + kp.width / 2"
          :cy="keyboardTopY"
          :r="dotRadius/4"
          class="fill-olivetti-shade-30 dark:fill-olivetti-shade-40"
        />
      </template>

      <!--
      <line
        :x1="0"
        :x2="width"
        :y1="hitLineY"
        :y2="hitLineY"
        stroke="#fff"
        stroke-width="1"
        stroke-dasharray="4 4"
      />
      -->

      <!-- shape particles -->
      <template v-for="p in particlesWithProgress" :key="p.id">
        <rect
          v-if="p.kind === 'carriageReturn'"
          :x="p.x - 6"
          :y="p.y - 6"
          width="12"
          height="12"
          :class="particleFill(p.kind)"
        />
        <rect
          v-else-if="p.kind === 'space'"
          :x="p.x - spaceRectWidth / 2"
          :y="p.y - dotRadius"
          :width="spaceRectWidth"
          :height="dotRadius * 1.5"
          :rx="dotRadius*0.75"
          :ry="dotRadius*0.75"
          :class="particleFill(p.kind)"
        />
        <circle
          v-else
          :cx="p.x"
          :cy="p.y"
          :r="dotRadius"
          :class="particleFill(p.kind)"
        />
      </template>

      <!-- text particles-->
      <template v-for="p in particlesWithProgress" :key="p.id">
        <text
          v-if="p.kind !== 'shift'"
          :x="p.x"
          :y="p.y"
          text-anchor="middle"
          dominant-baseline="central"
          fill="white"
        >
          {{ p.char }}
        </text>
      </template>


    </svg>
  </div>
</template>

<script lang="ts" setup>
  import type { KeyPosition } from '~/utils/keyboardLayouts/types'
  import { useMelodyTimeline } from '~/composables/useMelodyTimeline'
  import { useMelodyPlayer } from '~/composables/useMelodyPlayer'

  const dotRadius = 12;

  const props = withDefaults(defineProps<{
    playMode?: 'idle' | 'play' | 'pause'
    playCount?: number
    lineIndex?: number
    shadeChars?: string
    columnsWidth?: number
    rowIndex?: number
    rowsHeight?: number
    asciiImageString?: string
    keyPositions?: KeyPosition[]
    /** KeyboardNeo's own measured rendered height (px) - GuitarHeroNeo overlaps
     *  KeyboardNeo and shares its full height (see playerNeo.vue), so the
     *  keyboard's top edge within this svg's own coordinates is derived by
     *  subtracting this from the svg's own height, rather than trusting a
     *  hardcoded offset that has to be kept in sync by hand */
    keyboardHeight?: number
    /** beats per minute driving the base rhythm */
    bpm?: number
    /** longest a run of the same key plays consecutively before a forced rest */
    maxRunBeats?: number
    /** rest beats appended after each row, to allow the carriage-return action */
    carriageReturnBeats?: number
    /** how many beats a dot takes to fall from top to bottom */
    fallBeats?: number
  }>(), {
    playMode: 'idle',
    playCount: 0,
    lineIndex: 0,
    shadeChars: '@%#*+=-:. ',
    columnsWidth: 48,
    rowIndex: 0,
    rowsHeight: 5,
    // fake 5x5 placeholder ascii image, used until index.vue's real one is wired through
    asciiImageString: () => ['#####', '#...#', '#.@.#', '#...#', '#####'].join('\n'),
    keyPositions: () => [],
    keyboardHeight: 0,
    bpm: 120, // 90
    maxRunBeats: 4,
    carriageReturnBeats: 4,
    fallBeats: 4,
  })

  const emit = defineEmits<{
    'update:lineIndex': [value: number]
    'update:rowIndex': [value: number]
    /** fired on every beat that actually sounds - note, shift companion, or carriageReturn */
    sound: [event: SoundEvent]
  }>()

  const gHeroHolder = ref<HTMLElement | null>(null)
  const { width, height } = useElementSize(gHeroHolder)

  // draw one vertical line per key x-location once playback starts and
  // keyboardEvo has reported non-empty positions
  const showKeyLines = ref(false)
  watch(() => props.playMode, (mode) => {
    showKeyLines.value = mode !== 'idle' && props.keyPositions.length > 0
  })

  const { timeline, findResumeIndex } = useMelodyTimeline(
    () => props.asciiImageString,
    () => props.keyPositions,
    () => ({ bpm: props.bpm, maxRunBeats: props.maxRunBeats, carriageReturnBeats: props.carriageReturnBeats })
  )

  const player = useMelodyPlayer(timeline, {
    fallBeats: props.fallBeats,
    carriageReturnX: () => width.value / 2,
    onNote: (_rowIndex, newLineIndex) => emit('update:lineIndex', newLineIndex),
    onCarriageReturn: (newRowIndex) => {
      emit('update:rowIndex', newRowIndex)
      // next row's first note starts counting from 0 again
      emit('update:lineIndex', 0)
    },
    onSound: (event) => emit('sound', event),
  })

  // also keyed off `timeline` (not just playMode): play() only snapshots
  // timeline.value at call time, so if it's still stale when play is
  // pressed (e.g. keyPositions hasn't finished settling right after page
  // load), the session would otherwise be stuck with wrong note x-positions
  // until the next manual pause/resume. Re-issuing play() here whenever
  // timeline changes while already playing reschedules from the current
  // position with corrected data instead.
  watch([() => props.playMode, timeline], ([mode]) => {
    if (mode === 'play') {
      player.play(findResumeIndex(props.rowIndex, props.lineIndex)).catch((err) => {
        console.error('guitarHeroNeo: failed to start playback', err)
      })
    } else if (mode === 'pause') {
      player.pause()
    } else {
      player.stopAll()
    }
  })

  // where the keyboard's top edge sits within this svg's own coordinates --
  // the falling particles themselves (and the second row of small circles
  // marking where they land) stop here, right above the keyboard, instead of
  // running the full svg height
  const keyboardTopY = computed(() => Math.max(height.value - props.keyboardHeight, 0))

  // each key-guide line still continues past that landing point, behind the
  // keyboard, down to that key's own actual row position -- kp.y is measured
  // relative to KeyboardNeo's own container, so keyboardTopY has to be added
  // back in before it's usable in this svg's coordinates
  const keyRowY = (kp: KeyPosition) => keyboardTopY.value + kp.y

  const hitLineY = computed(() => Math.max(height.value - 4, 0))

  const particleColors: Record<string, string> = {
    note: 'fill-olivetti-shade-50 dark:fill-olivetti-shade-30',
    shift: 'fill-olivetti-red',
    carriageReturn: 'fill-amber-500',
    space: 'fill-olivetti-shade-50 dark:fill-olivetti-shade-30',
  }
  const particleFill = (kind: string) => particleColors[kind] ?? 'fill-white'

  // spacebar's own falling particle renders as a rounded rect instead of a
  // dot, sized off the spacebar key's own measured width (from keyPositions)
  // rather than a fixed constant, so it stays proportional across layouts/
  // keysNumber configs
  const spaceRectWidth = computed(() => {
    const spaceKey = props.keyPositions.find((kp) => kp.type === 'space')
    return spaceKey ? (spaceKey.width * 2) / 3 : dotRadius * 2
  })

  // each particle's y is derived from wall-clock progress between its
  // spawn/land timestamps and the current animation frame - kept separate
  // from Tone.Transport time so paused, already-falling dots keep moving
  const particlesWithProgress = computed(() =>
    player.particles.value.map((p) => {
      const span = p.landAt - p.spawnAt
      const progress = span > 0 ? Math.min(1, Math.max(0, (player.nowMs.value - p.spawnAt) / span)) : 1
      return { id: p.id, x: p.x, y: progress * keyboardTopY.value, kind: p.kind, char: p.char }
    })
  )

  defineExpose({
    durationEstimate: computed(() => timeline.value.totalDurationSeconds),
  })
</script>

<style>

</style>
