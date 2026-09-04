// Unified per-key data model for keyboardEvo.vue, replacing keyboard.vue's
// two parallel keys_lower/keys_upper character grids. Each physical key is
// one KeyDef holding both cases plus an explicit type, instead of relying on
// sentinel characters (←, ⬆, ⬇, ↑, ¶) that doubled as both data and glyph.

export type KeyType =
  | 'char'        // a real character key: has lower/upper
  | 'backspace'
  | 'shiftToggle' // the two dedicated shift keys (fixed glyph, not case-dependent)
  | 'shiftHold'
  | 'spacer'      // occupies a grid cell but renders invisible/non-interactive
  | 'space'

export interface KeyDef {
  type: KeyType
  lower?: string  // set when type === 'char'
  upper?: string  // set when type === 'char'
  glyph?: string  // fixed display glyph for non-'char' types, e.g. '←', '⬆', '⬇', '↑'
}

export type KeyRow = KeyDef[]

// A full layout's last row is always the spacebar row: [{ type: 'space' }]
export type KeyboardLayout = KeyRow[]

export interface KeyPosition {
  key: string
  isUpper: boolean
  x: number
  y: number
  width: number
  row: number
  col: number
  kChar: string
  type: KeyType
}
