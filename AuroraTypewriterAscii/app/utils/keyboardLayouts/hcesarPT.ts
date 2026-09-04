import type { KeyboardLayout } from './types'

// First-draft Portuguese HCESAR layout — NOT QWERTY. Replaces the previous
// portuguese.ts, which used plain QWERTY letters and was therefore modeling
// the layout Portugal's government explicitly rejected for most of the
// 20th century. Named per project convention (first letters of the top
// letter row + ISO code) after the layout's own real historical name.
//
// This is the highest-stakes rewrite in this kit so far, both because the
// letter arrangement is completely non-QWERTY and because the full grid
// came from a single AI-compiled source (see CONFIDENCE note below) rather
// than a museum/academic/Wikipedia table like the other presets. Treat this
// whole file as a first draft pending a second, independent source.
//
// Sources:
//  - Portuguese Wikipedia, "HCESAR": mandated by Decree-Law No. 27,868 on
//    July 17, 1937 under the Estado Novo (Salazar) regime — explicitly "to
//    protect the national typewriter industry, represented by the Messa
//    company, from foreign competition." Compulsory in public
//    administration and most private business until 1971, phased out via
//    AZERTY and then QWERTY through the 1970s-80s. Letters arranged by
//    Portuguese letter frequency, vowels on an "inverted vowel triangle."
//    Major manufacturers (Olympia, Hermes, Royal, Remington, Olivetti,
//    Brother) all produced HCESAR-layout machines for this market — this
//    was a real, widely-produced national standard, not a rare curiosity.
//    https://pt.wikipedia.org/wiki/HCESAR
//  - English Wikipedia, "HCESAR": corroborates the 1937 decree and the
//    name's origin ("the first six letters on the first row of alphabetical
//    keys: H C E S A R"), and separately dates the end of the mandate to
//    "the mid-70s." (The two Wikipedias disagree slightly on the exact
//    end-year — 1971 vs. "mid-70s" — probably de jure vs. de facto phase-
//    out; noted rather than resolved.)
//    https://en.wikipedia.org/wiki/HCESAR
//  - Computatio Lusitana, "As Teclas que Enganaram Salazar" ("The keys
//    that fooled Salazar"): adds that some imported machines reportedly
//    used swappable plastic keycaps — HCESAR caps for customs inspection,
//    swapped to QWERTY/AZERTY caps underneath for actual use — meaning
//    real mid-century usage wasn't 100% uniform even under the legal
//    mandate. Also confirms QWERTY dominated the market immediately before
//    the 1937 decree.
//    https://computatiolusitana.wordpress.com/2021/03/24/as-teclas-que-enganaram-salazar/
//  - sitecuriosidades.com and LusoExpat forum: both independently confirm
//    the dual-function 0/O and 1/l keys (see below), and that '!', '*', and
//    '#' had NO dedicated key at all — '!' required overlaying an apostrophe
//    with a period, '*' required overlaying 'x' with '+', and '#' simply
//    wasn't available. This is useful NEGATIVE evidence: none of those three
//    characters appear anywhere in the grid below, on purpose.
//    https://www.sitecuriosidades.com/hcesar-o-teclado-portugues/ ,
//    https://lusoexpat.com/discussion/915/hcesar-o-teclado-portugues-verdadeiro
//  - CGD (Caixa Geral de Depósitos) historical patrimony study, "O tempo da
//    Máquina de Escrever": independently corroborates the 1937 decree
//    (dated July 21 rather than July 17 — again noted, not resolved) and
//    describes "dual-function keys" as a defining feature.
//    https://www.cgd.pt/Institucional/Patrimonio-Historico-CGD/Estudos/Documents/Maquinas-de-escrever.pdf
//  - Grokipedia, "hcesar": the ONLY source I found with a full row-by-row
//    key grid. CONFIDENCE CAVEAT: Grokipedia is an AI-generated, not
//    human-edited, encyclopedia — I'm treating its history/dates as
//    corroborated by the independent sources above, but the specific
//    letter-by-letter grid below rests on this one compiled source alone.
//    It does pass one useful internal consistency check (all 26 Latin
//    letters appear exactly once across the four rows, no duplicates or
//    omissions), which is a reasonable, though not conclusive, signal it
//    reflects a real transcribed layout rather than an invented one.
//    https://grokipedia.com/page/hcesar
//
// GRID-FIT NOTE: HCESAR's real row lengths don't all match this kit's fixed
// 13/11/11/10 grid (inherited from modern keyboard geometry) — see inline
// comments for exactly where I combined, dropped, or flagged a slot to make
// it fit. Row 2 (home row) came up one item short of the 11 slots the grid
// needs; I could not find sourced content for the leftover slot and flagged
// it rather than invent something.
//
// Dual-function 1/0 keys: multiple independent sources describe '1' as
// shared with lowercase 'l' and '0' as shared with uppercase 'O' — the same
// convention already documented in this kit for Spain and Italy. Grokipedia's
// grid lists literal '1' and '0' at these positions; I've kept those literal
// values (lower === upper, no confirmed shift) rather than overriding them
// with the letter substitutes, since it's unclear whether the sources mean
// a genuinely separate glyph or just a position label — flagged VERIFY.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const hcesarPT: KeyboardLayout = [
  [
    { type: 'char', lower: 'º', upper: 'ª' }, // ordinal pair, MEDIUM confidence
    { type: 'char', lower: '1', upper: '1' }, // dual-function with 'l' in practice — see header note, VERIFY
    { type: 'char', lower: '2', upper: '2' }, // VERIFY — no sourced shift; NOT '@' or '"', no source for either
    { type: 'char', lower: '3', upper: '3' }, // VERIFY
    { type: 'char', lower: '4', upper: '4' }, // VERIFY
    { type: 'char', lower: '5', upper: '5' }, // VERIFY
    { type: 'char', lower: '6', upper: '6' }, // VERIFY
    { type: 'char', lower: '7', upper: '7' }, // VERIFY
    { type: 'char', lower: '8', upper: '8' }, // VERIFY
    { type: 'char', lower: '9', upper: '9' }, // VERIFY
    { type: 'char', lower: '0', upper: '0' }, // dual-function with 'O' in practice — see header note, VERIFY
    { type: 'char', lower: "'", upper: "'" }, // VERIFY — sourced NEGATIVE evidence this is NOT '!' (no dedicated key existed for it)
    { type: 'char', lower: '«', upper: '»' }, // guillemet pair, MEDIUM confidence
    { type: 'spacer' },
  ],
  [
    { type: 'char', lower: 'h', upper: 'H' },
    { type: 'char', lower: 'c', upper: 'C' },
    { type: 'char', lower: 'e', upper: 'E' },
    { type: 'char', lower: 's', upper: 'S' },
    { type: 'char', lower: 'a', upper: 'A' },
    { type: 'char', lower: 'r', upper: 'R' }, // H-C-E-S-A-R — the layout's namesake row, MEDIUM confidence (single-source grid, see header)
    { type: 'char', lower: 'o', upper: 'O' },
    { type: 'char', lower: 'p', upper: 'P' },
    { type: 'char', lower: 'z', upper: 'Z' },
    { type: 'char', lower: '´', upper: '~' }, // combined acute/tilde dead-key slot, modeled like azertyFR.ts's ^/¨ slot — VERIFY
    { type: 'char', lower: '\\', upper: '\\' }, // VERIFY — backslash per Grokipedia's grid, unusual for this era, worth double-checking
    { type: 'backspace', glyph: '←' },
  ],
  [
    { type: 'shiftHold', glyph: '↑' },
    { type: 'char', lower: 'q', upper: 'Q' },
    { type: 'char', lower: 't', upper: 'T' },
    { type: 'char', lower: 'd', upper: 'D' },
    { type: 'char', lower: 'i', upper: 'I' },
    { type: 'char', lower: 'n', upper: 'N' },
    { type: 'char', lower: 'u', upper: 'U' },
    { type: 'char', lower: 'l', upper: 'L' },
    { type: 'char', lower: 'm', upper: 'M' },
    { type: 'char', lower: 'x', upper: 'X' },
    { type: 'char', lower: ',', upper: ',' }, // VERIFY — no sourced shift
    { type: 'char', lower: '?', upper: '?' }, // VERIFY — grid-fit placeholder, no sourced content, see header GRID-FIT NOTE
    { type: 'shiftHold', glyph: '↑' },
  ],
  [
    { type: 'shiftToggle', glyph: '⬆' },
    { type: 'char', lower: 'y', upper: 'Y' },
    { type: 'char', lower: 'j', upper: 'J' },
    { type: 'char', lower: 'b', upper: 'B' },
    { type: 'char', lower: 'f', upper: 'F' },
    { type: 'char', lower: 'v', upper: 'V' },
    { type: 'char', lower: 'g', upper: 'G' },
    { type: 'char', lower: 'k', upper: 'K' },
    { type: 'char', lower: 'w', upper: 'W' },
    { type: 'char', lower: 'ç', upper: 'Ç' },
    { type: 'char', lower: '.', upper: '.' }, // VERIFY — no sourced shift
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
