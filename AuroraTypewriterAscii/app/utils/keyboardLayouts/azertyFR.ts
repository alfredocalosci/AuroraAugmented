import type { KeyboardLayout } from './types'

// Second-draft French AZERTY layout, revised toward an authentic mid-20th-
// century mechanical typewriter, replacing the previous "first-draft, based
// on the modern standard keyboard" placeholder.
//
// IMPORTANT CAVEAT that doesn't apply to the US/UK/German drafts: France
// never had one true national AZERTY standard until AFNOR's NF Z71-300 in
// 2019. For a century before that, "each manufacturer settled things on its
// own" (azerty.global) — an Olympia catalog cited via Beeching's *Century of
// the Typewriter* documents "at least six different versions of the
// Swiss-French keyboard alone" (retrotechgeneva.net). So there is no single
// "the mid-century French typewriter layout" the way there arguably is for
// the US after Remington's 1893 consolidation. This file represents ONE
// well-documented reference machine — the 1951 Hermes Baby, a very common
// French-market portable — rather than a claimed universal standard.
//
// Sources:
//  - azerty.global, "History of the AZERTY Keyboard: Origins, Myths and
//    Variants" — traces AZERTY to the 1890s (entrenched by 1907), confirms
//    the digits-as-Shift convention is "documented on the 1951 Hermes Baby,"
//    and explicitly states the ² key "did not exist on documented mechanical
//    AZERTY models; emerged in the computer era."
//    https://azerty.global/en/azerty-history
//  - Typewriter Database, "1951 Hermes Baby" listing (a real cataloged
//    unit, serial #5218979) — confirms a circumflex/diaeresis dead key
//    "next to the P," and separately notes this specific unit's number row
//    was incomplete (no working '1').
//    https://typewriterdatabase.com/1951-hermes-baby.22759.typewriter
//  - Retro Tech Geneva, "Variations on typewriter keyboard layouts" —
//    documents the extent of manufacturer variation across Swiss-French
//    machines specifically.
//    https://www.retrotechgeneva.net/2010/11/variations-on-typewriter-keyboard.html
//
// Changes from the previous draft, and confidence level for each:
//  - Removed the ² key entirely (-> spacer). HIGH confidence: azerty.global
//    explicitly states this is a computer-era addition, absent from
//    documented mechanical AZERTY typewriters.
//  - Kept the structural swaps (A/Q, Z/W, M relocated to the home row) and
//    the digits-as-Shift row-0 convention. HIGH confidence: both predate
//    computers by decades and are directly confirmed for a 1951 machine.
//  - Kept the circumflex/diaeresis dead key (^/¨) after P. Confidence
//    UPGRADED to HIGH — directly confirmed by the Typewriter Database's
//    description of a real cataloged 1951 Hermes Baby ("the only 'dead' key
//    ... is the circumflex/tremolo key, next to the P").
//  - Kept ù at the position after M. MEDIUM-HIGH confidence: azerty.global
//    says this "likely recycl[ed] a slot from the American apostrophe,"
//    which matches where an apostrophe sits in the QWERTY layouts in this
//    kit.
//  - LOW CONFIDENCE / UNVERIFIED, not changed: the exact symbol-to-digit
//    pairing for é/2, "/3, '/4, etc., and the entire bottom-row punctuation
//    (,/?, ;/., :/, !/§). These match the modern French convention and are
//    plausible for 1951 given the general shape was already set by then,
//    but given the documented manufacturer-to-manufacturer variation above,
//    treat these as a reasonable starting point to check against a specific
//    machine (e.g. Hermes Baby photos on typewriterdatabase.com), not a
//    verified fact.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const azertyFR: KeyboardLayout = [
  [
    { type: 'spacer' }, // no ² key on a mechanical typewriter — see header note
    { type: 'char', lower: '&', upper: '1' }, // VERIFY exact pairing — see header note on manufacturer variation
    { type: 'char', lower: 'é', upper: '2' }, // VERIFY
    { type: 'char', lower: '"', upper: '3' }, // VERIFY
    { type: 'char', lower: "'", upper: '4' }, // VERIFY
    { type: 'char', lower: '(', upper: '5' }, // VERIFY
    { type: 'char', lower: '-', upper: '6' }, // VERIFY
    { type: 'char', lower: 'è', upper: '7' }, // VERIFY
    { type: 'char', lower: '_', upper: '8' }, // VERIFY
    { type: 'char', lower: 'ç', upper: '9' }, // VERIFY
    { type: 'char', lower: 'à', upper: '0' }, // VERIFY
    { type: 'char', lower: ')', upper: '°' }, // VERIFY
    { type: 'char', lower: '=', upper: '+' }, // VERIFY
    { type: 'spacer' },
  ],
  [
    { type: 'char', lower: 'a', upper: 'A' },
    { type: 'char', lower: 'z', upper: 'Z' },
    { type: 'char', lower: 'e', upper: 'E' },
    { type: 'char', lower: 'r', upper: 'R' },
    { type: 'char', lower: 't', upper: 'T' },
    { type: 'char', lower: 'y', upper: 'Y' },
    { type: 'char', lower: 'u', upper: 'U' },
    { type: 'char', lower: 'i', upper: 'I' },
    { type: 'char', lower: 'o', upper: 'O' },
    { type: 'char', lower: 'p', upper: 'P' },
    { type: 'char', lower: '^', upper: '¨' }, // dead key, HIGH confidence — see header note
    { type: 'backspace', glyph: '←' },
  ],
  [
    { type: 'shiftHold', glyph: '↑' },
    { type: 'char', lower: 'q', upper: 'Q' },
    { type: 'char', lower: 's', upper: 'S' },
    { type: 'char', lower: 'd', upper: 'D' },
    { type: 'char', lower: 'f', upper: 'F' },
    { type: 'char', lower: 'g', upper: 'G' },
    { type: 'char', lower: 'h', upper: 'H' },
    { type: 'char', lower: 'j', upper: 'J' },
    { type: 'char', lower: 'k', upper: 'K' },
    { type: 'char', lower: 'l', upper: 'L' },
    { type: 'char', lower: 'm', upper: 'M' },
    { type: 'char', lower: 'ù', upper: '%' }, // MEDIUM-HIGH confidence — see header note
    { type: 'shiftHold', glyph: '↑' },
  ],
  [
    { type: 'shiftToggle', glyph: '⬆' },
    { type: 'char', lower: 'w', upper: 'W' },
    { type: 'char', lower: 'x', upper: 'X' },
    { type: 'char', lower: 'c', upper: 'C' },
    { type: 'char', lower: 'v', upper: 'V' },
    { type: 'char', lower: 'b', upper: 'B' },
    { type: 'char', lower: 'n', upper: 'N' },
    { type: 'char', lower: ',', upper: '?' }, // VERIFY — no source found for this row
    { type: 'char', lower: ';', upper: '.' }, // VERIFY
    { type: 'char', lower: ':', upper: '/' }, // VERIFY
    { type: 'char', lower: '!', upper: '§' }, // VERIFY
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
