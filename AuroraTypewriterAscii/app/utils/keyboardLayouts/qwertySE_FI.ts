import type { KeyboardLayout } from './types'

// Second-draft Swedish/Finnish layout, renamed per project convention
// (first 5 keys + ISO codes). Same research pass as qwertyDK_NO.ts —
// Nordic typewriter history was far less documented than the other
// countries in this kit despite real effort, so this is a lighter
// citation-and-flagging revision rather than a ground-up reconstruction.
// See qwertyDK_NO.ts for the fuller explanation of that research gap,
// the DK/NO-vs-SE/FI split sourcing, and the Halda export-market findings
// (QZERTY for Italy/France, AZERTY for another French-market model) that
// turned out not to describe the Nordic domestic keyboard I was looking for.
//
// Changes from the previous draft: only the dead-key slot at the end of
// row 0, same reasoning as qwertyDK_NO.ts and qwertzDE.ts: ´ (acute) is
// plausible for the typewriter era, its paired backtick (`) is flagged
// rather than asserted since no source in this kit's research ever
// confirmed a typewriter-era use for it. Everything else (the leftmost
// §/½ key, digit-row shifts, ä/ö placement, bottom-row punctuation) is
// UNCHANGED and remains at first-draft confidence.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const qwertySE_FI: KeyboardLayout = [
  [
    { type: 'char', lower: '§', upper: '½' }, // VERIFY — thin sourcing, see qwertyDK_NO.ts header note
    { type: 'char', lower: '1', upper: '!' },
    { type: 'char', lower: '2', upper: '"' },
    { type: 'char', lower: '3', upper: '#' },
    { type: 'char', lower: '4', upper: '¤' }, // VERIFY
    { type: 'char', lower: '5', upper: '%' },
    { type: 'char', lower: '6', upper: '&' },
    { type: 'char', lower: '7', upper: '/' },
    { type: 'char', lower: '8', upper: '(' },
    { type: 'char', lower: '9', upper: ')' },
    { type: 'char', lower: '0', upper: '=' },
    { type: 'char', lower: '+', upper: '?' }, // VERIFY
    { type: 'char', lower: '´', upper: '`' }, // ´ plausible, ` VERIFY — see qwertyDK_NO.ts header note
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
    { type: 'char', lower: 'å', upper: 'Å' }, // HIGH confidence — shared with qwertyDK_NO.ts, see its header note
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
    { type: 'char', lower: 'ö', upper: 'Ö' }, // HIGH confidence, see qwertyDK_NO.ts header note
    { type: 'char', lower: 'ä', upper: 'Ä' }, // HIGH confidence, see qwertyDK_NO.ts header note
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
    { type: 'char', lower: ',', upper: ';' }, // VERIFY
    { type: 'char', lower: '.', upper: ':' }, // VERIFY
    { type: 'char', lower: '-', upper: '_' },
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
