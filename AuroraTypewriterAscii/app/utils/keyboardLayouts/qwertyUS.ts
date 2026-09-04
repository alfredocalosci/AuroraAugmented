import type { KeyboardLayout } from './types'

// Second-draft US QWERTY layout, revised toward an authentic mid-20th-century
// (c. 1930s-1960s) American office typewriter — e.g. Underwood, Royal,
// Remington, Smith-Corona standard machines — replacing the previous
// "first-draft, based on the modern ANSI keyboard" placeholder.
//
// Sources:
//  - Yasuoka & Yasuoka, "On the Prehistory of QWERTY", ZINBUN 42 (2011),
//    Kyoto University — primary-source patent research showing the letter
//    arrangement (QWERTYUIOP/ASDFGHJKL/ZXCVBNM) was already fixed by the 1882
//    Remington Standard No. 2 as "the QWERTY keyboard arrangement as seen
//    nowadays" — i.e. identical to the modern letter layout, so the letter
//    rows below are UNCHANGED from the previous draft.
//    https://repository.kulib.kyoto-u.ac.jp/server/api/core/bitstreams/dc434be9-80cd-499b-a984-f9fa35954c3b/content
//  - Deskthority wiki, "QWERTY" (evolution history): confirms the same
//    timeline and notes the number row's shifted symbols were still
//    settling into their modern-ish assignments through this period.
//    https://deskthority.net/wiki/QWERTY
//
// Changes from the previous draft, and confidence level for each:
//  - Removed the backtick/tilde key (`/~) entirely (-> spacer). HIGH
//    confidence: no mechanical typewriter had a dedicated backtick or tilde
//    key — this pairing is a teleprinter/computer-terminal-era addition with
//    no typewriter-era use.
//  - Removed the bracket key ([/{) after P (-> spacer). MEDIUM-HIGH
//    confidence: the classic American QWERTYUIOP row ends at P with no
//    extra key: square brackets were added later for computer keyboards.
//    VERIFY against a specific reference machine if precision matters —
//    some technical/multilingual models may differ.
//  - Replaced 6's shifted caret (^) with the cent sign (¢). MEDIUM-HIGH
//    confidence: ¢ over 6 is a widely-documented, iconic feature of
//    American office typewriters (commercial correspondence needed it;
//    ^ has no typewriter-era use — it's a later math/programming symbol).
//  - Kept the apostrophe key's shift as a double quote ('/") — this is
//    well-attested and unchanged.
//  - LOW CONFIDENCE / UNVERIFIED, flagged inline below: 2's shifted value,
//    the -/= key's shifted value, and comma/period's shifted values. These
//    varied by manufacturer and are the ones most worth checking against a
//    photographed reference machine (e.g. Richard Polt's Classic Typewriter
//    Page https://site.xavier.edu/polt/typewriters/, or typewriterdatabase.com)
//    before treating this file as final.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const qwertyUS: KeyboardLayout = [
  [
    { type: 'spacer' }, // no backtick/tilde key on a mechanical typewriter
    { type: 'char', lower: '1', upper: '!' },
    { type: 'char', lower: '2', upper: '"' }, // VERIFY: manufacturers varied; some had @ or nothing here
    { type: 'char', lower: '3', upper: '#' },
    { type: 'char', lower: '4', upper: '$' },
    { type: 'char', lower: '5', upper: '%' },
    { type: 'char', lower: '6', upper: '¢' }, // cent sign, not caret — see header note
    { type: 'char', lower: '7', upper: '&' },
    { type: 'char', lower: '8', upper: '*' },
    { type: 'char', lower: '9', upper: '(' },
    { type: 'char', lower: '0', upper: ')' },
    { type: 'char', lower: '-', upper: '_' },
    { type: 'char', lower: '=', upper: '+' }, // VERIFY: many machines had no dedicated '=' at all, or a fraction (½/¼) here instead
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
    { type: 'spacer' }, // no bracket key after P on the classic American row — see header note
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
    { type: 'char', lower: ';', upper: ':' },
    { type: 'char', lower: "'", upper: '"' },
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
    { type: 'char', lower: ',', upper: '<' }, // VERIFY: angle brackets are likely a modern/computer addition; typewriters may have had no shift function here
    { type: 'char', lower: '.', upper: '>' }, // VERIFY: see comma above
    { type: 'char', lower: '/', upper: '?' },
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
