<template>
  <div
    class="keyboard-neo @container w-full pt-3 lg:pt-6"
    ref="kbHolder"
    :style="cssVars"
  >
    <div
      class="keyboard-row flex font-mono"
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      :style="{ paddingLeft: rowPaddingLeft(rowIndex) }"
    >
      <div
        class="key shrink-0 flex items-center justify-center m-0.5 text-[clamp(0.7rem,3cqw,1.15rem)] font-normal rounded-full shadow-lg/30"
        v-for="(key, keyIndex) in row"
        :key="`${rowIndex}_${keyIndex}`"
        :ref="(el) => { keysR[refKey(rowIndex, keyIndex)] = el as HTMLElement | null }"
        :style="keyStyle(key)"
        :class="keyClasses(key)"
        @mousedown="onKeyMouseDown(key)"
        @mouseup="onKeyMouseUp(key)"
        @click="onKeyClick(key)"
      >{{ keyGlyph(key) }}</div>
    </div>

    <!-- spacebar row: only row centered as a whole, per spec -->
    <div class="keyboard-row flex justify-center font-mono mt-3">
      <div
        class="key shrink-0 rounded-full shadow-lg/30 flex items-center justify-center"
        :ref="(el) => { keysR['k_space'] = el as HTMLElement | null }"
        :style="spacebarStyle"
        :class="keyClasses({ type: 'char' })"
      >&nbsp;</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { presetsNeo, type KeyContent, type KeyPositionNeo } from '~/utils/keyboardLayoutsNeo'
  import { getLayoutDensityChars } from '~/utils/keyboardLayouts/layoutChars'

  // Char keys carry the preset content they display ('as they came' — first N
  // entries of the matching preset row, uppercase shown by default; lowercase
  // toggle is a follow-up). Other types are still geometry-only placeholders.
  type NeoKeyType = 'char' | 'uppercaseLock' | 'uppercaseToggle' | 'spaceBack'
  interface NeoKeyDef {
    type: NeoKeyType
    content?: KeyContent
  }

  // showUppercase: which char set (upper/lower) to display — owned by the
  // parent page (e.g. playerNeo.vue's keyPressed handling), not this
  // component, since shift state lives with the rest of playback state.
  // densityChars: as in keyboardEvo.vue — the parent-owned ramp this
  // keyboard's keys are being driven against.
  // playMode: while not 'idle', char keys outside densityChars dim to a
  // lighter gray so the reachable ramp stands out during playback.
  // activeSound: last beat reported as sounding during playback (see
  // guitarHeroNeo's `sound` emit, relayed through the parent) -- mirrors
  // keyboardEvo.vue's prop of the same name. type 'carriageReturn' isn't a
  // keyboard key, so it's ignored here.
  const { showUppercase = true, densityChars = 'Ñ@#W$9876543210?!abc;:+=-,._ ', playMode = 'idle', activeSound = null } = defineProps<{
    showUppercase?: boolean
    densityChars?: string
    playMode?: 'idle' | 'play' | 'pause'
    activeSound?: SoundEvent | null
  }>()

  // Special-key interactions are emitted, not handled locally, since
  // showUppercase (and whatever the spaceBack key ends up doing) is owned by
  // the parent page — mirrors the physical Shift/arrow keyPressed/keyReleased
  // handling in playerNeo.vue.
  const emit = defineEmits<{
    uppercaseTogglePressed: []
    uppercaseToggleReleased: []
    uppercaseLockClicked: []
    spaceBackClicked: []
    availableChars: [chars: string]
    keyPositions: [positions: KeyPositionNeo[]]
  }>()

  function onKeyMouseDown(key: NeoKeyDef) {
    if (key.type === 'uppercaseToggle') emit('uppercaseTogglePressed')
  }

  function onKeyMouseUp(key: NeoKeyDef) {
    if (key.type === 'uppercaseToggle') emit('uppercaseToggleReleased')
  }

  function onKeyClick(key: NeoKeyDef) {
    if (key.type === 'uppercaseLock') emit('uppercaseLockClicked')
    else if (key.type === 'spaceBack') emit('spaceBackClicked')
  }

  const { keysNumber, selectedPreset } = useActiveTypewriterSettings()

  // selectedPreset can be 'custom' (legacy KeyboardEvo editing state, not
  // supported by keyboardLayoutsNeo yet) — fall back to the default preset
  // in that case.
  const activePreset = computed(() => presetsNeo[selectedPreset.value as keyof typeof presetsNeo] ?? presetsNeo.qwertyES)

  const kbHolder = ref<HTMLElement | null>(null)
  const { width } = useElementSize(kbHolder)

  // element refs for every key currently rendered, keyed by refKey(row, col)
  // (plus a fixed 'k_space' entry for the spacebar) -- read by keyPositions
  // below to measure each key's actual on-screen center.
  const keysR = ref<Record<string, HTMLElement | null>>({})
  const refKey = (rowIndex: number, keyIndex: number) => `k_${rowIndex}_${keyIndex}`

  // A row can host at most 14 regular key-widths (12 base + 2 uppercaseLock on
  // the 46-key home row) — key size is always derived from that fixed cap, not
  // from the current config's actual row width, so keys stay the same size
  // across 42..46 configs and only the row length changes.
  const MAX_ROW_KEY_UNITS = 14

  // --key-pitch is the full per-key slot (14 of them span the container);
  // --key-size is that slot minus the m-0.5 gap (0.25rem) each key already
  // carries, so key + gap together add back up to exactly one pitch instead
  // of overflowing the row by one gap's width per key.
  const keyPitchPx = computed(() => width.value ? width.value / MAX_ROW_KEY_UNITS : 0)

  const cssVars = computed(() => ({
    '--key-pitch': `${keyPitchPx.value}px`,
    '--key-size': 'calc(var(--key-pitch) - 0.25rem)',
  }))

  // number / upper / home / lower, top to bottom — each row's stagger
  // relative to the others, before the whole-assembly recenter below.
  // Row 0 (number) is handled separately: on the 42/43/44-key machines its
  // base count drops to 10/11 (a real typewriter trait — no dedicated 1/0
  // key, see spanish preset), so it needs a full extra key of push to keep
  // the remaining number keys landing over the right letters.
  const ROW_PADDING_UNITS = [null, 2 / 3, 0, 0]
  const NUMBER_ROW_PADDING_UNITS_SHORT = 4 / 3 // 10-11 keys (up to 44 global count)
  const NUMBER_ROW_PADDING_UNITS_FULL = 1 / 3 // 12 keys (45-46 global count)

  const rowPaddingUnits = (rowIndex: number, row: NeoKeyDef[]) =>
    rowIndex === 0
      ? (row.length <= 11 ? NUMBER_ROW_PADDING_UNITS_SHORT : NUMBER_ROW_PADDING_UNITS_FULL)
      : ROW_PADDING_UNITS[rowIndex] ?? 0

  // First `count` entries of the preset row, as they came from the preset
  // (no reordering/reconciliation yet).
  const charRow = (presetRow: KeyContent[], count: number): NeoKeyDef[] =>
    presetRow.slice(0, count).map((content) => ({ type: 'char', content }))

  // Row 0 (number row) needs different shortening logic than every other
  // row: on a real shortened typewriter, the dedicated '1' key is the first
  // one dropped (a lowercase 'l' fills in for it) rather than whatever
  // happens to sit at the end of the row -- so 2-9-0 stay put and a trailing
  // symbol survives in the freed slot instead. Only '1' gets this special
  // treatment; if further shortening is still needed, it falls back to the
  // normal tail-trim.
  const numberRow = (presetRow: KeyContent[], count: number): NeoKeyDef[] => {
    if (presetRow.length <= count) return charRow(presetRow, count)

    const oneIndex = presetRow.findIndex((c) => c.lower === '1')
    if (oneIndex === -1) return charRow(presetRow, count)

    const withoutOne = [...presetRow.slice(0, oneIndex), ...presetRow.slice(oneIndex + 1)]
    return charRow(withoutOne, count)
  }

  // number/upper/home/lower rows, with the extra control keys spliced in:
  // - upper gets a trailing spaceBack
  // - home gets an uppercaseLock at both ends
  // - lower gets an uppercaseToggle at both ends
  const rows = computed<NeoKeyDef[][]>(() => {
    const [numberCount, upperCount, homeCount, lowerCount] = getKeysRowConfig(keysNumber.value)
    const [numberContentRow, upperRow, homeRow, lowerRow] = activePreset.value

    return [
      numberRow(numberContentRow!, numberCount!),
      [...charRow(upperRow!, upperCount!), { type: 'spaceBack' }],
      [{ type: 'uppercaseLock' }, ...charRow(homeRow!, homeCount!), { type: 'uppercaseLock' }],
      [{ type: 'uppercaseToggle' }, ...charRow(lowerRow!, lowerCount!), { type: 'uppercaseToggle' }],
    ]
  })

  // Every char (upper + lower) actually reachable on the keyboard as currently
  // rendered -- i.e. after keysNumber has already trimmed/padded each preset
  // row above, not the full untrimmed preset. Reuses getLayoutDensityChars by
  // handing it a minimal legacy-shaped view of `rows` (only `type`/`lower`/
  // `upper` matter to it).
  const availableChars = computed(() => getLayoutDensityChars(
    rows.value.map((row) => row.map((key) => key.type === 'char'
      ? { type: 'char' as const, lower: key.content?.lower, upper: key.content?.upper }
      : { type: 'spacer' as const }))
  ))

  watch(availableChars, (chars) => emit('availableChars', chars), { immediate: true })

  const findKey = (predicate: (key: NeoKeyDef) => boolean) => {
    for (const [r, row] of rows.value.entries()) {
      for (const [c, key] of row.entries()) {
        if (predicate(key)) return { row: r, col: c, key }
      }
    }
    return null
  }

  // center of `el`, relative to kbHolder's own box -- getBoundingClientRect
  // (not offsetLeft/offsetTop) because, unlike keyboardEvo's rows, a Neo row
  // isn't a positioned ancestor, so offsetTop would land relative to the row
  // itself (always ~0) rather than the keyboard as a whole.
  const centerOf = (el: HTMLElement, holderRect: DOMRect) => {
    const rect = el.getBoundingClientRect()
    return {
      x: rect.left - holderRect.left + rect.width / 2,
      y: rect.top - holderRect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
    }
  }

  // one entry per densityChars char actually present on the keyboard, plus
  // the spacebar when ' ' is in densityChars -- mirrors keyboardEvo's
  // keyPositions, but reports each key's own center instead of a top-left
  // corner + width.
  const keyPositions = computed<KeyPositionNeo[]>(() => {
    const holder = kbHolder.value
    if (!holder) return []
    // keyPitchPx tracks container resize (via useElementSize's `width`) --
    // read here so this computed re-measures the DOM after a resize, same
    // as keyboardEvo's keyPositions reading `width.value` directly.
    void keyPitchPx.value

    const holderRect = holder.getBoundingClientRect()
    const positions: KeyPositionNeo[] = []

    for (const char of densityChars) {
      const match = findKey((key) => key.type === 'char' && (key.content?.lower === char || key.content?.upper === char))
      if (!match) continue

      const el = keysR.value[refKey(match.row, match.col)]
      if (!el) continue

      const { x, y, width, height } = centerOf(el, holderRect)
      positions.push({
        key: char,
        isUpper: match.key.content?.upper === char,
        x, y, width, height,
        row: match.row,
        col: match.col,
        type: 'char',
      })
    }

    if (densityChars.includes(' ')) {
      const spaceEl = keysR.value['k_space']
      if (spaceEl) {
        const { x, y, width, height } = centerOf(spaceEl, holderRect)
        positions.push({ key: ' ', isUpper: false, x, y, width, height, row: rows.value.length, col: 0, type: 'space' })
      }
    }

    // fixed shift-toggle entry (the red uppercaseToggle key) so GuitarHeroNeo
    // can spawn a companion "shift" particle alongside a note's own, landing
    // on the physical key that must be held for an uppercase char -- both
    // uppercaseToggle keys act as the same physical key (see flashKey below),
    // so only the first match is reported, same as keyboardEvo.vue's shiftUp
    // entry did.
    const shiftToggleMatch = findKey((key) => key.type === 'uppercaseToggle')
    if (shiftToggleMatch) {
      const shiftEl = keysR.value[refKey(shiftToggleMatch.row, shiftToggleMatch.col)]
      if (shiftEl) {
        const { x, y, width, height } = centerOf(shiftEl, holderRect)
        positions.push({
          key: '⬆', isUpper: true, x, y, width, height,
          row: shiftToggleMatch.row, col: shiftToggleMatch.col, type: 'shiftToggle',
        })
      }
    }

    return positions
  })

  // emits on mount, then again whenever the underlying positions change
  // (densityChars, layout, keysNumber, or container resize). flush: 'post'
  // (not the default 'pre') matters here: useElementSize corrects its width
  // ref synchronously on mount (via offsetWidth), but that only updates the
  // JS value - the --key-pitch/--key-size CSS vars bound in `cssVars` only
  // reach the actual DOM on Vue's next render-effect flush. A 'pre'-flush
  // read (the default) can run getBoundingClientRect() before that patch
  // lands, measuring keys still collapsed to zero width from the first
  // paint - only the spacebar (flex-centered against the container's real,
  // non-JS-driven width) comes out right in that case. 'post' guarantees
  // the DOM is already patched before every measurement.
  watch(keyPositions, (data) => {
    emit('keyPositions', data)
  }, { immediate: true, flush: 'post' })

  // flashes a key's border on each sound -- driven imperatively via the Web
  // Animations API (not a reactive class + CSS transition), same as
  // keyboardEvo.vue's flashKey: activeSound is a fresh object every beat even
  // when the char repeats, so a class binding wouldn't retrigger a CSS
  // transition, but animate() always plays a new instance regardless.
  const FLASH_BG_COLOR = '#f97316' // tailwind orange-500
  const FLASH_DURATION_MS = 300

  const flashKey = (elKey: string) => {
    const el = keysR.value[elKey]
    if (!el) return
    const restingColor = getComputedStyle(el).backgroundColor
    el.animate(
      [{ backgroundColor: FLASH_BG_COLOR }, { backgroundColor: restingColor }],
      { duration: FLASH_DURATION_MS, easing: 'ease-out' }
    )
  }

  watch(() => activeSound, (sound) => {
    if (!sound || sound.type !== 'note') return

    if (sound.char === ' ') {
      flashKey('k_space')
      return
    }

    const match = findKey((key) => key.type === 'char' && (key.content?.lower === sound.char || key.content?.upper === sound.char))
    if (match) flashKey(refKey(match.row, match.col))

    // both uppercaseToggle keys (one at each end of the lower row) act as the
    // same physical Shift key -- flashing the first found is enough to show
    // "shift was needed", same as keyboardEvo.vue flashing only its single
    // canonical '⬆' shiftToggle entry
    if (sound.needsShift) {
      const shiftKey = findKey((key) => key.type === 'uppercaseToggle')
      if (shiftKey) flashKey(refKey(shiftKey.row, shiftKey.col))
    }
  })

  const keyWidthUnits = (key: NeoKeyDef) => key.type === 'uppercaseToggle' ? 4 / 3 : 1
  const rowWidthUnits = (row: NeoKeyDef[]) => row.reduce((sum, key) => sum + keyWidthUnits(key), 0)

  // Row length changes with keysNumber, but ROW_PADDING_UNITS (each row's
  // left offset) doesn't — so the assembly's visible bounding box drifts
  // rightward as keys are added while its left edge stays put. This shift is
  // added to every row's own padding so that bounding box (leftmost to
  // rightmost key, across all 4 rows) ends up centered in kbHolder's
  // MAX_ROW_KEY_UNITS-wide span, without touching the stagger between rows.
  const recenterUnits = computed(() => {
    let minLeft = Infinity
    let maxRight = -Infinity

    rows.value.forEach((row, rowIndex) => {
      const start = rowPaddingUnits(rowIndex, row)
      const end = start + rowWidthUnits(row)
      minLeft = Math.min(minLeft, start)
      maxRight = Math.max(maxRight, end)
    })

    if (!Number.isFinite(minLeft) || !Number.isFinite(maxRight)) return 0
    return MAX_ROW_KEY_UNITS / 2 - (minLeft + maxRight) / 2
  })

  const rowPaddingLeft = (rowIndex: number) => {
    const row = rows.value[rowIndex] ?? []
    return `calc(var(--key-pitch) * ${rowPaddingUnits(rowIndex, row) + recenterUnits.value})`
  }

  const keyStyle = (key: NeoKeyDef) => ({
    width: key.type === 'uppercaseToggle' ? 'calc(var(--key-size) * 4 / 3)' : 'var(--key-size)',
    height: 'var(--key-size)',
  })

  const keyGlyph = (key: NeoKeyDef) => {
    switch (key.type) {
      case 'char': return (showUppercase ? key.content?.upper : key.content?.lower) ?? ''
      case 'uppercaseLock': return '↑'
      case 'spaceBack': return '→'
      case 'uppercaseToggle': return ''
    }
  }

  // Spacebar reuses keyClasses with a content-less 'char' key (see template)
  // — it stands for the space character, so a missing content falls back to
  // ' ' rather than being treated as "no char". Checked against both cases
  // (not just whichever showUppercase is currently displaying) since a key
  // is "reachable" for densityChars purposes regardless of shift state.
  const isKeyInDensityChars = (key: NeoKeyDef) => {
    if (!key.content) return densityChars.includes(' ')
    return [key.content.upper, key.content.lower].some((char) => !!char && densityChars.includes(char))
  }

  const keyClasses = (key: NeoKeyDef) => ({
    'bg-olivetti-shade-50 dark:bg-olivetti-shade-40 text-white': key.type === 'char' && (playMode === 'idle' || isKeyInDensityChars(key)),
    'bg-olivetti-shade-20 dark:bg-olivetti-shade-50 text-white/60 dark:text-olivetti-shade-30/50': key.type === 'char' && playMode !== 'idle' && !isKeyInDensityChars(key),
    'bg-olivetti-shade-30 dark:bg-olivetti-shade-40 text-white': key.type === 'spaceBack' || (key.type === 'uppercaseLock' && showUppercase),
    'bg-olivetti-shade-30 dark:bg-mist-800 text-white': key.type === 'uppercaseLock' && !showUppercase,
    'bg-olivetti-red': key.type === 'uppercaseToggle',
    'cursor-pointer': key.type === 'uppercaseToggle' || key.type === 'uppercaseLock' || key.type === 'spaceBack',
  })

  const SPACEBAR_WIDTH_UNITS = 9.5

  const spacebarStyle = computed(() => ({
    width: `calc(var(--key-pitch) * ${SPACEBAR_WIDTH_UNITS})`,
    height: 'calc(var(--key-size) * 0.75)',
  }))
</script>

<style>

</style>
