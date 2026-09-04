import type { KeyboardLayout } from './types'

// Second-draft UK QWERTY layout, revised toward an authentic mid-20th-century
// (c. 1930s-1960s) British office typewriter — e.g. Imperial, Empire,
// British-market Underwood/Remington models — replacing the previous
// "first-draft, based on the modern ISO keyboard" placeholder. Same method
// as qwertyUS.ts's revision: keep what's well-attested, flag what isn't
// rather than guessing.
//
// Sources:
//  - Same letter-arrangement sourcing as qwertyUS.ts (Yasuoka & Yasuoka,
//    "On the Prehistory of QWERTY", 2011) — the QWERTYUIOP/ASDFGHJKL/ZXCVBNM
//    letter rows were already international by the 1880s-1890s standardization,
//    so they're unchanged here too.
//  - "The @-symbol" (Shady Characters, 2011): confirms @ was absent from
//    Sholes' prototype and the first commercial Remington, then "adopted as
//    part of the increasingly standardised typewriter keyboard" on later
//    machines — but doesn't establish a firm position or date, so its
//    modern UK-keyboard slot (shift of apostrophe) is NOT assumed here.
//    https://shadycharacters.co.uk/2011/08/the-symbol-part-2-of-2/
//  - Smithsonian Magazine, "The Accidental History of the @ Symbol" (2013):
//    corroborates @'s absence from the earliest machines.
//    https://www.smithsonianmag.com/science-nature/the-accidental-history-of-the-symbol-18054936/
//
// Changes from the previous draft, and confidence level for each:
//  - Removed the backtick/¬ key entirely (-> spacer). HIGH confidence: ¬
//    (logical NOT) is a 1980s computer-keyboard addition for programming;
//    no typewriter, British or otherwise, had this pairing.
//  - Removed the bracket key ([/{) after P (-> spacer). Same reasoning as
//    qwertyUS.ts: the classic QWERTYUIOP row ends at P.
//  - Removed the modern @ from the apostrophe key's shift, restoring '/"
//    (matching qwertyUS.ts). MEDIUM confidence: @ landing on that specific
//    key is a documented *modern* UK ISO-keyboard convention; there's no
//    evidence it was the typewriter-era assignment, while apostrophe-shifts-
//    to-quote is well-attested generally. Whether @ existed elsewhere on a
//    mid-century British machine is unresolved — VERIFY.
//  - Removed the caret (^) at 6's shift, since (as in qwertyUS.ts) it has no
//    typewriter-era use. UNLIKE the US draft, there's no well-documented
//    British equivalent to slot in (the cent sign is America-specific), so
//    this key is left with lower === upper (no known distinct shift
//    function) rather than guessing — same convention spanish.ts already
//    uses for its own leftmost key. VERIFY against a reference machine.
//  - Removed the angle brackets (</>) on comma/period's shift, for the same
//    reason as qwertyUS.ts (a later, code-oriented addition) — same
//    lower === upper treatment.
//  - LOW CONFIDENCE / UNVERIFIED, flagged inline: £'s exact digit position
//    (kept at 3, matching the modern convention, but unconfirmed for the
//    typewriter era), 4's shifted '$' (dollar had little use in pre-1971
//    £sd Britain — a shillings/pence notation is plausible instead but
//    unconfirmed, so left as-is), and the -/= key, same caveat as
//    qwertyUS.ts.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const qwertyUK: KeyboardLayout = [
  [
    { type: 'spacer' }, // no backtick/¬ key on a mechanical typewriter
    { type: 'char', lower: '1', upper: '!' },
    { type: 'char', lower: '2', upper: '"' }, // VERIFY: see qwertyUS.ts's same caveat
    { type: 'char', lower: '3', upper: '£' }, // position VERIFY, but presence is high-confidence
    { type: 'char', lower: '4', upper: '$' }, // VERIFY: pre-decimal Britain may not have needed $ here at all — see header note
    { type: 'char', lower: '5', upper: '%' },
    { type: 'char', lower: '6', upper: '6' }, // VERIFY: no known distinct shift function — see header note
    { type: 'char', lower: '7', upper: '&' },
    { type: 'char', lower: '8', upper: '*' },
    { type: 'char', lower: '9', upper: '(' },
    { type: 'char', lower: '0', upper: ')' },
    { type: 'char', lower: '-', upper: '_' },
    { type: 'char', lower: '=', upper: '+' }, // VERIFY: see qwertyUS.ts's same caveat
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
    { type: 'spacer' }, // no bracket key after P — see qwertyUS.ts's same note
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
    { type: 'char', lower: "'", upper: '"' }, // modern @ removed — see header note
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
    { type: 'char', lower: ',', upper: ',' }, // VERIFY: no known distinct shift function — see header note
    { type: 'char', lower: '.', upper: '.' }, // VERIFY: see comma above
    { type: 'char', lower: '/', upper: '?' },
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
