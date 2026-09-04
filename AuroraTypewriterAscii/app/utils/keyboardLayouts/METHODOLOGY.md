# Typewriter Keyboard Presets — Methodology & Sourcing Notes

This document explains how the keyboard-layout presets in `keyboardLayouts/`
(and their character sets in `fontDensity/charSets.js`) were built, what
they're trying to represent, and where each one is strong or shaky. It's
meant as a working reference for extending the pack, not a finished
scholarly paper — several presets are explicitly first drafts pending
better sourcing.

## 1. Purpose and scope

The starting problem: Wikipedia's general "Keyboard layout" article, and
most casual sources, describe *modern computer keyboards* — QWERTY as
shipped on a PC today, with AltGr layers, ISO extra keys, and Unicode
compose sequences. That's a different object from a *mechanical typewriter
keyboard*, roughly 1870s-1980s, and the two get conflated constantly. A
typewriter has no AltGr, no dead-key software, no Ctrl/Alt — a key does one
of exactly two things (unshifted, shifted), full stop.

So the goal for every preset in this kit is: **reconstruct the layout of an
actual mechanical typewriter**, for a specific country/language, with
sourcing, not the modern OS keyboard for that locale — while being honest
when the only sourcing available *is* a modern reference, and flagging that
gap rather than hiding it.

Two things follow from that goal:

- Content that's demonstrably computer/AltGr-era only (², ³, €, ISO extra
  keys, multi-output dead keys, Central-European "compose" layers that
  cover half a dozen languages from one modifier key) is generally **not**
  modeled, even when the most convenient modern reference includes it.
- Where no primary typewriter-era source could be found, the modern
  standard is used as a structural starting point but flagged accordingly
  (see confidence tiers, §3) rather than presented as equally solid.

## 2. The data model, and why it constrains everything

Every preset is a `KeyboardLayout` = `KeyRow[]` = `KeyDef[][]` (see
`types.ts`). The important constraints:

- **A `KeyDef` has at most two outputs**: `lower` and `upper` (unshifted /
  shifted). There is no third state. Real AltGr layers and true dead keys
  (one modifier key producing a *dozen* different letters depending on
  what's typed next) cannot be represented at all — only faked, at best, by
  cramming two marks onto one key's lower/upper pair (see §3).
- **The row-width budget is a project convention, not a type-system
  constraint.** `KeyRow` is just `KeyDef[]` — an ordinary array, not a
  fixed-length tuple — so nothing in `types.ts` itself caps how many keys a
  row can hold. The cap lives entirely in this kit's own modeling
  discipline, and in whatever the consuming renderer (`keyboardEvo.vue`,
  outside this data package) currently assumes about row length. Twelve of
  the eighteen presets in this pack still use the **default fixed grid**:
  - Row 0: 13 `char` slots + 1 trailing `spacer` (14 elements)
  - Row 1: 11 `char` slots + 1 `backspace` (12 elements)
  - Row 2: `shiftHold` + 11 `char` slots + `shiftHold` (13 elements)
  - Row 3: `shiftToggle` + 10 `char` slots + `shiftToggle` (12 elements)
  - Row 4: 1 `space` element

  That's 32 total `char` slots across the three letter rows, plus 13 more
  on the digit row (some of which get repurposed for letters — see below).
  Treat this as the *default* budget for any new preset unless there's a
  specific, documented reason (same as the six presets below) to widen it.

- **Six presets widen specific rows beyond that default**, on the project
  owner's call, because their original 11/11/10-slot letter rows were
  demonstrably the *only* reason sourced, period-authentic content was
  being cut — as distinct from a genuine period-authentic absence, which
  stays modeled as a `spacer` and is never "fixed" by widening. Each
  widened file documents its own new per-row maximum inline (look for a
  `REVISION` paragraph in the file header); this table summarizes the
  result (element counts include each row's non-`char` elements — spacer,
  backspace, shiftHold/shiftToggle pairs — same basis as the default-grid
  list above):

  | Preset     | Row 0 | Row 1 | Row 2 | Row 3 | What the extra room restored |
  |------------|:-----:|:-----:|:-----:|:-----:|-------------------------------|
  | qwertzHU   | 14    | 13    | 14    | 13    | q, w, x, and ű back at its sourced home-row position |
  | qwertzSK   | 14    | 14    | 13    | 12    | q, w back at their standard QWERTZ positions |
  | fggioTR    | 14    | 14    | 14    | 12    | q, w in the upper row, x in the home row |
  | ewertPL    | 14    | 13    | 15    | 14    | q; x and v; and ń, ź (full 9-of-9 diacritic coverage) |
  | qwertzCZ   | 14    | 13    | 15    | 12    | ň, ó, ť (full 15-of-15 diacritic coverage) |
  | qwertyPT   | 14    | 13    | 13    | 12    | a bare circumflex key (existence-only, doesn't enable â/ê/ô) |

  qwertzHU and qwertzCZ are now the only two presets in the pack with
  **zero** remaining capacity-driven omissions — everything dropped from
  either file reflects a genuine sourced or inferred absence, not a slot
  shortage.

That default 32-slot ceiling still turned out to matter for most of the
pack. English needs 26 letters plus a handful of punctuation marks and fits
comfortably. Languages with more than ~29-32 letters in active use
(Turkish: 29 native letters; Polish: 32; Czech: 15 diacritics on top of the
Latin base; Slovak: 17) do **not** fit the default budget without cuts.
Every preset that hit this wall documents exactly what got cut and why
(usually: drop non-native loanword letters first, q/w/x being the
recurring casualties, then prioritize the remainder by corpus
letter-frequency data where a source was available) — and, for the six
widened files above, exactly what was subsequently restored once the cap
was relaxed.

**A note on the renderer**: this data package doesn't include
`keyboardEvo.vue`, the Vue component that actually draws these layouts, so
the widened rows above are unverified against its rendering logic — they're
correct as *data*, matching each file's documented target skeleton
exactly, but the project owner has flagged that the component's own
handling of variable row lengths may still need adjustment, planned as
separate follow-up work.

## 3. Sourcing and confidence conventions used throughout

- **Inline `// VERIFY` comments** mark any slot whose content is a
  plausible-but-unconfirmed guess, alongside a prose confidence tier in
  the file header: HIGH / MEDIUM-HIGH / MEDIUM / LOW. HIGH generally means
  a primary source (a museum, a national standard with a date, an actual
  cataloged machine) confirms the exact content and position; LOW/VERIFY
  means it's a plausible carryover or an editorial guess.
- **`{ type: 'spacer' }`** is used when a key's absence is *itself*
  confirmed — e.g. no mechanical typewriter had a backtick/tilde key, no
  French AZERTY typewriter had a ² key (computer-era only). This is a
  positive claim ("this key wasn't there"), not a shrug.
- **`lower === upper` placeholders** (e.g. `{ lower: '?', upper: '?' }`)
  are used when a physical key almost certainly existed but its actual
  content is genuinely unknown — a different kind of gap than a spacer,
  and always commented as such.
- **Combined dead-key marks on one slot**: several real typewriters layer
  two accent marks onto one physical key (e.g. circumflex+diaeresis on
  French AZERTY, acute+tilde on Portuguese). Since a `KeyDef` has exactly
  two output states, this maps naturally: `lower` gets one mark, `upper`
  gets the other. This only works for genuine two-output keys — it does
  **not** extend to true dead keys that produce many different letters
  depending on the next keystroke (see §2); those are either dropped or
  individually modeled as fixed pairs elsewhere, and the gap is noted.
- **Frequency-based prioritization under schema pressure**: for Polish,
  Czech, and Slovak, real corpus letter-frequency data (mostly from
  sttmedia.com) was used to decide which diacritics get a slot when there
  isn't room for all of them. This is flagged as an editorial call, not a
  sourced fact about the historical keyboard, wherever it's used.
- **Dropping non-native loanword letters** (usually q, w, and/or x) is the
  first move when a language's grid is over budget — these letters exist
  on the keyboards mostly for foreign words/names, so they're the least
  costly cut. Confirmed independently for Turkish (Wichary's firsthand
  machine examination), Slovak (a Slovak-language keyboard-reform page
  explicitly complains about their rare usage), and by omission from the
  native alphabet for Polish and Hungarian.

## 4. Naming convention

Preset names follow **the first keys of the top letter row (the row
directly under the digit row) + the ISO country code(s)** — *not* an
assumed "QWERTY" — because several countries genuinely don't use QWERTY
letter order. Examples: `qzertyIT` (Italian is Q-Z-E-R-T, not Q-W-E-R-T),
`hcesarPT` (Portugal's HCESAR standard reads H-C-E-S-A-R across its top
row, nothing like QWERTY at all). Where a family shares a root
(`qwertz…`, `qwerty…`) the ISO suffix disambiguates, exactly like
`qwertzDE`/`qwertzAT`/`qwertzCH`/`qwertzCZ`/`qwertzSK`/`qwertzHU`.

Two edge cases came up where a top-row letter has no distinct ASCII form:
Turkish `Ğ`/`ı` and Polish `Ę`. In both cases the convention (confirmed
with the project owner) is to transliterate to the base Latin letter,
diacritic dropped, even if that produces a doubled letter —
`fggioTR` (F-G-**Ğ→g**-I-O) and `ewertPL` (**Ę→e**-W-E-R-T).

Multi-country files use an underscore where one file genuinely covers two
countries' shared standard: `qwertyDK_NO`, `qwertySE_FI`.

## 5. Kinds of sources consulted

Roughly, in descending order of trust:

1. **National/period standards with a name and date** — Germany's DIN
   2137 / Normblatt 1452 (1931), Portugal's HCESAR decree (1937),
   Czechoslovakia's ČSN 17 8151 (1974) and its predecessors, Turkey's
   TSE 2117 (1955), Poland's BN-74/3123-01 → PN-I-06000:1997.
2. **Museums, archives, and cataloged real machines** — Spain's MUNCYT
   catalog, Portugal's CGD historical study, Typewriter Database's
   cataloged units, OS/2 Museum's examination of a dated Consul/Remington,
   oz.Typewriter (Robert Messenger's collector blog, used for Brazilian
   Olivettis and a dated 1939 Hungarian Remtor), Retro Tech Geneva.
3. **Academic/primary-research sources** — Yasuoka & Yasuoka's "On the
   Prehistory of QWERTY" (patent research), letter-frequency corpora
   (sttmedia.com) used for Polish/Czech/Slovak prioritization decisions.
4. **National-language Wikipedia articles and encyclopedias**, cross-
   checked against each other and against English Wikipedia where
   possible — used for most countries as a structural backbone.
5. **Modern OS keyboard references** (chiefly Microsoft's
   `learn.microsoft.com/.../globalization/keyboards/kbd*.html` driver
   docs) — used where no typewriter-specific source could be found, always
   flagged as a lower-confidence structural stand-in rather than treated
   as typewriter-era fact.
6. **Enthusiast/typing-tutorial blogs** (Typing Hero, azerty.global,
   CasaTempo, and similar) — used for cross-checking structural claims,
   generally treated as MEDIUM confidence.

Sources that were tried and abandoned: `quadibloc.com` and
`kbdlayout.info` (both stuck in unresolvable redirect loops), Richard
Polt's Classic Typewriter Page (robots.txt-blocked), and a handful of
small Central/Eastern European sites with the same redirect-loop issue
(`ims.mii.lt`, `ceskaklavesnice.cz`, `sunsite.icm.edu.pl`) — these were
abandoned after 1-2 attempts each rather than retried indefinitely.

## 6. Per-preset notes

### qwertyUS — United States
Letter order (QWERTYUIOP/ASDFGHJKL/ZXCVBNM) sourced to Yasuoka & Yasuoka's
patent research, already fixed by the 1882 Remington No. 2. Backtick/tilde
and the bracket-after-P key removed as computer-era-only (HIGH); caret (^)
over 6 replaced with the cent sign (¢), a well-documented American office
convention (MEDIUM-HIGH). A few digit-row shift values remain VERIFY.

### qwertyUK — United Kingdom
Same letter-order sourcing as US. No `¬` (logical NOT, a 1980s computer
addition) and no `@` on the apostrophe key — @'s typewriter-era position
is unresolved, so it's simply left out rather than guessed (MEDIUM).

### qwertzDE — Germany
The best-evidenced "why" of any file in the kit: Friedrich Käding's 1898
German letter-frequency analysis explains the Y/Z swap (the "tz" digraph),
and DIN's Normblatt 1452 (1931) formalized it decades before any computer
standard existed (HIGH). Umlauts and ß unchanged, load-bearing since the
early 20th century.

### qwertzAT — Austria
A re-export of `qwertzDE`, not a separate data file — sourcing confirms
Austrian and German typewriter keyboards are character-for-character
identical, differing only in printed key *labels* (e.g. "Strg" vs "Ctrl"),
which this project doesn't model anyway.

### qwertzCH — Switzerland
Genuinely distinct: built to serve German-, French-, and Italian-speaking
regions on one physical keyboard. No ß (Swiss orthography dropped it from
January 1938, independently of computers — HIGH); adds ç and dead-key
access to French/Italian accented vowels. Structural placement of those
accents leans on a modern Microsoft reference (MEDIUM), since no
typewriter-specific table was found.

### azertyFR — France
Important caveat baked into the header: **France never had one true
national AZERTY standard until 2019** — pre-2019, "each manufacturer
settled things on its own." This file represents one well-documented
reference machine (the 1951 Hermes Baby) rather than a claimed universal
standard. The ² key is confirmed computer-era-only and modeled as a
spacer (HIGH); the circumflex/diaeresis combined dead key after P is
confirmed on the actual cataloged 1951 unit (HIGH).

### azertyBE — Belgium
Built directly on `azertyFR`'s structure (HIGH — multiple sources agree
Belgian and French AZERTY are structurally identical). Belgium's own
additions — a ³ key and a Dutch acute-accent dead key (for words like
"vóór") — have a genuinely **unresolved typewriter-vs-1980s-computer-era
origin**, flagged prominently rather than resolved by guessing; the ³ is
modeled as a spacer by the same logic as French ², and the Dutch dead key
is modeled at LOW confidence.

### qzertyIT — Italy
Renamed from the old QWERTY-based `italian.ts`, which was historically
wrong. Sourced structural traits: Z/W swapped, M moved to the home row,
digits on Shift, and — confirmed across two different Olivetti models
decades apart (1935 Studio 42, 1972 Lettera 35) — no dedicated 1 or 0 key,
substituted by lowercase l / uppercase O. Seven dedicated accented-vowel
keys, no dead keys (HIGH, CasaTempo + Olivetti Wikipedia articles).

### qwertyES — Spain
Standard unswapped QWERTY plus a dedicated ñ, confirmed by Spain's own
national science museum (MUNCYT) catalog and a cataloged early-1950s
Hispano-Olivetti Pluma 22. The missing-1/missing-0 convention is inherited
from Olivetti's shared engineering with the Italian line (MEDIUM-HIGH via
manufacturer continuity, not a Spain-specific primary source).

### hcesarPT — Portugal (1937-1971 standard)
The highest-stakes rewrite in the kit: a **completely non-QWERTY** layout
(top row reads H-C-E-S-A-R), legally mandated by Decree-Law 27,868 in
1937 to protect a domestic manufacturer from foreign competition, and
compulsory until 1971 (English Wikipedia says "mid-70s" — the
discrepancy is noted, not resolved). Real manufacturers (Olympia, Hermes,
Royal, Remington, Olivetti, Brother) all built HCESAR-layout machines for
this market — a genuine national standard, not a curiosity. The full grid
came from a single AI-compiled source (Grokipedia) rather than a
museum/academic table, so this whole file is flagged as a first draft
pending independent corroboration, despite otherwise-solid supporting
sourcing (the decree, the "keys that fooled Salazar" swappable-keycap
story, negative evidence on missing !/*/# from two independent Portuguese
sources).

### qwertyPT — Portugal (modern/post-1974 standard)
The layout HCESAR was mandated to displace, and which resurfaced as the
real standard from the 1970s-80s on. Much higher confidence than
`hcesarPT` — this is essentially today's documented Portuguese keyboard
(Microsoft's kbdpo reference, English Wikipedia, Typing Hero, all
cross-checked) rather than a single-source reconstruction of an obsolete
mechanical layout. **Row 1 widened to 13 elements** (§2) to add a bare
circumflex key after the acute/tilde and grave/diaeresis dead-key combos —
included for physical-key completeness only, flagged explicitly as NOT
enabling â/ê/ô typing in this app (this kit's `KeyDef` schema still can't
represent a true combining dead key), the lowest-priority and most
optional of the six widening edits in this pass.

### qwertyDK_NO — Denmark / Norway
One shared file, not two: Danish and Norwegian sources agree the two
countries share a keyboard using Æ/Ø/Å, as distinct from Swedish/Finnish's
Ä/Ö/Å. Nordic typewriter history was the thinnest-documented corner of
this whole project — no equivalent of Yasuoka's paper or a Normblatt-style
standard turned up despite real effort — so this is a lighter
citation-and-flagging pass on the pre-existing draft rather than a
ground-up rebuild. A Danish source describing an actual Erika-brand
machine "with Danish keys Å Ø Æ" is the strongest single piece of
period-machine evidence found.

### qwertySE_FI — Sweden / Finland
Same research pass and same confidence profile as `qwertyDK_NO`, sharing
its header's reasoning; Ä/Ö/Å in place of Æ/Ø/Å.

### fggioTR — Turkey (F-keyboard)
One of the best-sourced files in the kit: a purpose-designed (not
QWERTY-derived) layout from a real 1951-1955 government commission led by
İhsan Sıtkı Yener, based on an actual letter-frequency study of 30,000
Turkish words, registered 20 October 1955, and legally mandated for
imported typewriters until 1980s PCs shipped QWERTY instead (comparable in
rigor to Germany's Normblatt or Portugal's HCESAR). All 29 native Turkish
letters fit the original grid exactly once q/w/x (non-native, and
independently placed "near the digits" rather than in the letter rows by a
firsthand period-machine examination) were dropped. Digit-row shift
symbols are VERIFY — the same firsthand source describes a real unit
missing several of them (no dedicated '1', missing &/$/=/+/!/;), a tension
the file documents rather than resolves. **Upper and home rows widened to
14 elements each** (§2): q/w now sit in the upper row and x in the home
row, following the modern driver's placement now that there's room —
MEDIUM confidence, since this creates a genuine tension with Wichary's
firsthand account that these letters sat "near the digits" on a real
mechanical unit, not interleaved into the letter rows.

### ewertPL — Poland ("klawiatura maszynistki" / 214)
Genuinely QWERTZ-derived from German typewriters (Polish Wikipedia:
German ä/ö/ü/ß replaced by Polish diacritics; "the only keyboard layout
used in Poland" before computers; later standard BN-74/3123-01 →
PN-I-06000:1997). Poland needs 9 extra letters where German needed 4, so
under the original grid, even after dropping non-native q/x/v, the layout
was 3 short — resolved by keeping the 7 most-frequent of Poland's 9
diacritics (corpus data), dropping ń and ź as the two least frequent.
**All three letter rows widened** (§2: row 1 to 13, row 2 to 15, row 3 to
14 elements): q, x, and v are all restored, and ń/ź now have their own
slots at the end of the home row — full 9-of-9 diacritic coverage, with
nothing left dropped for capacity reasons alone (the digit row's ć-for-ß
repurposing and its knock-on '?' relocation remain unchanged, since those
reflect a genuine slot trade-off on that row, not a letter-row capacity
issue).

### qwertzCZ — Czech Republic
Both a real dated machine (a 1926 Remington/Consul, examined on OS/2
Museum) and the modern standard independently confirm Czech keyboards put
accented letters where the digit row's base values normally go, with
digits reachable via Shift — a structural gift that maps directly onto
this kit's two-output `KeyDef` model. Real standard numbers with dates:
ČSN 01 6906 (~1953), ČSN 17 8151 (typewriter-specific, March 1974), ČSN 36
9050 (computer-era, 1994). **Top and home rows widened to 13 and 15
elements** (§2): ň, ó, and ť — originally dropped as the three
least-frequent of 15 Czech diacritics by corpus data — are now included
too (no sourced position for any of the three, VERIFY on placement only).
Full 15-of-15 Czech diacritic coverage; alongside qwertzHU, this is one of
only two presets in the pack with zero capacity-driven omissions left.

### qwertzSK — Slovakia
Built as a sibling to `qwertzCZ`, not merged with it — real differences
exist (Slovak has ä/ľ/ĺ/ô/ŕ that Czech lacks; Czech has ě/ř/ů that Slovak
lacks). The same digit-row-doubles-as-diacritics structure is used, but
flagged as an *extrapolation* from Czech's directly-sourced version
(plausible given the shared Czechoslovak ČSN history, not independently
confirmed for Slovak). 15 of 17 Slovak diacritics included — the best
percentage coverage in the kit — dropping only ĺ (0.02%) and ŕ (0.01%),
independently corroborated as absent from the real traditional keyboard
by a Slovak keyboard-reform advocacy page. **Top row widened to 14
elements** (§2): q and w are restored to their standard QWERTZ positions —
the only capacity-driven omission this file had (the ĺ/ŕ drop is a
sourced-absence call, not a capacity one, so it's left untouched).

### qwertzHU — Hungary
The cleanest file in the kit: all nine Hungarian accented letters (á é í
ó ö ő ú ü ű) have genuinely dedicated keys on the sourced structural
reference, no dead-key combining needed anywhere, and a real dated 1939
Remtor typewriter (a Hungarian-market rebadged Torpedo, examined on
oz.Typewriter) independently corroborates five of the nine. Originally
only the usual non-native q/w/x needed dropping. **All three letter rows
widened** (§2: row 1 to 13, row 2 to 14, row 3 to 13 elements): q, w, and
x are all restored, and ű is back at its sourced home-row position rather
than relocated into the top row — this file now matches the sourced table
exactly, letters and positions both, with zero capacity-driven compromises
remaining. No Hungarian standard-body number or date could be found
despite a real search effort — noted plainly rather than invented.

## 7. Known gaps and candidates not (yet) built

- **Turkmen ÄWERTY** — considered and rejected. Turkmenistan's current
  Latin alphabet dates only to 1994, by which point computers were already
  displacing typewriters; the only sourcing found for ÄWERTY was a modern
  Windows keyboard-layout reference, with no tie to an actual mechanical
  machine. This looks like exactly the modern-keyboard-mistaken-for-
  typewriter trap this project exists to avoid.
- **Lithuanian ĄŽERTY** — held, not rejected outright. Unlike Turkmen,
  Lithuania has used Latin script since well before typewriters existed,
  so a genuine interwar or Soviet-era Lithuanian typewriter standard could
  exist — but the only place the term "ĄŽERTY" itself turned up defined
  was a Lithuanian *computing* dictionary, and no source confirmed it (or
  anything else) as mechanical-typewriter-era. Worth revisiting if a
  better source surfaces.
- **Plausible, unverified candidates flagged during research but not yet
  built**: Icelandic (þ/ð are genuinely distinctive), Romanian (reportedly
  has a legacy typewriter-era layout distinct from its modern standard),
  Dutch (mechanical typewriters reportedly sometimes had a dedicated "IJ"
  ligature key — a nice detail if sourceable). Brazilian ABNT2 and Latin
  American Spanish were considered and deprioritized: ABNT2 looks like a
  pure computer-era standard with no typewriter-era ABNT norm found, and
  Latin American Spanish's differences from Spain's seem to be mostly
  modern-software conventions rather than anything typewriter-specific.

## 8. Extending this pack

The repeatable process, as it settled over the course of this project:

1. Web-search for primary/academic/museum/collector sources for the target
   country's *typewriter* (not computer) keyboard, cross-checking claims
   across at least two independent sources where possible.
2. Decide letter-order and structure questions (shared file vs. split,
   which diacritics get a slot when the grid is short) explicitly, and
   flag or ask rather than guess when the decision changes file structure
   or naming.
3. Build the file against the fixed grid (§2), citing sources and flagging
   every uncertain slot inline (§3).
4. Recount every row's element total against the skeleton in §2 before
   shipping — this project caught real off-by-one bugs this way (`qzertyIT`
   was short a slot in its bottom row; an early `hcesarPT` draft was short
   one in its home row) and it's cheap insurance against breaking the
   app's rendering grid.
5. Update `keyboardLayouts/index.ts` (import + `presets` object) and
   `fontDensity/charSets.js` (the `layouts` entry) together — they're two
   parallel registries that must stay in sync.
6. Move any file a new preset replaces into `keyboardLayouts/_to_delete/`
   rather than deleting it outright, for manual cleanup.
