import type { KeyboardLayout } from './types'

// keyboard.vue's original hardcoded keys_lower/keys_upper, converted into the
// unified KeyDef model. This is the Spanish market standard (ñ/Ñ, ¿, ª/º) —
// note the missing dedicated 1/0 keys, an authentic mechanical-typewriter
// trait (typed via l/O on the real machines) rather than an omission.
export const spanish: KeyboardLayout = [
  [
    { type: 'char', lower: '*', upper: '*' },
    { type: 'char', lower: 'ª', upper: 'º' },
    { type: 'char', lower: '2', upper: '"' },
    { type: 'char', lower: '3', upper: '/' },
    { type: 'char', lower: '4', upper: '(' },
    { type: 'char', lower: '5', upper: ')' },
    { type: 'char', lower: '6', upper: '&' },
    { type: 'char', lower: '7', upper: '-' },
    { type: 'char', lower: '8', upper: '¿' },
    { type: 'char', lower: '9', upper: '?' },
    { type: 'char', lower: '-', upper: '!' },
    { type: 'char', lower: 'ç', upper: '$' },
    { type: 'spacer' },
  ],
  [
    { type: 'char', lower: 'q', upper: 'Q' },
    { type: 'char', lower: 'w', upper: 'W' },
    { type: 'char', lower: 'e', upper: 'E' },
    { type: 'char', lower: 'r', upper: 'R' },
    { type: 'char', lower: 't', upper: 'T' },
    { type: 'char', lower: 'y', upper: 'Y' },
    { type: 'char', lower: 'u', upper: 'U' },
    { type: 'char', lower: 'i', upper: 'I' },
    { type: 'char', lower: 'o', upper: 'O' },
    { type: 'char', lower: 'p', upper: 'P' },
    { type: 'char', lower: '`', upper: '^' },
    { type: 'backspace', glyph: '←' },
  ],
  [
    { type: 'shiftHold', glyph: '↑' },
    { type: 'char', lower: 'a', upper: 'A' },
    { type: 'char', lower: 's', upper: 'S' },
    { type: 'char', lower: 'd', upper: 'D' },
    { type: 'char', lower: 'f', upper: 'F' },
    { type: 'char', lower: 'g', upper: 'G' },
    { type: 'char', lower: 'h', upper: 'H' },
    { type: 'char', lower: 'j', upper: 'J' },
    { type: 'char', lower: 'k', upper: 'K' },
    { type: 'char', lower: 'l', upper: 'L' },
    { type: 'char', lower: 'ñ', upper: 'Ñ' },
    { type: 'char', lower: '´', upper: '¨' },
    { type: 'shiftHold', glyph: '↑' },
  ],
  [
    { type: 'shiftToggle', glyph: '⬆' },
    { type: 'char', lower: 'z', upper: 'Z' },
    { type: 'char', lower: 'x', upper: 'X' },
    { type: 'char', lower: 'c', upper: 'C' },
    { type: 'char', lower: 'v', upper: 'V' },
    { type: 'char', lower: 'b', upper: 'B' },
    { type: 'char', lower: 'n', upper: 'N' },
    { type: 'char', lower: 'm', upper: 'M' },
    { type: 'char', lower: ',', upper: ';' },
    { type: 'char', lower: '.', upper: '=' },
    { type: 'char', lower: ':', upper: '%' },
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
