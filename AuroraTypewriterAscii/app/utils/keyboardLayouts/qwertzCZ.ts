import type { KeyboardLayout } from './types'

// First-draft Czech QWERTZ layout. New preset, named qwertzCZ per project
// convention — same "qwertz" root as qwertzDE/AT/CH (Czech genuinely has
// the German-style Y/Z swap), differentiated by ISO code exactly like that
// trio already is.
//
// Sources:
//  - OS/2 Museum, "A 100 Year Old Consul Typewriter?": examines an actual
//    real machine — a 1926 Remington Portable No. 2 bearing a Consul logo
//    (Consul/Zbrojovka Brno began building licensed Remingtons in 1932),
//    with a combined Czech-German keyboard. Directly documents the top row
//    (where a plain QWERTZ machine has digits) instead reading
//    "ěščřžýáéí" — Czech accented letters, not digits — plus a dead key
//    combining acute (´) and háček/caron (ˇ) marks, "positioned rightmost
//    to avoid [unwanted] carriage advance." Also gives real standard
//    numbers with dates: ČSN 01 6906 (from roughly 1953), ČSN 17 8151
//    (the typewriter-specific standard, March 1974), and ČSN 36 9050 (the
//    current computer-keyboard standard, 1994) — and notes that before
//    WWII multiple Czech layouts coexisted with no single standard, the
//    same situation already documented in this kit for France/Belgium.
//    https://www.os2museum.com/wp/a-100-year-old-consul-typewriter/
//  - Typing Hero, "QWERTZ-CS (Czech)": independently confirms the same
//    digit-row-becomes-diacritics structure — "the number row is replaced
//    with Czech diacritic letters by default" — giving the base row as
//    ě š č ř ž ý á í é with digits 1-9 reachable via Shift, and describes
//    ď, ň, ť as produced via the háček/caron dead key, plus ó and ú, and ů
//    via a separate ring (˚) dead key.
//    https://typingheroapp.com/blog/qwertz-cs-czech/
//  - sttmedia.com, "Alphabet and Character Frequency: Czech": corpus
//    frequency data for all 15 Czech diacritics, used below exactly like
//    ewertPL.ts's Polish frequency data, to decide which of the
//    dead-key-only letters get a slot when this kit's grid runs short.
//    Ranked: í 2.53%, ě 1.93%, á 1.85%, ž 1.22%, é 1.21%, ř 1.16%, š 0.82%,
//    ý 0.80%, č 0.78%, ů 0.38%, ú 0.12%, ď 0.05%, ň 0.04%, ó 0.03%,
//    ť 0.03%.
//    https://www.sttmedia.com/characterfrequency-czech
//
// MODELING DECISIONS:
//
//  1. The real machine's and the modern standard's shared structural quirk
//     — accented letters live where digits normally do, with digits moved
//     to Shift — maps onto this kit's KeyDef model perfectly (lower =
//     letter, upper = digit) and is used directly here. HIGH confidence
//     for which 9 letters (ě š č ř ž ý á í é, the most frequent 9 of all
//     15 per the frequency data above — that's not a coincidence I forced,
//     it's what both primary sources independently put on the digit row).
//     MEDIUM confidence on the exact digit each pairs with: two sources
//     confirm "digits 1-9 via Shift" but neither gives an explicit
//     per-key pairing, so the sequential 1-9 assignment used below
//     (ě/2, š/3, č/4 ... é/0) is my own plausible ordering, VERIFY-flagged.
//  2. Because Czech's most distinctive letters live on the digit row, the
//     three letter rows stay a completely unmodified QWERTZ layout (same
//     as qwertzDE.ts) EXCEPT for the German-specific ü/ö/ä slots, which
//     Czech doesn't need at all — those are repurposed for three more
//     Czech diacritics, chosen by frequency: ů (0.38%), ú (0.12%), and ď
//     (0.05%), the three most frequent of the six letters described as
//     dead-key-only. Placement within those three freed slots is my own
//     choice (VERIFY), not sourced — only the letters' existence and
//     relative priority are frequency-sourced.
//  3. REVISION: ň (0.04%), ó (0.03%), and ť (0.03%) — the three
//     least-frequent remaining diacritics, originally dropped entirely
//     under this kit's original fixed-grid skeleton — are now included
//     too. The project owner decided that skeleton is worth relaxing
//     rather than treated as immovable — see METHODOLOGY.md §2 for the
//     reasoning. The top row is now 12 slots (ť appended at the end) and
//     the home row is now 13 slots (ň and ó appended at the end), with no
//     sourced position for any of the three — VERIFY on placement, not on
//     existence. This achieves full 15-of-15 Czech diacritic coverage,
//     the only file in this pack (alongside qwertzHU.ts) where nothing is
//     left dropped for capacity reasons alone.
//  4. The real machine's combined acute+háček dead key (´/ˇ) fits this
//     kit's lower/upper-pair modeling directly (same technique as
//     azertyFR.ts's circumflex/diaeresis key) and is kept, MEDIUM-HIGH
//     confidence. The separate ring (˚) dead key for ů has no natural
//     partner mark, so its shift value here is an invented placeholder,
//     flagged VERIFY. As with ewertPL.ts's dead-key discussion: even where
//     these WERE genuine mechanical dead keys (physically plausible, pre-
//     computer technology), this kit's schema can't represent a dead key
//     that produces different output letters depending on what follows —
//     so the letters it would produce (ď ň ó ť ú beyond what's already
//     placed above) are modeled as fixed lower/upper pairs elsewhere, or
//     dropped, rather than as true dead-key behavior.
//  5. q, w, x are kept unchanged from the German base (unlike fggioTR.ts's
//     and ewertPL.ts's dropped q/w/x) — Czech does use these occasionally
//     for loanwords same as German, and unlike Turkish/Polish this kit's
//     grid wasn't under enough pressure here to force dropping them; the
//     letters actually competing for space (ň ó ť) were already the
//     lowest-frequency items in the whole file per the data above.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const qwertzCZ: KeyboardLayout = [
  [
    { type: 'char', lower: '+', upper: '1' }, // VERIFY — see header note #1
    { type: 'char', lower: 'ě', upper: '2' }, // VERIFY exact digit pairing, letter placement HIGH confidence — see header note #1
    { type: 'char', lower: 'š', upper: '3' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'č', upper: '4' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'ř', upper: '5' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'ž', upper: '6' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'ý', upper: '7' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'á', upper: '8' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'í', upper: '9' }, // VERIFY exact digit pairing
    { type: 'char', lower: 'é', upper: '0' }, // VERIFY exact digit pairing
    { type: 'char', lower: '´', upper: 'ˇ' }, // combined acute/háček dead key, MEDIUM-HIGH confidence — see header note #4
    { type: 'char', lower: '˚', upper: '¨' }, // ring dead key for ů, upper value invented placeholder — see header note #4
    { type: 'char', lower: '?', upper: '?' }, // genuinely unknown content, physical key likely existed — see header note
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
    { type: 'char', lower: 'ů', upper: 'Ů' }, // repurposes German's ü slot, placed by frequency not sourced position — see header note #2
    { type: 'char', lower: 'ť', upper: 'Ť' }, // restored, no sourced position — see header note #3
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
    { type: 'char', lower: 'ú', upper: 'Ú' }, // repurposes German's ö slot, placed by frequency not sourced position — see header note #2
    { type: 'char', lower: 'ď', upper: 'Ď' }, // repurposes German's ä slot, placed by frequency not sourced position — see header note #2
    { type: 'char', lower: 'ň', upper: 'Ň' }, // restored, no sourced position — see header note #3
    { type: 'char', lower: 'ó', upper: 'Ó' }, // restored, no sourced position — see header note #3
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
    { type: 'char', lower: ',', upper: ';' }, // VERIFY — carried from qwertzDE.ts
    { type: 'char', lower: '.', upper: ':' }, // VERIFY
    { type: 'char', lower: '-', upper: '_' }, // VERIFY
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
