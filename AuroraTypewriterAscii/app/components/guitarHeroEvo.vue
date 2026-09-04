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
          :y2="height - dotRadius/2"
          class="stroke-black/10"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />

        <circle
         v-for="kp in keyPositions"
          :key="`${kp.type}_${kp.row}_${kp.col}`"
          :cx="kp.x + kp.width / 2"
          :cy="dotRadius/2"
          :r="dotRadius/4"
           class="fill-gray-500"
        />

        <circle
         v-for="kp in keyPositions"
          :key="`${kp.type}_${kp.row}_${kp.col}`"
          :cx="kp.x + kp.width / 2"
          :cy="height - dotRadius/2"
          :r="dotRadius/4"
          class="fill-gray-500"
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

      <template v-for="p in particlesWithProgress" :key="p.id">
        <rect
          v-if="p.kind === 'carriageReturn'"
          :x="p.x - 6"
          :y="p.y - 6"
          width="12"
          height="12"
          :fill="particleFill(p.kind)"
        />
        <circle
          v-else
          :cx="p.x"
          :cy="p.y"
          :r="dotRadius"
          :fill="particleFill(p.kind)"
        />
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

  watch(() => props.playMode, (mode) => {
    if (mode === 'play') {
      player.play(findResumeIndex(props.rowIndex, props.lineIndex)).catch((err) => {
        console.error('guitarHeroEvo: failed to start playback', err)
      })
    } else if (mode === 'pause') {
      player.pause()
    } else {
      player.stopAll()
    }
  })

  const hitLineY = computed(() => Math.max(height.value - 4, 0))

  const particleColors: Record<string, string> = {
    note: '#ffffff',
    shift: '#cc0000',
    carriageReturn: '#f59e0b',
  }
  const particleFill = (kind: string) => particleColors[kind] ?? '#ffffff'

  // each particle's y is derived from wall-clock progress between its
  // spawn/land timestamps and the current animation frame - kept separate
  // from Tone.Transport time so paused, already-falling dots keep moving
  const particlesWithProgress = computed(() =>
    player.particles.value.map((p) => {
      const span = p.landAt - p.spawnAt
      const progress = span > 0 ? Math.min(1, Math.max(0, (player.nowMs.value - p.spawnAt) / span)) : 1
      return { id: p.id, x: p.x, y: progress * height.value, kind: p.kind }
    })
  )

  defineExpose({
    durationEstimate: computed(() => timeline.value.totalDurationSeconds),
  })
</script>

<style>

</style>
