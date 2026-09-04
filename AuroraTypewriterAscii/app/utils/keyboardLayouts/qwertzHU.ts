import type { KeyboardLayout } from './types'

// First-draft Hungarian QWERTZ layout. New preset, named qwertzHU per
// project convention — same "qwertz" root as qwertzDE/AT/CH/CZ/SK.
//
// Sources:
//  - Microsoft, "Hungarian" keyboard layout (kbdhu, the Windows driver
//    reference): the fullest structural source found, and the cleanest
//    case in this kit so far — ALL NINE Hungarian accented letters
//    (á é í ó ö ő ú ü ű) have their own genuinely DEDICATED key, no
//    dead-key combining needed at all, unlike every Central European
//    layout built before this one. Confirms the Y/Z swap (QWERTZ), and
//    gives exact positions: ö/ü/ó at the end of the digit row, ő/ú at the
//    end of the top letter row, é/á/ű at the end of the home row, and í
//    leading the bottom row. Also documents a rich modern AltGr/dead-key
//    layer (acute, double-acute, diaeresis, caron, circumflex, grave,
//    breve, degree, ogonek, dot-above, cedilla, €) — the same general-
//    purpose Central-European Unicode layer already seen in qwertzCZ.ts,
//    ewertPL.ts and qwertzSK.ts, and not modeled here for the same reason.
//    https://learn.microsoft.com/en-us/globalization/keyboards/kbdhu.html
//  - ZEGI Múzeumok (a Hungarian museum blog), on the history of the
//    typewriter/keyboard: confirms in passing that "on Hungarian
//    keyboards, the Y and Z switched positions, and space was made for
//    Hungarian accented letters" — brief, but independent structural
//    corroboration of the Microsoft table's two headline features. No
//    standard number or date given, and despite a real search effort I
//    couldn't find one — unlike Germany's Normblatt 1452, Portugal's
//    HCESAR decree, or Czechoslovakia's ČSN 17 8151, I have no sourced MSZ
//    (Magyar Szabvány) number or adoption date for the Hungarian keyboard
//    standard to cite here.
//    https://zegimuzeumok.hu/blog/az-irogep-a-szamitogepbillentyuzet-elodje/
//  - oz.Typewriter (Robert Messenger's typewriter-collector blog, already
//    used elsewhere in this kit for Brazilian Olivettis), "Remtor Portable
//    Typewriter from Hungary": examines a real dated machine — a 1939
//    Remtor (Remtor Typewriter Ltd, Budapest, a rebadged German Torpedo
//    Model 17) — and, via a commenter, confirms "Hungarian special
//    characters: á, é, ö, ő, ü" were present on it, independently
//    corroborating five of the nine Microsoft-sourced letters on an actual
//    period machine. Also notes the colon (:) was apparently missing from
//    this specific unit's punctuation.
//    https://oztypewriter.blogspot.com/2012/12/remtor-portable-typewriter-from-hungary.html
//
// MODELING DECISIONS:
//
//  REVISION: originally rows 1-3 were capped at 11/11/10 slots (this kit's
//  original fixed-grid skeleton), which forced q, w, and x out and ű off
//  its sourced position. The project owner decided that skeleton is worth
//  relaxing rather than treated as immovable, on the evidence that real
//  sourced tables for Turkish/Polish/Slovak/Hungarian alike kept wanting
//  12-13 slots in the top and home rows specifically — see
//  METHODOLOGY.md §2 for the reasoning. Row 1 is now 12 slots, row 2 is
//  now 12 slots, row 3 is now 11 slots (row 0 and the control-key rows are
//  unchanged). With that room, this file now matches the Microsoft table
//  EXACTLY, letters and positions both — no capacity-driven compromises
//  remain in it at all.
//
//  1. Row 0 (digit row) fits this kit's 13-slot budget exactly with no
//     changes needed: the 10 sourced digit/symbol pairs plus ö/ü/ó land on
//     13 slots precisely. HIGH-MEDIUM confidence for ö/ü/ó's presence and
//     position (also independently corroborated by the 1939 Remtor for
//     ö/ü); the digit-row symbol pairings themselves (', ", +, !, %, /, =,
//     (, )) are VERIFY — sourced only from the modern driver, no
//     typewriter-era confirmation found.
//  2. q, w, and x — none of the nine Hungarian accented letters are
//     native-alphabet casualties anywhere in this file, only these three
//     usual non-native loanword letters ever needed to compete for room,
//     and now they don't have to: all three are back at their sourced
//     positions (q/w in the top row, x leading the bottom row).
//  3. ű is back at its sourced home-row position (a s d f g h j k l é á ű),
//     rather than relocated into the top row the way the original
//     11-slot draft needed. Every one of á é í ó ö ő ú ü ű now sits
//     exactly where the Microsoft table puts it — MEDIUM-HIGH confidence,
//     matching the sourced table directly, no remaining placement guesses
//     in this file beyond the digit-row symbol pairings noted in #1.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const qwertzHU: KeyboardLayout = [
  [
    { type: 'char', lower: '0', upper: '§' }, // VERIFY — see header note #1
    { type: 'char', lower: '1', upper: "'" }, // VERIFY
    { type: 'char', lower: '2', upper: '"' }, // VERIFY
    { type: 'char', lower: '3', upper: '+' }, // VERIFY
    { type: 'char', lower: '4', upper: '!' }, // VERIFY
    { type: 'char', lower: '5', upper: '%' }, // VERIFY
    { type: 'char', lower: '6', upper: '/' }, // VERIFY
    { type: 'char', lower: '7', upper: '=' }, // VERIFY
    { type: 'char', lower: '8', upper: '(' }, // VERIFY
    { type: 'char', lower: '9', upper: ')' }, // VERIFY
    { type: 'char', lower: 'ö', upper: 'Ö' }, // HIGH-MEDIUM confidence, corroborated by the 1939 Remtor — see header note #1
    { type: 'char', lower: 'ü', upper: 'Ü' }, // HIGH-MEDIUM confidence, corroborated by the 1939 Remtor
    { type: 'char', lower: 'ó', upper: 'Ó' }, // HIGH-MEDIUM confidence, sourced position
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
    { type: 'char', lower: 'ő', upper: 'Ő' }, // MEDIUM-HIGH confidence, sourced position — see header note
    { type: 'char', lower: 'ú', upper: 'Ú' }, // MEDIUM-HIGH confidence, sourced position
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
    { type: 'char', lower: 'é', upper: 'É' }, // HIGH-MEDIUM confidence, corroborated by the 1939 Remtor — see header note #1
    { type: 'char', lower: 'á', upper: 'Á' }, // HIGH-MEDIUM confidence, corroborated by the 1939 Remtor
    { type: 'char', lower: 'ű', upper: 'Ű' }, // back at its sourced position — see REVISION note / header note #3
    { type: 'shiftHold', glyph: '↑' },
  ],
  [
    { type: 'shiftToggle', glyph: '⬆' },
    { type: 'char', lower: 'í', upper: 'Í' }, // MEDIUM-HIGH confidence, sourced position — see header note
    { type: 'char', lower: 'y', upper: 'Y' },
    { type: 'char', lower: 'x', upper: 'X' }, // restored — see REVISION note
    { type: 'char', lower: 'c', upper: 'C' },
    { type: 'char', lower: 'v', upper: 'V' },
    { type: 'char', lower: 'b', upper: 'B' },
    { type: 'char', lower: 'n', upper: 'N' },
    { type: 'char', lower: 'm', upper: 'M' },
    { type: 'char', lower: ',', upper: '?' }, // VERIFY — carried structurally from the qwertz family pattern
    { type: 'char', lower: '.', upper: ':' }, // VERIFY — a 1939 machine reportedly lacked a colon at all, see header note
    { type: 'char', lower: '-', upper: '_' }, // VERIFY
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
