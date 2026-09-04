import type { KeyboardLayout } from './types'

// First-draft Turkish F-keyboard layout. New preset, named fggioTR per
// project convention (first 5 keys of the top letter row + ISO code) —
// the top row reads F-G-Ğ-I-O, and since Ğ and dotless I have no distinct
// ASCII letter, this transliterates diacritics to their base Latin letter
// (Ğ -> g, ı -> i), producing the doubled "gg". Confirmed with the user
// rather than guessed, since this is the first preset in the kit where
// that transliteration issue comes up.
//
// This is a genuinely different case from every QWERTY/AZERTY/QWERTZ-derived
// layout built so far: the F-keyboard is not a rearrangement of a Latin
// typewriter layout, it's a purpose-designed layout built from scratch for
// Turkish letter frequency. It's also one of the best-documented and most
// rigorously-sourced layouts in this kit — comparable to Germany's
// Normblatt 1452 or Portugal's HCESAR decree in having a real government
// standard behind it, not just a manufacturer convention.
//
// Sources:
//  - Tiro/Intersteno, "The F-keyboard: The History and Contemporary Use of
//    the Turkish Standard Keyboard Layout": İhsan Sıtkı Yener, a teacher at
//    Istanbul's Sultanahmet Commercial High School, led a government
//    commission from 1951-1955 that ran a letter-frequency study on 30,000
//    Turkish words and X-rayed typists' hand/finger movements to place the
//    most-used letters under the strongest fingers (near-balanced 49%/51%
//    left/right hand load). The layout was "presented and registered by the
//    Government on 20 October 1955" as the Turkish Standard Keyboard
//    Layout. It remained legally mandated for imported typewriters until
//    computers arrived in the 1980s running QWERTY, and Turkish typists set
//    multiple world records on it through the 1990s.
//    https://tiro.intersteno.org/2021/12/the-f-keyboard-the-history-and-contemporary-use-of-the-turkish-standard-keyboard-layout/
//  - A presentation titled "F Klavye Standart Türk Klavyesi TSE 2117" gives
//    the standard number as TSE 2117 (Türk Standartları Enstitüsü / Turkish
//    Standards Institution) — MEDIUM-HIGH confidence, corroborated by one
//    source rather than the primary standards body directly.
//    https://slidetodoc.com/f-klvye-standart-trk-klvyesi-tse-2117-alfasaysal/
//  - Marcin Wichary (keyboard historian, author of "Shift Happens"),
//    "What I learned about languages just by looking at a Turkish
//    typewriter" — a firsthand examination of an actual mechanical Turkish
//    F-keyboard typewriter. Confirms all 29 native Turkish letters
//    (a b c ç d e f g ğ h ı i j k l m n o ö p r s ş t u ü v y z) got
//    priority placement, that q/w/x (not in the native alphabet) were
//    relegated to "a somewhat unusual location: right next to the digits in
//    the top row" for foreign loanwords, that there was a dead key
//    combining grave and circumflex accents for Persian/Arabic-origin
//    loanwords, a standalone é "just above 2" for French words, and —
//    important for the digit row below — that the machine he examined was
//    MISSING a dedicated '1' key and several digit-row shift symbols
//    (&, $, =, +, !, ;), with typists substituting lowercase l for 1 via
//    overstrike. This is the same "no dedicated 1/0 key" pattern already
//    established in this kit for Spain, Italy, and reportedly Portugal.
//    https://mwichary.medium.com/what-i-learned-about-languages-just-by-looking-at-a-turkish-typewriter-fc840aab1b0a
//  - Microsoft, "Turkish F Keyboard Layout" (kbdtuf, the modern Windows
//    driver reference) and katiponline.com (a Turkish touch-typing
//    tutorial site) independently agree on the modern row assignments:
//    upper row f g ğ ı o d r n h p (+ q w), home row u i e a ü t k m l y ş
//    (+ x), lower row j ö v c ç z s b (+ a "<" ISO-keyboard key and . / ,).
//    https://learn.microsoft.com/en-us/globalization/keyboards/kbdtuf.html
//
// MODELING DECISIONS (this file required more restructuring than most in
// this kit, so documenting the reasoning explicitly):
//
//  REVISION: originally the upper and home rows were capped at 11 slots
//  each (this kit's original fixed-grid skeleton), which forced q, w, and
//  x out entirely. The project owner decided that skeleton is worth
//  relaxing rather than treated as immovable — see METHODOLOGY.md §2 for
//  the reasoning. The upper row is now 13 slots and the home row is now 12
//  slots (row 0 and the lower row are unchanged). With that room, q and w
//  are restored to the upper row and x to the home row, following the
//  modern Microsoft/katiponline structural table's placement directly
//  (see #2 below for the resulting tension with Wichary's mechanical-era
//  account).
//
//  1. Every native Turkish letter (all 29) is placed exactly per the
//     Microsoft/katiponline structural agreement: 10 in the upper row, 11
//     in the home row, 8 in the lower row (+ 2 punctuation) = 29. HIGH
//     confidence for every native-letter placement. q, w, and x now sit
//     alongside them in the upper/home rows — see #2 below.
//  2. q, w, x are back in the layout, following the modern driver's
//     placement (q/w in the upper row after p, x in the home row after
//     ş) now that there's room — see REVISION note. This creates a genuine
//     tension worth flagging: Wichary's firsthand account of a real
//     mechanical unit puts q/w/x "next to the digits," not interleaved
//     into the letter rows the way the modern Windows driver does, and the
//     modern driver's placement is exactly where a modern 102-key ISO
//     board has spare AltGr real estate that a 1955 mechanical typewriter
//     never had. So this placement is MEDIUM confidence — plausible and
//     structurally sourced from the modern standard, but not confirmed
//     against a mechanical-era machine, where these letters (if present at
//     all) may instead have sat near the digit row.
//  3. The lower row's modern "<" key is dropped the same way this kit
//     already treats AZERTY's ² and BE-specific ³: a plausible ISO-keyboard
//     -only addition, not attested on a mechanical machine. Dropping it is
//     what makes the lower row's native-letter-plus-punctuation count land
//     exactly on the required 10 slots.
//  4. The upper row's spare 11th slot (after its 10 native letters) holds
//     the grave/circumflex dead key Wichary describes for Persian/Arabic
//     loanwords — real sourced content rather than an invented filler,
//     though its exact position within the row is a placement guess
//     (VERIFY). The standalone é "just above 2" Wichary mentions had no
//     free slot to go into (row 0 is already full at 13, see below) and is
//     dropped — same kind of schema-forced loss as qwertyPT.ts's circumflex.
//  5. Digit row (row 0): modeled on the modern Microsoft table (HIGH
//     confidence for the 13 base digits/symbols and their positions), but
//     every SHIFT value is flagged VERIFY given Wichary's conflicting
//     account that the mechanical-era machine he examined lacked a
//     dedicated '1' key (substituted with lowercase l, same convention as
//     qwertyES.ts/qzertyIT.ts) and several shift symbols (&, $, =, +, !, ;)
//     entirely, using overstrike instead. Rather than guess which of those
//     did or didn't exist on which year's machine, I kept the modern
//     complete grid structurally (so the file is usable) and flagged the
//     tension explicitly here instead of half-reconstructing it.
//  6. The bottom row's punctuation pairing (./: and ,/;) is MEDIUM
//     confidence — sourced from the modern Microsoft table, not
//     independently confirmed against a mechanical-era machine.
//  7. Modern AltGr-layer content (€, ₺, the full ^¨~´` dead-key set, @, ¶,
//     ¥, £, §, ©, ®) is entirely computer-era — € and the ₺ lira symbol
//     alone make this obvious (₺ wasn't adopted until 2012) — and none of
//     it is modeled here.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const fggioTR: KeyboardLayout = [
  [
    { type: 'char', lower: '+', upper: '*' }, // VERIFY — see header note #5 on digit-row tension
    { type: 'char', lower: '1', upper: '!' }, // VERIFY — possibly no dedicated key at all, substituted with l; see header note #5
    { type: 'char', lower: '2', upper: '"' }, // VERIFY
    { type: 'char', lower: '3', upper: '^' }, // VERIFY
    { type: 'char', lower: '4', upper: '$' }, // VERIFY
    { type: 'char', lower: '5', upper: '%' }, // VERIFY
    { type: 'char', lower: '6', upper: '&' }, // VERIFY
    { type: 'char', lower: '7', upper: "'" }, // VERIFY
    { type: 'char', lower: '8', upper: '(' }, // VERIFY
    { type: 'char', lower: '9', upper: ')' }, // VERIFY
    { type: 'char', lower: '0', upper: '=' }, // VERIFY
    { type: 'char', lower: '/', upper: '?' }, // VERIFY
    { type: 'char', lower: '-', upper: '_' }, // VERIFY
    { type: 'spacer' },
  ],
  [
    { type: 'char', lower: 'f', upper: 'F' },
    { type: 'char', lower: 'g', upper: 'G' },
    { type: 'char', lower: 'ğ', upper: 'Ğ' },
    { type: 'char', lower: 'ı', upper: 'I' }, // dotless i / dotless capital I — see header note on the Turkish i/ı distinction
    { type: 'char', lower: 'o', upper: 'O' },
    { type: 'char', lower: 'd', upper: 'D' },
    { type: 'char', lower: 'r', upper: 'R' },
    { type: 'char', lower: 'n', upper: 'N' },
    { type: 'char', lower: 'h', upper: 'H' },
    { type: 'char', lower: 'p', upper: 'P' },
    { type: 'char', lower: 'q', upper: 'Q' }, // restored — see REVISION note
    { type: 'char', lower: 'w', upper: 'W' }, // restored — see REVISION note
    { type: 'char', lower: '`', upper: '^' }, // grave/circumflex dead key for Persian/Arabic loanwords, MEDIUM confidence — see header note #4
    { type: 'backspace', glyph: '←' },
  ],
  [
    { type: 'shiftHold', glyph: '↑' },
    { type: 'char', lower: 'u', upper: 'U' },
    { type: 'char', lower: 'i', upper: 'İ' }, // dotted i / dotted capital İ — see header note on the Turkish i/ı distinction
    { type: 'char', lower: 'e', upper: 'E' },
    { type: 'char', lower: 'a', upper: 'A' },
    { type: 'char', lower: 'ü', upper: 'Ü' },
    { type: 'char', lower: 't', upper: 'T' },
    { type: 'char', lower: 'k', upper: 'K' },
    { type: 'char', lower: 'm', upper: 'M' },
    { type: 'char', lower: 'l', upper: 'L' },
    { type: 'char', lower: 'y', upper: 'Y' },
    { type: 'char', lower: 'ş', upper: 'Ş' },
    { type: 'char', lower: 'x', upper: 'X' }, // restored — see REVISION note
    { type: 'shiftHold', glyph: '↑' },
  ],
  [
    { type: 'shiftToggle', glyph: '⬆' },
    { type: 'char', lower: 'j', upper: 'J' },
    { type: 'char', lower: 'ö', upper: 'Ö' },
    { type: 'char', lower: 'v', upper: 'V' },
    { type: 'char', lower: 'c', upper: 'C' },
    { type: 'char', lower: 'ç', upper: 'Ç' },
    { type: 'char', lower: 'z', upper: 'Z' },
    { type: 'char', lower: 's', upper: 'S' },
    { type: 'char', lower: 'b', upper: 'B' },
    { type: 'char', lower: '.', upper: ':' }, // MEDIUM confidence — see header note #6
    { type: 'char', lower: ',', upper: ';' }, // MEDIUM confidence — see header note #6
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
