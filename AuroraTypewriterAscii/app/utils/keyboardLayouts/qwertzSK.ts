import type { KeyboardLayout } from './types'

// First-draft Slovak QWERTZ layout. New preset, named qwertzSK per project
// convention — same "qwertz" root as qwertzDE/AT/CH/CZ (Slovak genuinely
// has the same Y/Z swap), differentiated by ISO code. Built as a sibling to
// qwertzCZ.ts rather than merged with it, per your call: Czech and Slovak
// share the QWERTZ base and the "digit row doubles as diacritics" trick,
// but each has real letters the other lacks (Slovak: ä ľ ĺ ô ŕ; Czech:
// ě ř ů), so this is its own file with its own sourcing.
//
// Sources:
//  - Typing Hero, "QWERTZ-SK (Slovak)": confirms the same structural trick
//    already sourced for Czech — "Shift + diacritic-row position produces
//    numbers (diacritics are the default)" — and gives ľ and ô as
//    dedicated keys, á/é/í/ý/ú and č/š/ž/ť/ď as reachable "via dead-key
//    combination... or direct top row," and confirms ř/ů are "Not on
//    layout" (those are Czech-only). Doesn't give a full row-by-row table.
//    https://typingheroapp.com/blog/qwertz-sk-slovak/
//  - Microsoft, "Slovak" keyboard layout (kbdsl, the traditional/QWERTZ
//    driver — NOT kbdsl1, which is a separate "Slovak (QWERTY)" variant,
//    the same 214-vs-programmers split already seen for Polish): the
//    fullest structural source found. Confirms the Y/Z swap, and gives
//    ú, ä, ň as genuinely dedicated keys at the end of the top letter row,
//    and ô as a dedicated key on the home row (next to §/!, a likely
//    German-office-tradition carryover already seen in qwertzDE.ts). Also
//    documents a rich modern dead-key/compose layer (´ acute, ˇ caron,
//    ¨ diaeresis, ˛ ogonek, ˘ breve, · dot-above, ˝ double-acute, ¸
//    cedilla) that produces not just Slovak letters but Polish ą/ę,
//    Romanian ă, Croatian/Turkish ż, Hungarian ő/ű, and French/Portuguese
//    ç/ş/ţ — clearly a general-purpose modern Central-European Unicode
//    convenience layer, not anything specific to a Slovak typewriter, and
//    not modeled here (same call already made for qwertzCZ.ts's and
//    ewertPL.ts's AltGr/dead-key layers).
//    https://learn.microsoft.com/en-us/globalization/keyboards/kbdsl.html
//  - aboq.org, "Reformovaná slovenská klávesnica" (a proposal to reform the
//    Slovak keyboard): argues against the traditional layout partly
//    because "ó, ĺ, ŕ... have no keys assigned to them in the traditional
//    layout," and separately complains that "Q, X, W occupy central space
//    despite rare usage in Slovak texts" — independent corroboration both
//    that those three letters are genuinely hard to type on a real Slovak
//    keyboard (not just a gap in this kit's modeling) and that q/w/x are
//    reasonable to deprioritize under schema pressure, the same call
//    already made for fggioTR.ts and ewertPL.ts.
//    https://aboq.org/klavesnica.htm
//  - sttmedia.com, "Alphabet and Character Frequency: Slovak": corpus
//    frequency data for all 17 Slovak diacritics (from a 1.96M-character
//    sample), used below the same way as qwertzCZ.ts's and ewertPL.ts's
//    frequency sourcing. Ranked: á 1.85%, ý 1.11%, é 1.07%, í 1.07%,
//    ú 0.94%, č 0.91%, š 0.77%, ž 0.68%, ť 0.45%, ľ 0.43%, ô 0.17%,
//    ó 0.14%, ď 0.11%, ň 0.11%, ä 0.09%, ĺ 0.02%, ŕ 0.01%.
//    https://www.sttmedia.com/characterfrequency-slovak
//
// MODELING DECISIONS:
//
//  REVISION: originally the top row was capped at 11 slots (this kit's
//  original fixed-grid skeleton), which forced q and w out despite being
//  part of the Slovak alphabet for loanwords. The project owner decided
//  that skeleton is worth relaxing rather than treated as immovable — see
//  METHODOLOGY.md §2 for the reasoning. Row 1 is now 13 slots (row 0, row
//  2, and row 3 are unchanged, since q/w were the only capacity-driven
//  drop in this file). With that room, q and w are back at their standard
//  QWERTZ positions alongside ú/ä/ň.
//
//  1. ú, ä, ň (top row) and ô (home row) are placed exactly where the
//     Microsoft table puts them — MEDIUM-HIGH confidence, sourced
//     position — even though by raw frequency they're actually some of
//     the LEAST common Slovak diacritics (ä 0.09%, ň 0.11%, ô 0.17%,
//     ú 0.94% is the exception). Structural sourcing wins over frequency
//     for these four specifically, same reasoning as fggioTR.ts trusting
//     the sourced Turkish row assignment over guesswork.
//  2. q and w are back at their standard QWERTZ positions (top row now 13
//     slots: q w e r t z u i o p ú ä ň) — see REVISION note. aboq.org's
//     complaint about their rarity in Slovak texts is retained here as
//     context for why they were dropped in the original draft, not as a
//     reason to omit them now: they're part of the alphabet for loanwords
//     and the row has room for them.
//  3. Row 0 (digit row) extrapolates the same "digits move to Shift,
//     diacritics take their place" structure already sourced directly for
//     Czech (both a real 1926/1932 machine and the modern standard). No
//     source here confirms Slovak specifically used this convention on a
//     mechanical typewriter — it's inferred from the shared Czechoslovak
//     ČSN standards history and typingheroapp's confirmation that the
//     modern Slovak standard still works this way — so treat this row's
//     STRUCTURE as MEDIUM confidence (plausible, not directly sourced for
//     Slovak) rather than HIGH like qwertzCZ.ts's directly-sourced version.
//     Given that structure, the 9 highest-frequency remaining diacritics
//     (á ý é í š č ž ť ľ) fill it by frequency, then the two next-highest
//     (ó, ď) take two more slots freed by not needing a Shift-heavy digit
//     row here — pure frequency placement, VERIFY on exact position.
//  4. Dropped entirely: ĺ (0.02%) and ŕ (0.01%), the two most extreme
//     rarities in the entire dataset — by far the clearest drop call in
//     this kit so far, and independently corroborated by aboq.org listing
//     ĺ/ŕ (along with ó, which IS included here — see the tension noted
//     above) as unsupported even on the real traditional keyboard.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const qwertzSK: KeyboardLayout = [
  [
    { type: 'char', lower: '+', upper: '1' }, // VERIFY — extrapolated structure, see header note #3
    { type: 'char', lower: 'á', upper: '2' }, // VERIFY exact digit pairing, letter placement MEDIUM confidence — see header note #3
    { type: 'char', lower: 'ý', upper: '3' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'é', upper: '4' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'í', upper: '5' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'š', upper: '6' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'č', upper: '7' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'ž', upper: '8' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'ť', upper: '9' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'ľ', upper: '0' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'ó', upper: 'Ó' }, // frequency-placed, not sourced position; aboq.org disputes this key exists at all — see header note #3/#4
    { type: 'char', lower: 'ď', upper: 'Ď' }, // frequency-placed, not sourced position — see header note #3
    { type: 'char', lower: '?', upper: '?' }, // genuinely unknown content, physical key likely existed
    { type: 'spacer' },
  ],
  [
    { type: 'char', lower: 'q', upper: 'Q' }, // restored — see REVISION note
    { type: 'char', lower: 'w', upper: 'W' }, // restored — see REVISION note
    { type: 'char', lower: 'e', upper: 'E' },
    { type: 'char', lower: 'r', upper: 'R' },
    { type: 'char', lower: 't', upper: 'T' },
    { type: 'char', lower: 'z', upper: 'Z' },
    { type: 'char', lower: 'u', upper: 'U' },
    { type: 'char', lower: 'i', upper: 'I' },
    { type: 'char', lower: 'o', upper: 'O' },
    { type: 'char', lower: 'p', upper: 'P' },
    { type: 'char', lower: 'ú', upper: 'Ú' }, // MEDIUM-HIGH confidence, sourced position — see header note #1
    { type: 'char', lower: 'ä', upper: 'Ä' }, // MEDIUM-HIGH confidence, sourced position — see header note #1
    { type: 'char', lower: 'ň', upper: 'Ň' }, // MEDIUM-HIGH confidence, sourced position — see header note #1
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
    { type: 'char', lower: 'ô', upper: 'Ô' }, // MEDIUM-HIGH confidence, sourced position — see header note #1
    { type: 'char', lower: '§', upper: '!' }, // MEDIUM confidence — plausible German-office-tradition carryover, see header note
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
    { type: 'char', lower: ',', upper: '?' }, // VERIFY — carried structurally from qwertzDE.ts pattern
    { type: 'char', lower: '.', upper: ':' }, // VERIFY
    { type: 'char', lower: '-', upper: '_' }, // VERIFY
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
