// Per-key data model for keyboardNeo.vue's presets.
//
// Unlike keyboardLayouts/types.ts's KeyDef, there is no KeyType here: special
// keys (backspace, shiftHold, shiftToggle, spacer, space) are no longer part
// of a layout's data. How many keys a row has, and which slots are content
// vs. control, is now driven by keysNumber (see app/utils/typewriterModels.ts
// and KeyboardNeo's own row-geometry logic) rather than by the layout preset.
// A preset here is purely "what content sits in each content slot."

export interface KeyContent {
  lower: string
  upper: string
}

export type KeyRowNeo = KeyContent[]

// Always 4 rows (number/upper/home/lower) -- no spacebar row. Each row is
// padded/truncated to the column-wise max row length across
// KEYS_NUMBER_ITEMS: [12, 11, 12, 11].
export type KeyboardLayoutNeo = KeyRowNeo[]

// Emitted by keyboardNeo.vue for every key currently reachable in the active
// densityChars ramp. Unlike keyboardLayouts/types.ts's KeyPosition (x/y = a
// key's top-left corner), x/y here are already the key's own center,
// relative to the keyboard container. width/height are the key's measured
// box -- kept (rather than dropped, as a center-only point would) so a
// consumer expecting the legacy top-left+box shape (see playerNeo.vue's
// toLegacyKeyPositions) can still reconstruct it.
//
// 'shiftToggle' is a single fixed entry standing in for the physical
// uppercaseToggle (red) key -- not part of densityChars, but still reported
// so GuitarHeroNeo/buildMelodyTimeline can target it for the companion
// "shift" particle (see keyboardNeo.vue's keyPositions).
export interface KeyPositionNeo {
  key: string
  isUpper: boolean
  x: number
  y: number
  width: number
  height: number
  row: number
  col: number
  type: 'char' | 'space' | 'shiftToggle'
}
