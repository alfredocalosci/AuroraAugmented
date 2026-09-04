import type { KeyboardLayout } from './types'

// First-draft Portuguese QWERTY layout — the layout HCESAR was legally
// mandated to displace but that, per the sourcing in hcesarPT.ts, both
// dominated the market immediately before 1937 and reportedly persisted
// underground (via swappable keycaps) during the mandate itself, before
// becoming Portugal's official standard again from the 1970s-80s onward.
// This file models that layout as it exists in well-documented modern form
// — much higher confidence than hcesarPT.ts, since this is essentially
// today's standard Portuguese keyboard rather than a single-source
// reconstruction of an obsolete mechanical one.
//
// Sources:
//  - Microsoft, "Portuguese Keyboard Layout" (kbdpo, the official Windows
//    driver reference): gave a full base/shift table for the digit row
//    (1-0, ', «) and located the dead keys — acute (´), tilde (~),
//    circumflex (^), grave (`), diaeresis (¨) — plus ç/Ç and º/ª relative
//    to neighboring keys.
//    https://learn.microsoft.com/en-us/globalization/keyboards/kbdpo.html
//  - English Wikipedia, "Portuguese keyboard layout": confirms ç has its
//    own dedicated key (the only use of cedilla in Portuguese), plus
//    dedicated keys for º/ª and «».
//    https://en.wikipedia.org/wiki/Portuguese_keyboard_layout
//  - Typing Hero, "QWERTY-PT": independently confirms ç "right of L," the
//    dead-key set (´ ~ ^ `) covering ã õ á é í ó ú â ê ô à, and that this
//    dead-key system "covers every accented character" Portuguese needs.
//    https://typingheroapp.com/blog/qwerty-pt-layout/
//
// MODELING SIMPLIFICATION: the real modern keyboard layers some of these
// dead keys via AltGr (a third state this kit's KeyDef model doesn't have —
// only lower/upper), so where Microsoft's reference put two dead keys on
// the same physical key via base vs. AltGr, I combined them into one
// slot's lower/upper here (same technique azertyFR.ts already uses for its
// circumflex/diaeresis key).
//
// REVISION: the top row was originally capped at 11 slots (this kit's
// original fixed-grid skeleton), which left no room for a circumflex key
// at all — it was dropped rather than modeled. The project owner decided
// that skeleton is worth relaxing rather than treated as immovable — see
// METHODOLOGY.md §2 for the reasoning. The top row is now 12 slots, with a
// bare circumflex key added at the end. Flagging this honestly: adding the
// key does NOT actually enable typing â/ê/ô in this app. This kit's KeyDef
// schema only supports a fixed lower/upper pair per key, not a true dead
// key that combines with whatever's typed next — the same fundamental
// limitation already noted for ewertPL.ts's and qwertzCZ.ts's dead keys.
// The new key exists for physical-key completeness only (the real
// keyboard genuinely has a dedicated circumflex position), lowest priority
// of all six presets touched in this revision pass, and it's included with
// that caveat rather than oversold as functional.
//
// Confidence: HIGH for the unswapped QWERTY letters, ç's position, «»'s
// pairing/position, and the digit row (all directly sourced and cross-
// checked across the three sources above). MEDIUM for exactly which two
// marks share a combined dead-key slot (a modeling choice, not a sourced
// fact). LOW/VERIFY for the bottom-row punctuation, where I fell back to
// this kit's qwertyES.ts (its closest Iberian sibling) as a plausible
// default rather than inventing something with no basis at all.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const qwertyPT: KeyboardLayout = [
  [
    { type: 'char', lower: '1', upper: '!' },
    { type: 'char', lower: '2', upper: '"' },
    { type: 'char', lower: '3', upper: '#' },
    { type: 'char', lower: '4', upper: '$' },
    { type: 'char', lower: '5', upper: '%' },
    { type: 'char', lower: '6', upper: '&' },
    { type: 'char', lower: '7', upper: '/' },
    { type: 'char', lower: '8', upper: '(' },
    { type: 'char', lower: '9', upper: ')' },
    { type: 'char', lower: '0', upper: '=' },
    { type: 'char', lower: '´', upper: '~' }, // acute/tilde dead-key combo, MEDIUM confidence — see header note
    { type: 'char', lower: "'", upper: '?' },
    { type: 'char', lower: '«', upper: '»' }, // HIGH confidence pairing and position, see header note
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
    { type: 'char', lower: '`', upper: '¨' }, // grave/diaeresis dead-key combo, MEDIUM confidence — see header note
    { type: 'char', lower: '^', upper: '^' }, // restored, existence-only placeholder — does NOT enable â/ê/ô, see REVISION note
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
    { type: 'char', lower: 'ç', upper: 'Ç' }, // HIGH confidence, see header note
    { type: 'char', lower: 'º', upper: 'ª' }, // HIGH confidence, see header note
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
    { type: 'char', lower: ',', upper: ';' }, // VERIFY — no sourced content, see header note
    { type: 'char', lower: '.', upper: '=' }, // VERIFY
    { type: 'char', lower: ':', upper: '%' }, // VERIFY
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
