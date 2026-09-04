import type { KeyboardLayout } from './types'

// Second-draft German QWERTZ layout, revised toward an authentic mid-20th-
// century mechanical typewriter, replacing the previous "first-draft, based
// on the modern standard keyboard" placeholder. Germany is the
// best-evidenced case in this kit so far: unlike France, it had a real
// formal typewriter-keyboard standard well before the computer era.
//
// Sources:
//  - fastfingerrace.com, "The Accidental Tyranny of the Keys": dates the
//    Y/Z swap's rationale to Friedrich Käding's 1898 letter-frequency
//    analysis of German (the 'tz' digraph, as in "Katze"/"Satz", is common
//    enough to reward putting T and Z on different hands), and states the
//    Reichsnormenausschuss (national standards body) published Normblatt
//    1452 in 1931, formally standardizing the German typewriter keyboard —
//    decades before any computer-keyboard standard existed.
//    https://fastfingerrace.com/blog/geschichte-der-tastatur?lang=en
//  - German Wikipedia, "DIN 2137": confirms DIN 2137 originally existed as
//    separate parts for typewriters vs. data equipment — Part 1 (Nov. 1995)
//    was explicitly titled "Deutsche Tastatur für Schreibmaschinen" (German
//    typewriter keyboard) — and that the typewriter/computer split wasn't
//    merged into one unified standard until 2012. The pre-2012 typewriter
//    part is described as reflecting "Einschränkungen und Kompromisse im
//    Schriftbild" (constraints and compromises from mechanical typesetting).
//    https://de.wikipedia.org/wiki/DIN_2137
//  - typografie.info, on the 2012+ DIN revision: notes that even the basic
//    modern layout "is still stuck in the typewriter era" for everyday
//    punctuation — i.e. the core letter/punctuation shape carried over
//    largely intact, and it's specifically the AltGr-accessed layer
//    (brackets, @, backslash, pipe, tilde — needed for programming, absent
//    here) that's the purely computer-era addition.
//    https://www.typografie.info/3/artikel.htm/n/t/neue-tastaturnorm-din-2137-r438/
//
// Changes from the previous draft, and confidence level for each:
//  - Letters (including the Y/Z swap) UNCHANGED. HIGH confidence: directly
//    dated and sourced (1898 rationale, 1931 formal standard) above.
//  - Umlauts (ä/Ä, ö/Ö, ü/Ü) and ß UNCHANGED. HIGH confidence: these are
//    load-bearing for written German and have been on German typewriters
//    since essentially the beginning; no bracket key was ever inserted
//    after 'p' the way computer keyboards do, which is itself correct here.
//  - Kept ° (degree) as 0's... as the *shift* of the leftmost key. MEDIUM-
//    HIGH confidence: a degree sign has obvious typewriter-era utility
//    (temperatures, angles) unlike the computer-only symbols removed from
//    the English drafts in this kit.
//  - LOW CONFIDENCE / UNVERIFIED, flagged inline: the leftmost key's
//    *unshifted* circumflex (^) — German has little use for a bare
//    circumflex accent (unlike French), so this may be a later
//    computer-keyboard reuse of that slot rather than the 1931-standard
//    assignment; and the ´/` key at the end of row 0 — ´ (acute accent, used
//    for spelling loanwords) is plausible for 1931, but its shifted partner
//    backtick (`) has no known typewriter-era use anywhere (same
//    programming-era symbol removed from the US/UK drafts) and is flagged
//    here rather than removed outright, since — unlike those drafts — I
//    don't have a source confirming this specific key was absent rather
//    than just differently assigned on German machines.
//  - The rest of the top-row shifted symbols (!, ", $, %, &, /, (, ), =, ?)
//    and the bottom-row punctuation (;, :, _) are UNVERIFIED against a
//    specific 1931-standard or period-machine source — plausible carryovers
//    per the "stuck in the typewriter era" note above, but not individually
//    confirmed. VERIFY against DIN 2137-1:1995 itself (the retroactive
//    typewriter-specific part) or a photographed period machine if
//    precision matters here.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const qwertzDE: KeyboardLayout = [
  [
    { type: 'char', lower: '^', upper: '°' }, // ^ (unshifted) VERIFY — see header note
    { type: 'char', lower: '1', upper: '!' },
    { type: 'char', lower: '2', upper: '"' },
    { type: 'char', lower: '3', upper: '§' }, // HIGH confidence — standard German office symbol
    { type: 'char', lower: '4', upper: '$' }, // VERIFY
    { type: 'char', lower: '5', upper: '%' }, // VERIFY
    { type: 'char', lower: '6', upper: '&' }, // VERIFY
    { type: 'char', lower: '7', upper: '/' }, // VERIFY
    { type: 'char', lower: '8', upper: '(' }, // VERIFY
    { type: 'char', lower: '9', upper: ')' }, // VERIFY
    { type: 'char', lower: '0', upper: '=' }, // VERIFY
    { type: 'char', lower: 'ß', upper: '?' }, // ß HIGH confidence; '?' pairing VERIFY
    { type: 'char', lower: '´', upper: '`' }, // ´ plausible, ` VERIFY — see header note
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
