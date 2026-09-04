import type { KeyboardLayout } from './types'

// Second-draft Spanish QWERTY layout, revised toward an authentic mid-20th-
// century mechanical typewriter. Renamed from spanish.ts per project
// convention (first 5 keys + ISO code) — letters are standard, unswapped
// QWERTY here, unlike qzertyIT.ts or azertyFR.ts, so this rename is mostly
// a relabeling plus a verification/citation pass, not a structural rebuild.
// This file was the original project convention-setter (from keyboard.vue's
// hardcoded keys_lower/keys_upper) and was already closer to authentic than
// the other "first-draft, based on the modern keyboard" files, but its
// claims weren't individually sourced — that's addressed below.
//
// Sources:
//  - MUNCYT (Spain's Museo Nacional de Ciencia y Tecnología), exhibition
//    catalog "Catálogo qwerty": confirms Spain's typewriter keyboard was
//    the international QWERTY standard "with a key for the ñ added for
//    Spanish-speakers" ("incluye una tecla para la ñ en los teclados
//    destinados a los castellano-escribientes") — i.e. letters unchanged,
//    ñ added. Also dates "mecanografía" (typewriting) entering the RAE
//    dictionary to the 1914 edition, as a rough anchor for when typewriter
//    use became established in Spain.
//    https://www.muncyt.es/sites/default/files/2024-12/catalogo-qwerty.pdf
//  - Retro Tech Geneva, on a real cataloged Hispano-Olivetti Pluma 22 made
//    in Barcelona "sometime in the early fifties": directly confirms both
//    ñ and ¿ on an actual mid-century Spanish-market machine.
//    https://www.retrotechgeneva.net/2011/01/hispano-olivetti-pluma-22-beige.html
//  - ElGranero Typewriter.Company, "The Spanish QWERTY (Ñ) Keyboard
//    Layout": corroborates ¿, ¡, and ç ("common in Catalan") as
//    characteristic Spanish-keyboard symbols — though this source reads as
//    describing the modern keyboard more than a specific period machine,
//    so treated as MEDIUM confidence, not primary-source-grade.
//    https://typewriter.company/blogs/typewriter-blog/spanish-qwerty-keyboard-layout-n
//  - The missing-1/missing-0 claim (inherited from the original spanish.ts)
//    wasn't independently sourced for Spain specifically, but the same
//    convention was independently confirmed for Olivetti's Italian line
//    across two different decades while researching qzertyIT.ts (1935
//    Studio 42, 1972 Lettera 35) — since Hispano-Olivetti shared the parent
//    company's engineering, this raises the claim to MEDIUM-HIGH confidence
//    via manufacturer continuity, rather than a Spain-specific primary
//    source. See qzertyIT.ts for that sourcing.
//
// Changes from the previous spanish.ts, and confidence level for each:
//  - Added ¡ (inverted exclamation mark) as the shift of the leftmost key,
//    replacing an unused lower === upper ('*'/'*') placeholder. This isn't
//    a sourced correction, it's a plain gap-fix: ¡ is exactly as essential
//    to Spanish as ¿ (which the file already had), and the previous draft
//    was simply missing it entirely.
//  - Flagged (not removed) the backtick/caret key ('/^) at the end of row
//    1. MEDIUM confidence concern: this kit's US/UK research established
//    that no mechanical typewriter had a *backtick* key specifically (a
//    computer-terminal-era character) — but unlike those drafts, Spanish
//    plausibly had *some* accent-related key there for loanwords, so this
//    is flagged for verification rather than converted to a spacer.
//  - Everything else (ª/º ordinal marks replacing the missing '1', ç, the
//    digit-row shifts, ñ/Ñ, and the bottom-row punctuation) is UNCHANGED
//    from spanish.ts and remains at its original confidence level — plausible
//    and partially corroborated above, but not a verified period table.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from this file's own control-key slots, which every other
// preset in this kit in turn copies from — see e.g. qwertyUS.ts.
export const qwertyES: KeyboardLayout = [
  [
    { type: 'char', lower: '*', upper: '¡' }, // ¡ added — gap-fix, see header note
    { type: 'char', lower: 'ª', upper: 'º' },
    { type: 'char', lower: '2', upper: '"' },
    { type: 'char', lower: '3', upper: '/' },
    { type: 'char', lower: '4', upper: '(' },
    { type: 'char', lower: '5', upper: ')' },
    { type: 'char', lower: '6', upper: '&' },
    { type: 'char', lower: '7', upper: '-' },
    { type: 'char', lower: '8', upper: '¿' },
    { type: 'char', lower: '9', upper: '?' },
    { type: 'char', lower: '-', upper: '!' },
    { type: 'char', lower: 'ç', upper: '$' }, // MEDIUM confidence — see header note
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
    { type: 'char', lower: '`', upper: '^' }, // VERIFY — see header note
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
    { type: 'char', lower: 'ñ', upper: 'Ñ' },
    { type: 'char', lower: '´', upper: '¨' },
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
    { type: 'char', lower: ',', upper: ';' },
    { type: 'char', lower: '.', upper: '=' },
    { type: 'char', lower: ':', upper: '%' },
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
