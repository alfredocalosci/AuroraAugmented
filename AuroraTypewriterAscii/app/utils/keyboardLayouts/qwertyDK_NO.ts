import type { KeyboardLayout } from './types'

// Second-draft Danish/Norwegian layout, renamed per project convention
// (first 5 keys + ISO codes). Nordic typewriter history turned out to be
// far less documented than the other countries in this kit — no equivalent
// of Yasuoka's QWERTY paper, Germany's 1931 Normblatt, or Portugal's HCESAR
// decree turned up despite real effort, so this revision is a lighter
// citation-and-flagging pass rather than a ground-up reconstruction.
//
// Sources:
//  - Typing Hero, "QWERTY-NO (Norwegian/Danish)": confirms Norwegian and
//    Danish "are closely related (mutually intelligible in writing)" and
//    share one layout using Æ/Ø/Å, as distinct from Swedish/Finnish's Ä/Ö/Å
//    — matching this kit's existing DK/NO vs. SE/FI split.
//    https://typingheroapp.com/blog/qwerty-no-danish-norwegian/
//  - Danish Wikipedia, "Skrivemaskine": confirms Danish typewriters "follow
//    the QWERTY principle" (unswapped letters), and specifically describes
//    a real Erika-brand typewriter (a common, widely-exported East German
//    make) "with Danish keys Å Ø Æ" — direct confirmation of these three
//    characters on an actual period machine.
//    https://da.wikipedia.org/wiki/Skrivemaskine
//
// One thing I checked and did NOT act on: a Danish tech-blog aside (Version2)
// seemed, in translation, to suggest Norway shared Ä/Ö with Sweden rather
// than Æ/Ø with Denmark — which would contradict the sourced split above
// and also contradicts Norwegian orthography itself (Norwegian doesn't use
// ä/ö at all, only æ/ø/å), so I'm treating that as a translation/summary
// artifact rather than a real fact, and keeping the existing DK/NO split.
//
// Manufacturer note: the clearest period sources I found for Nordic
// typewriters (Halda, a major Swedish maker) turned out to describe
// export-market keyboards — QZERTY for an Italian/French distributor,
// AZERTY for another French-market model — rather than the Nordic domestic
// layout, which is itself informative (these manufacturers customized
// keyboards per export market) but didn't give me the domestic table I was
// looking for.
//
// Changes from the previous draft: only the dead-key slot at the end of
// row 0. Same reasoning as qwertzDE.ts/qwertyES.ts: ´ (acute, useful for
// loanwords) is plausible for the typewriter era, but its paired backtick
// (`) has no established typewriter-era use anywhere in this kit's
// research and is flagged rather than asserted. Everything else (the
// leftmost §/½ key, digit-row shifts, æ/ø placement, bottom-row
// punctuation) is UNCHANGED and remains at first-draft confidence — thin
// sourcing, not verified against a specific period machine.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const qwertyDK_NO: KeyboardLayout = [
  [
    { type: 'char', lower: '§', upper: '½' }, // VERIFY — thin sourcing, see header note
    { type: 'char', lower: '1', upper: '!' },
    { type: 'char', lower: '2', upper: '"' },
    { type: 'char', lower: '3', upper: '#' },
    { type: 'char', lower: '4', upper: '¤' }, // VERIFY
    { type: 'char', lower: '5', upper: '%' },
    { type: 'char', lower: '6', upper: '&' },
    { type: 'char', lower: '7', upper: '/' },
    { type: 'char', lower: '8', upper: '(' },
    { type: 'char', lower: '9', upper: ')' },
    { type: 'char', lower: '0', upper: '=' },
    { type: 'char', lower: '+', upper: '?' }, // VERIFY
    { type: 'char', lower: '´', upper: '`' }, // ´ plausible, ` VERIFY — see header note
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
    { type: 'char', lower: 'å', upper: 'Å' }, // HIGH confidence, see header note
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
    { type: 'char', lower: 'æ', upper: 'Æ' }, // HIGH confidence, see header note
    { type: 'char', lower: 'ø', upper: 'Ø' }, // HIGH confidence, see header note
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
    { type: 'char', lower: ',', upper: ';' }, // VERIFY
    { type: 'char', lower: '.', upper: ':' }, // VERIFY
    { type: 'char', lower: '-', upper: '_' },
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
