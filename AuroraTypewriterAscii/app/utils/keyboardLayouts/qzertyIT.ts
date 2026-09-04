import type { KeyboardLayout } from './types'

// First-draft Italian QZERTY layout, toward an authentic mid-20th-century
// mechanical typewriter, replacing the previous italian.ts (which, despite
// its "first-draft, based on the modern keyboard" disclaimer, used a
// QWERTY letter order — historically wrong for Italy). Renamed per project
// convention: the first five keys of the top letter row are genuinely
// Q-Z-E-R-T on Italian typewriters, not Q-W-E-R-T.
//
// Sources:
//  - Wikipedia, "QZERTY": confirms the three structural traits — "Z and W
//    are swapped; M is moved from the right of N to the right of L; number
//    keys are shifted" — and states QZERTY was "the traditional typewriter
//    layout in Italy," carrying over into early Italian computer keyboards
//    (including early Apple ones) before standard QWERTY took over.
//    https://en.wikipedia.org/wiki/QZERTY
//  - Wikipedia, "Olivetti Lettera 22" (the archetypal mid-century Italian
//    portable, 1950): explicitly states "For the Italian market the
//    keyboard is in the QZERTY layout, as with most Italian machines," and
//    that it "lacks the numbers 0 and 1, which are supposed to be
//    substituted by uppercase 'O' and lowercase 'l'."
//    https://en.wikipedia.org/wiki/Olivetti_Lettera_22
//  - HandWiki, "Engineering:Olivetti typewriters": independently confirms
//    the missing '1' key (via l/I) on the 1935 Studio 42 AND the 1972
//    Lettera 35 — i.e. this wasn't a one-model quirk, it held across
//    Olivetti's typewriter line for decades. Also states the Lettera 35's
//    "accented uppercase vowels... were replaced by normal letters followed
//    by the apostrophe" — i.e. there was no direct uppercase-accented key.
//    https://handwiki.org/wiki/Engineering:Olivetti_typewriters
//  - CasaTempo, "Mind Your Layout": confirms QZERTY has "direct, dedicated
//    keys for accented Italian vowels including è, é, ç, à, ù, ì, and ò"
//    (no dead keys), and that "the Z and W swap places, and the M is
//    pushed to the right side of the home row."
//    https://casatempo.com/blogs/journal/mind-your-layout-qwerty-qwertz-azerty-and-qzerty-explained
//
// STRUCTURAL CONFIDENCE, high: the Z/W swap, M's relocation to the home
// row, digits living on Shift (not the base row, like azertyFR.ts), the
// missing 1 and 0 keys, and the existence of seven dedicated accented-
// letter keys (ì è é ç à ù ò) are all independently sourced and, in the
// case of the missing '1', confirmed across two different decades/models.
//
// STRUCTURAL CONFIDENCE, low — row 0's EXACT layout below: none of the
// sources above give a character-by-character table, only the *inventory*
// of what must be present (7 accent letters + digits 2-9 + missing-1/
// missing-0 slots). The specific order I've arranged them in is my own
// plausible reconstruction, not a sourced fact — treat the whole row as a
// first draft to check against an actual photographed machine (e.g. via
// typewriterdatabase.com's Olivetti listings), not just the individual
// VERIFY-flagged slots. Where '1' and '0' would be, I followed this kit's
// spanish.ts precedent: the physical key still exists and still produces
// something, so lower === upper there (no distinct shift function) rather
// than a spacer.
//
// Row 1's slot after 'p' and row 2's slot after 'm' have no sourced
// content (every accented letter I found a source for is already placed in
// row 0) — flagged VERIFY with a placeholder.
//
// CORRECTED: row 3 originally shipped with only 9 char slots after M moved
// out (should be 10, matching every other preset's bottom row) — an
// oversight from removing M without backfilling. Fixed with a VERIFY
// placeholder in M's old spot rather than leaving the grid one slot short.
//
// Uppercase accented vowels are NOT represented as an accented capital
// anywhere (per the Lettera 35 note above) — where digits don't occupy the
// shift position, lower === upper is used instead of guessing a capital
// that likely didn't exist as a single keystroke.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const qzertyIT: KeyboardLayout = [
  [
    { type: 'char', lower: 'ì', upper: 'ì' }, // where '1' would be — no dedicated 1 key, see header note
    { type: 'char', lower: 'è', upper: '2' },
    { type: 'char', lower: 'é', upper: '3' },
    { type: 'char', lower: 'à', upper: '4' },
    { type: 'char', lower: 'ò', upper: '5' },
    { type: 'char', lower: 'ù', upper: '6' },
    { type: 'char', lower: 'ç', upper: '7' },
    { type: 'char', lower: '°', upper: '8' }, // VERIFY — filler symbol, see header note on row 0's reconstruction
    { type: 'char', lower: '§', upper: '9' }, // VERIFY — filler symbol, see header note
    { type: 'char', lower: "'", upper: "'" }, // where '0' would be — no dedicated 0 key, see header note
    { type: 'char', lower: '-', upper: '_' },
    { type: 'char', lower: '=', upper: '+' }, // VERIFY
    { type: 'spacer' },
  ],
  [
    { type: 'char', lower: 'q', upper: 'Q' },
    { type: 'char', lower: 'z', upper: 'Z' }, // Z/W swap — HIGH confidence, see header note
    { type: 'char', lower: 'e', upper: 'E' },
    { type: 'char', lower: 'r', upper: 'R' },
    { type: 'char', lower: 't', upper: 'T' },
    { type: 'char', lower: 'y', upper: 'Y' },
    { type: 'char', lower: 'u', upper: 'U' },
    { type: 'char', lower: 'i', upper: 'I' },
    { type: 'char', lower: 'o', upper: 'O' },
    { type: 'char', lower: 'p', upper: 'P' },
    { type: 'char', lower: '*', upper: '*' }, // VERIFY — no sourced content for this slot, see header note
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
    { type: 'char', lower: 'm', upper: 'M' }, // M relocated to the home row — HIGH confidence, see header note
    { type: 'char', lower: '"', upper: '"' }, // VERIFY — no sourced content for this slot, see header note
    { type: 'shiftHold', glyph: '↑' },
  ],
  [
    { type: 'shiftToggle', glyph: '⬆' },
    { type: 'char', lower: 'w', upper: 'W' }, // Z/W swap — HIGH confidence, see header note
    { type: 'char', lower: 'x', upper: 'X' },
    { type: 'char', lower: 'c', upper: 'C' },
    { type: 'char', lower: 'v', upper: 'V' },
    { type: 'char', lower: 'b', upper: 'B' },
    { type: 'char', lower: 'n', upper: 'N' },
    { type: 'char', lower: '!', upper: '!' }, // VERIFY — bugfix: row was one slot short (see file header), filling M's old spot with a plausible placeholder rather than leaving the grid misaligned
    { type: 'char', lower: ',', upper: ';' }, // VERIFY
    { type: 'char', lower: '.', upper: ':' }, // VERIFY
    { type: 'char', lower: '?', upper: '?' }, // VERIFY — freed by M's relocation, no sourced content
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
