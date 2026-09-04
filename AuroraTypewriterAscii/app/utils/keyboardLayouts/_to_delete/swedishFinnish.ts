import type { KeyboardLayout } from './types'

// First-draft Swedish/Finnish layout, based on the modern standard keyboard
// (not verified against a real mechanical typewriter — a first draft to
// fine-tune by hand, per the project convention set in spanish.ts). Split
// out from a single "scandinavian" preset because Swedish/Finnish and
// Danish/Norwegian place *different* accented letters on the same physical
// keys: this layout uses ä/Ä and ö/Ö (see danishNorwegian.ts for the æ/ø
// variant) — å/Å is shared and sits in the same slot in both. Control keys
// are copied verbatim from spanish.ts.
export const swedishFinnish: KeyboardLayout = [
  [
    { type: 'char', lower: '§', upper: '½' },
    { type: 'char', lower: '1', upper: '!' },
    { type: 'char', lower: '2', upper: '"' },
    { type: 'char', lower: '3', upper: '#' },
    { type: 'char', lower: '4', upper: '¤' },
    { type: 'char', lower: '5', upper: '%' },
    { type: 'char', lower: '6', upper: '&' },
    { type: 'char', lower: '7', upper: '/' },
    { type: 'char', lower: '8', upper: '(' },
    { type: 'char', lower: '9', upper: ')' },
    { type: 'char', lower: '0', upper: '=' },
    { type: 'char', lower: '+', upper: '?' },
    { type: 'char', lower: '´', upper: '`' },
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
    { type: 'char', lower: 'å', upper: 'Å' },
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
    { type: 'char', lower: 'ö', upper: 'Ö' },
    { type: 'char', lower: 'ä', upper: 'Ä' },
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
    { type: 'char', lower: '.', upper: ':' },
    { type: 'char', lower: '-', upper: '_' },
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
