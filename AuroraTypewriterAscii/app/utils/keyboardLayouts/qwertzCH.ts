import type { KeyboardLayout } from './types'

// First-draft Swiss-German QWERTZ layout, toward an authentic mid-20th-
// century mechanical typewriter, built with the same research method as
// qwertyUS.ts/qwertyUK.ts/azertyFR.ts/qwertzDE.ts. (Austria needs no
// equivalent file — see qwertzAT.ts, a re-export of qwertzDE.)
//
// Switzerland's typewriter keyboard genuinely differs from Germany's,
// because it was built to serve German-, French-, and Italian-speaking
// regions with one keyboard rather than three. This matches
// fontDensity/charSets.js's existing qwertzCH entry (äöüéàèÄÖÜ — no ß,
// with é/à/è) almost exactly, which is good independent corroboration of
// the research below.
//  - No ß. Swiss High German orthography dropped ß in favor of "ss" — this
//    predates and is independent of computers: it stopped being taught in
//    Swiss schools from January 1938 (thelocal.ch, citing the Antiqua/
//    Fraktur transition period), squarely inside this kit's "mid-century
//    standardized" target window. One plausible (though speculative, per
//    that same source) causal theory is that Swiss typewriters left the
//    letter out because it's unneeded in French/Italian — i.e. the keyboard
//    and the orthography change may have reinforced each other.
//    https://www.thelocal.ch/20231116/why-is-the-german-letter-s-not-used-in-switzerland
//  - Built around shared accents. The QWERTZ Wikipedia article describes
//    the Swiss layout as "designed from the beginning for usage with
//    multiple languages... easy access to frequently used accents of the
//    French, German and Italian languages" — e.g. ç, and dead-key access to
//    the French/Italian accented vowels (à, è, é...), alongside the German
//    umlauts. https://en.wikipedia.org/wiki/QWERTZ
//  - Microsoft's modern Swiss German keyboard reference (kbdsg) was used as
//    a structural baseline for where ç and the accent dead-keys sit, since
//    I could not find a mechanical-typewriter-specific source with an exact
//    table — same caveat as the low-confidence slots below.
//    https://learn.microsoft.com/en-us/globalization/keyboards/kbdsg.html
//
// Letters (including the Y/Z swap) and the umlauts ä/Ä, ö/Ö, ü/Ü are
// UNCHANGED from qwertzDE.ts — HIGH confidence, per the Wikipedia QWERTZ
// article's confirmation that Swiss-German keeps the umlauts unshifted,
// same as Germany.
//
// Changes from qwertzDE.ts, and confidence level for each:
//  - Leftmost row-0 key: § (lower) replacing qwertzDE's ^ (lower), ° kept
//    as the shift. MEDIUM-HIGH confidence: matches the modern Swiss
//    reference and plausibly reflects freeing up the slot German uses for
//    § (see next point) to make room for a French/Italian accent instead.
//  - ß removed (was row-0's 12th key); replaced with a plain apostrophe
//    ('/?), keeping the '?' shift qwertzDE also uses there. HIGH confidence
//    on ß's absence (dated above); MEDIUM confidence on apostrophe
//    specifically being the mid-century replacement (plausible, matches the
//    modern reference, but unconfirmed for a period machine).
//  - 3's shift changed from qwertzDE's § to ç, since § moved to the
//    leftmost key. LOW CONFIDENCE / VERIFY — this is my best placement
//    guess for a definitely-needed character (ç), not a sourced position.
//  - Circumflex/grave dead keys (^/`) at the end of row 0 kept in the same
//    slot as qwertzDE, but confidence UPGRADED to MEDIUM-HIGH relative to
//    the German file: accent dead-keys are central to the Swiss keyboard's
//    whole reason for existing (per the Wikipedia quote above), rather than
//    a possibly-vestigial slot.
//  - Everything else (remaining top-row digits/symbols, bottom-row
//    punctuation) copied from qwertzDE.ts UNVERIFIED — same low-confidence
//    caveat noted there applies here too.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const qwertzCH: KeyboardLayout = [
  [
    { type: 'char', lower: '§', upper: '°' }, // MEDIUM-HIGH confidence — see header note
    { type: 'char', lower: '1', upper: '!' },
    { type: 'char', lower: '2', upper: '"' },
    { type: 'char', lower: '3', upper: 'ç' }, // VERIFY — best-guess placement, see header note
    { type: 'char', lower: '4', upper: '$' }, // VERIFY
    { type: 'char', lower: '5', upper: '%' }, // VERIFY
    { type: 'char', lower: '6', upper: '&' }, // VERIFY
    { type: 'char', lower: '7', upper: '/' }, // VERIFY
    { type: 'char', lower: '8', upper: '(' }, // VERIFY
    { type: 'char', lower: '9', upper: ')' }, // VERIFY
    { type: 'char', lower: '0', upper: '=' }, // VERIFY
    { type: 'char', lower: "'", upper: '?' }, // ß removed (HIGH confidence), apostrophe MEDIUM confidence — see header note
    { type: 'char', lower: '^', upper: '`' }, // dead keys, MEDIUM-HIGH confidence — see header note
    { type: 'spacer' },
  ],
  [
    { type: 'char', lower: 'q', upper: 'Q' },
    { type: 'char', lower: 'w', upper: 'W' },
    { type: 'char', lower: 'e', upper: 'E' },
    { type: 'char', lower: 'r', upper: 'R' },
    { type: 'char', lower: 't', upper: 'T' },
    { type: 'char', lower: 'z', upper: 'Z' },
    { type: 'char', lower: 'u', upper: 'U' },
    { type: 'char', lower: 'i', upper: 'I' },
    { type: 'char', lower: 'o', upper: 'O' },
    { type: 'char', lower: 'p', upper: 'P' },
    { type: 'char', lower: 'ü', upper: 'Ü' },
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
    { type: 'char', lower: 'y', upper: 'Y' },
    { type: 'char', lower: 'x', upper: 'X' },
    { type: 'char', lower: 'c', upper: 'C' },
    { type: 'char', lower: 'v', upper: 'V' },
    { type: 'char', lower: 'b', upper: 'B' },
    { type: 'char', lower: 'n', upper: 'N' },
    { type: 'char', lower: 'm', upper: 'M' },
    { type: 'char', lower: ',', upper: ';' }, // VERIFY
    { type: 'char', lower: '.', upper: ':' }, // VERIFY
    { type: 'char', lower: '-', upper: '_' }, // VERIFY
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
