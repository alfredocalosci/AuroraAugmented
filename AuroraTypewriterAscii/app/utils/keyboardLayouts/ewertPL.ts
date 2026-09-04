import type { KeyboardLayout } from './types'

// First-draft Polish "klawiatura maszynistki" (typist keyboard) layout. New
// preset, named ewertPL per project convention (first 5 keys of the top
// letter row + ISO code). The actual top row reads Ę-W-E-R-T; since Ę has
// no distinct ASCII letter, this transliterates it to its base Latin
// letter (ę -> e) the same way fggioTR.ts handles Ğ/ı, producing "ewert"
// (a double 'e', same category of collision as fggioTR's double 'g').
//
// Sources:
//  - Polish Wikipedia, "Klawiatura maszynistki": confirms this layout was
//    adapted directly from German QWERTZ typewriters — "Czcionki
//    charakterystyczne dla języka niemieckiego (ä, ö, ü, ß) zostały
//    zastąpione przez czcionki polskie" (the German-specific characters
//    ä/ö/ü/ß were replaced with Polish ones) — and that before computers
//    this was "jedyny układ klawiatury stosowany w Polsce" (the only
//    keyboard layout used in Poland). States the modern standard is
//    PN-I-06000:1997, superseding an older norm BN-74/3123-01
//    ("Rozmieszczenie klawiszy i znaków na klawiaturach alfanumerycznych" —
//    "Arrangement of keys and characters on alphanumeric keyboards"), and
//    that IPACO first commercially promoted the layout in 1985, supplying
//    it to Poland's National Bank.
//    https://pl.wikipedia.org/wiki/Klawiatura_maszynistki
//  - wesmart.pl, comparing the "214" (typist/typewriter-derived) layout to
//    the modern QWERTY-based "Polski programisty": confirms 214 "wywodzi
//    się z maszyn do pisania" (derives from typewriters), "opiera się na
//    układzie QWERTZ" (is QWERTZ-based), and that its Polish diacritics
//    "są dostępne bezpośrednio po naciśnięciu dedykowanych klawiszy" (are
//    available directly via dedicated keys) — i.e. one physical key per
//    letter, not multi-keystroke dead-key combining, which fits a genuine
//    mechanical typewriter (no AltGr) much better than the multi-output
//    dead-key description below.
//    https://wesmart.pl/uklad-klawiatury-polski-programisty-vs-214-jaki-wybrac
//  - Microsoft, "Polish (214) Keyboard Layout" (kbdpl, the modern Windows
//    driver reference): gives the fullest structural table found —
//    confirms the QWERTZ Z/Y swap carried over unchanged from German, and
//    places ż at the end of the top letter row and ł/ą at the end of the
//    home row as their own dedicated keys (matching wesmart.pl above).
//    Also documents an AltGr/dead-key layer producing ć, ń, ó, ś, ź (among
//    OTHER Central European letters like á, ĺ, ŕ, ý that aren't even
//    Polish) from a shared acute-accent dead key — this layer is clearly a
//    modern, general-purpose Central-European Unicode convenience, not a
//    1974-standard mechanical-typewriter feature, so it isn't modeled here.
//    https://learn.microsoft.com/en-us/globalization/keyboards/kbdpl.html
//  - sttmedia.com, "Alphabet and Character Frequency: Polish": corpus
//    frequency data for the 9 diacritics, used below to decide which ones
//    get a slot when this kit's fixed grid runs short. Ranked (of those
//    measured): ę 1.13%, ż 0.93%, ą 0.79%, ó 0.79%, ś 0.72%, ć 0.60%,
//    ń 0.16%, ź 0.08%. (Ł wasn't broken out in this dataset but is
//    independently well-attested as common and structurally sourced above,
//    so it's kept regardless.)
//    https://www.sttmedia.com/characterfrequency-polish
//
// MODELING DECISIONS — this file needed real restructuring, like fggioTR.ts:
//
//  REVISION: originally the three letter rows were capped at 11/11/10 slots
//  (this kit's original fixed-grid skeleton), which forced q, x, v, ń, and ź
//  out entirely. The project owner decided that skeleton is worth relaxing
//  rather than treated as immovable — see METHODOLOGY.md §2 for the
//  reasoning. The top row is now 12 slots, the home row is now 13 slots,
//  and the bottom row is now 12 slots. With that room, q is restored to the
//  top row, x and v are restored to the bottom row (repositioned after m,
//  with ó/ś moved to follow them), and ń/ź now have their own dedicated
//  slots at the end of the home row — full 9-of-9 Polish diacritic
//  coverage, with nothing left dropped for capacity reasons alone.
//
//  1. Polish's native alphabet (32 letters: a ą b c ć d e ę f g h i j k l ł
//     m n ń o ó p r s ś t u w y z ź ż) doesn't include q, v, or x — those
//     only appear in loanwords, the same category as fggioTR.ts's q/w/x.
//     They're kept in this file (restored — see REVISION note) since the
//     grid now has room for both the loanword letters and the full native
//     diacritic set.
//  2. ż and ł/ą are placed exactly where the Microsoft table and
//     Wikipedia's "right side" description put them (HIGH-MEDIUM
//     confidence); ę (highest-frequency of the 9 diacritics) and ć
//     (repurposing German's ß slot on the digit row, since ß doesn't exist
//     in Polish) are placed by frequency alone, not sourced position
//     (VERIFY on exact placement, though not on the letters' existence);
//     ó and ś, next by frequency, are placed in the bottom row after m —
//     again VERIFY on placement, no source puts them there specifically.
//     This frequency-based placement was originally chosen under schema
//     pressure (when q/x/v were competing for the same slots); it's kept
//     now as the best available placement guess even though the pressure
//     that originally motivated it is gone.
//  3. ń (0.16%) and ź (0.08%), the two least-frequent diacritics by the
//     sttmedia.com data, are now included too (restored — see REVISION
//     note), placed at the end of the home row since no source gives them
//     a specific position — VERIFY on placement, not on existence.
//  4. Taking over the digit row's German ß slot for ć meant losing that
//     slot's shifted '?' — question marks are too essential to just drop,
//     so '?' was moved onto the bottom row's hyphen key (replacing German's
//     underscore) instead. VERIFY / accepted trade-off.
//  5. Whether the true mechanical BN-74/3123-01 typist keyboard actually
//     used any dead-key combining (the Polish Wikipedia article mentions
//     "two dead keys" while wesmart.pl says everything's a dedicated key)
//     is genuinely unresolved between sources — mechanical dead keys (a
//     non-advancing typebar struck before a base letter) ARE an authentic
//     pre-computer typewriter technology, unlike AltGr, so it's plausible
//     some version of this machine used one. But this kit's KeyDef schema
//     only supports a fixed lower/upper pair per key, not an open-ended
//     "combine with whatever's typed next" behavior, so even if dead keys
//     were real here, they can't be represented — same category of gap as
//     qwertyPT.ts's dropped circumflex, just larger in scope.
//
// Control keys (backspace/shiftHold/shiftToggle/space) are still copied
// verbatim from qwertyES.ts (renamed from spanish.ts): same glyphs, same
// slot positions, untouched.
export const ewertPL: KeyboardLayout = [
  [
    { type: 'char', lower: '^', upper: '°' }, // VERIFY — carried from qwertzDE.ts, not independently checked for Polish
    { type: 'char', lower: '1', upper: '!' },
    { type: 'char', lower: '2', upper: '"' },
    { type: 'char', lower: '3', upper: '§' }, // VERIFY — carried from qwertzDE.ts
    { type: 'char', lower: '4', upper: '$' }, // VERIFY
    { type: 'char', lower: '5', upper: '%' }, // VERIFY
    { type: 'char', lower: '6', upper: '&' }, // VERIFY
    { type: 'char', lower: '7', upper: '/' }, // VERIFY
    { type: 'char', lower: '8', upper: '(' }, // VERIFY
    { type: 'char', lower: '9', upper: ')' }, // VERIFY
    { type: 'char', lower: '0', upper: '=' }, // VERIFY
    { type: 'char', lower: 'ć', upper: 'Ć' }, // repurposes German's ß slot, placed by frequency not sourced position — see header note #2/#4
    { type: 'char', lower: '´', upper: '`' }, // VERIFY — carried from qwertzDE.ts, ` especially uncertain for typewriter era
    { type: 'spacer' },
  ],
  [
    { type: 'char', lower: 'ę', upper: 'Ę' }, // placed by frequency not sourced position — see header note #2
    { type: 'char', lower: 'q', upper: 'Q' }, // restored — see REVISION note
    { type: 'char', lower: 'w', upper: 'W' },
    { type: 'char', lower: 'e', upper: 'E' },
    { type: 'char', lower: 'r', upper: 'R' },
    { type: 'char', lower: 't', upper: 'T' },
    { type: 'char', lower: 'z', upper: 'Z' },
    { type: 'char', lower: 'u', upper: 'U' },
    { type: 'char', lower: 'i', upper: 'I' },
    { type: 'char', lower: 'o', upper: 'O' },
    { type: 'char', lower: 'p', upper: 'P' },
    { type: 'char', lower: 'ż', upper: 'Ż' }, // MEDIUM-HIGH confidence, sourced position — see header note #2
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
    { type: 'char', lower: 'ł', upper: 'Ł' }, // MEDIUM-HIGH confidence, sourced position — see header note #2
    { type: 'char', lower: 'ą', upper: 'Ą' }, // MEDIUM-HIGH confidence, sourced position — see header note #2
    { type: 'char', lower: 'ń', upper: 'Ń' }, // restored, placed by frequency not sourced position — see header note #3
    { type: 'char', lower: 'ź', upper: 'Ź' }, // restored, placed by frequency not sourced position — see header note #3
    { type: 'shiftHold', glyph: '↑' },
  ],
  [
    { type: 'shiftToggle', glyph: '⬆' },
    { type: 'char', lower: 'y', upper: 'Y' },
    { type: 'char', lower: 'x', upper: 'X' }, // restored — see REVISION note
    { type: 'char', lower: 'v', upper: 'V' }, // restored — see REVISION note
    { type: 'char', lower: 'c', upper: 'C' },
    { type: 'char', lower: 'b', upper: 'B' },
    { type: 'char', lower: 'n', upper: 'N' },
    { type: 'char', lower: 'm', upper: 'M' },
    { type: 'char', lower: 'ó', upper: 'Ó' }, // placed by frequency not sourced position — see header note #2
    { type: 'char', lower: 'ś', upper: 'Ś' }, // placed by frequency not sourced position — see header note #2
    { type: 'char', lower: ',', upper: ';' }, // VERIFY — carried from qwertzDE.ts
    { type: 'char', lower: '.', upper: ':' }, // VERIFY
    { type: 'char', lower: '-', upper: '?' }, // '?' relocated here from the digit row — see header note #4
    { type: 'shiftToggle', glyph: '⬇' },
  ],
  [
    { type: 'space' },
  ],
]
