import type { KeyboardLayout } from './types'

// First-draft Belgian AZERTY layout. New preset (charSets.js already had an
// unused `azertyBE` entry reserved, now finally consumed/verified here).
//
// Base structure is copied directly from azertyFR.ts: HIGH confidence, since
// multiple independent sources agree the Belgian and French AZERTY layouts
// are structurally identical (same A/Q, Z/W swaps, M on the home row,
// digits-as-Shift row-0 convention, é/è/à/ç placement) and differ only in a
// small number of specific keys.
//
// IMPORTANT CAVEAT, same shape as azertyFR.ts's: Belgium never had a formal
// national keyboard standard either. French Wikipedia's "Clavier belge"
// article states outright that the Belgian keyboard "reste non-normalisé"
// (remains non-standardized) — a de facto manufacturers' convention, same
// situation as pre-2019 France, never formalized into a Belgian equivalent
// of Germany's Normblatt or Portugal's HCESAR decree.
//
// Sources:
//  - Typing Hero, "AZERTY-BE (Belgian)": confirms AZERTY-BE is structurally
//    identical to AZERTY-FR (same core swaps and digit-row convention),
//    differing mainly in "obscure symbol positions and dead-key behavior"
//    (roughly 5% of keys) — and separately notes "some adaptations were made
//    in the 1980s," a computer-era date rather than a typewriter-era one.
//    https://typingheroapp.com/blog/azerty-be-belgian/
//  - azerty.global, "History of the AZERTY Keyboard" (Belgium section):
//    states "the Belgian keyboard adds two things: a ³, and an acute-accent
//    dead key — precious for Dutch (vóór), the other national language,"
//    and separately confirms "no official Belgian keyboard standard has
//    been identified ... a de facto manufacturers' standard, never
//    formalized."
//    https://azerty.global/en/azerty-history
//  - French Wikipedia, "Clavier belge": corroborates both the ³ (Shift of
//    the same physical key as ²) and the Dutch acute-accent dead key
//    (described there as AltGr+ù, producing á/é/í/ó/ú/ý and capitals — used
//    for Dutch words like "vóór"). Also vaguely mentions "§ and !" as
//    differing from French AZERTY without giving specifics.
//    https://fr.wikipedia.org/wiki/Clavier_belge
//
// UNRESOLVED, flagged prominently rather than guessed: none of the sources
// above state whether the two Belgian-specific features (the ³, and the
// Dutch acute-accent dead key) actually existed on Belgian mechanical
// typewriters, or are 1980s-computer-era additions layered on afterward —
// the French Wikipedia article describes the acute dead key using "AltGr,"
// a PC-keyboard concept with no typewriter equivalent, which is suggestive
// but not conclusive either way. Typing Hero's "adaptations... in the
// 1980s" line points toward a computer-era origin for at least some of the
// ~5% that differs from French. Given azertyFR.ts already established (HIGH
// confidence, azerty.global) that the plain ² is itself a computer-era key
// absent from mechanical AZERTY typewriters, and the Belgian ³ is literally
// the Shift-value of that same physical key, I've kept that slot as a
// spacer here too, by the same reasoning, rather than inventing a
// mechanical-typewriter-era ³. The Dutch acute-accent dead key is modeled
// below (replacing the French ù/% slot) because Belgium's second national
// language plausibly needed some way to type "vóór"-style words even on
// mechanical machines, but this is a LOW-confidence placement, not a
// verified fact — treat the era question as genuinely open.
//
// Everything not called out above (digit-row exact symbol pairing, the
// circumflex/diaeresis dead key after P, bottom-row punctuation) is
// unchanged from azertyFR.ts and carries the same VERIFY flags and
// confidence levels as that file — Belgium and France share the same
// "no true national standard, single reference machine not yet identified"
// situation, so there's no basis yet to diverge from the French draft on
// any of those slots.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const azertyBE: KeyboardLayout = [
  [
    { type: 'spacer' }, // no ² on mechanical AZERTY (azertyFR.ts); Belgian ³ shares this same physical key, era UNRESOLVED — see header note
    { type: 'char', lower: '&', upper: '1' }, // VERIFY exact pairing — see azertyFR.ts header note on manufacturer variation
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
    { type: 'char', lower: '^', upper: '¨' }, // dead key, HIGH confidence, carried from azertyFR.ts
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
    { type: 'char', lower: 'ù', upper: '´' }, // Dutch acute-accent dead key replacing French %, LOW confidence, era UNRESOLVED — see header note
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
    { type: 'char', lower: ',', upper: '?' }, // VERIFY — no source found for this row, carried from azertyFR.ts
    { type: 'char', lower: ';', upper: '.' }, // VERIFY
    { type: 'char', lower: ':', upper: '/' }, // VERIFY
    { type: 'char', lower: '!', upper: '§' }, // VERIFY — French Wikipedia vaguely flags §/! as differing in Belgium but gives no specifics, see header note
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
