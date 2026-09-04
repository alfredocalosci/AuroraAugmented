// Character sets by physical typewriter keyboard layout, Latin script only.
// Used to scope the density-measurement char list to characters that could
// actually appear on a real machine, rather than a font's full glyph set.
// Each layout lists the characters unique to (or emphasized by) that layout;
// `sharedBase` covers what virtually every layout has in common.

export const sharedBase = [
  ...'abcdefghijklmnopqrstuvwxyz',
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ...'0123456789',
  ' ', '.', ',', ';', ':', "'", '"', '!', '?',
  '-', '_', '+', '=', '/', '\\',
  '(', ')', '*', '&', '%', '$', '#', '@',
]

export const layouts = {
  qwertyUS: [],
  qwertyUK: ['£'],
  qwertzDE: [...'äöüßÄÖÜ'],
  qwertzAT: [...'äöüßÄÖÜ'],
  qwertzCH: [...'äöüéàèÄÖÜ'],
  azertyFR: [...'àâçéèêëîïôùûüœæÀÉÈÇ'],
  // same accented-letter inventory as azertyFR (structurally identical
  // layout, see keyboardLayouts/azertyBE.ts for sourcing); ´ (the Dutch
  // acute-accent dead key replacing French azertyFR's %-shift on the ù key)
  // isn't a standalone character so it doesn't need a separate entry here
  azertyBE: [...'àâçéèêëîïôùûüœæÀÉÈÇ'],
  // renamed from `italian` per project convention (first 5 keys + ISO code);
  // ç/Ç added — a genuine dedicated QZERTY key missed by the old entry, see
  // keyboardLayouts/qzertyIT.ts for sourcing
  qzertyIT: [...'àèéìòùçÀÈÉÌÒÙÇ'],
  // renamed from `spanish` per project convention (first 5 keys + ISO code);
  // ç/Ç added — present on qwertyES.ts (Catalan-influenced key), missed by
  // the old entry, see keyboardLayouts/qwertyES.ts for sourcing
  qwertyES: [...'áéíóúñüç¿¡ÁÉÍÓÚÑÜÇ'],
  // renamed from `portuguese` per project convention (first letters of the
  // top letter row + ISO code) AND because the actual mid-century standard
  // was HCESAR, not QWERTY — see keyboardLayouts/hcesarPT.ts for sourcing.
  // «» added (guillemets, used for Portuguese quotation); the old entry's
  // â/ê/ô/Â/Ê/Ô aren't confirmed present on the physical HCESAR grid
  // (only á/à/ã/ç and their capitals, plus a combined acute/tilde dead key,
  // are sourced) but are left in since Portuguese needs them regardless of
  // exactly how they were typed.
  hcesarPT: [...'áâãàçéêíóôõúü«»ÁÂÃÀÇÉÊÍÓÔÕÚÜ'],
  // the modern/post-1974-standard Portuguese QWERTY, as distinct from the
  // 1937-1971 mandated hcesarPT — see keyboardLayouts/qwertyPT.ts for
  // sourcing; same accented-character inventory as hcesarPT
  qwertyPT: [...'áâãàçéêíóôõúü«»ÁÂÃÀÇÉÊÍÓÔÕÚÜ'],
  // split rather than one merged "scandinavian" bucket: Danish/Norwegian and
  // Swedish/Finnish place different accented letters on the same physical
  // keys (æ/ø vs ä/ö) — å is shared by both, see keyboardLayouts/qwertyDK_NO.ts
  // and keyboardLayouts/qwertySE_FI.ts. Renamed from danishNorwegian/
  // swedishFinnish per project convention (first 5 keys + ISO codes).
  qwertyDK_NO: [...'æøåÆØÅ'],
  qwertySE_FI: [...'äöåÄÖÅ'],
  // Turkish F-keyboard — see keyboardLayouts/fggioTR.ts for sourcing. Note
  // ı (dotless i) and İ (dotted capital I) are BOTH distinct from ASCII
  // i/I: this layout uses all four of i/I/ı/İ as genuinely separate letters
  // (the Turkish i/ı distinction), not a lower/upper pair collapsing to two.
  fggioTR: [...'çğışüöÇĞIŞÜÖıİ'],
  // Polish "klawiatura maszynistki" / 214 typist keyboard — see
  // keyboardLayouts/ewertPL.ts for sourcing. Only the 7 of 9 diacritics
  // that fit this kit's fixed grid (ń and ź were dropped as the two
  // least-frequent, per sourced corpus data) are included.
  ewertPL: [...'ćężłąóśĆĘŻŁĄÓŚ'],
  // Czech QWERTZ — see keyboardLayouts/qwertzCZ.ts for sourcing. 12 of 15
  // Czech diacritics are included (ň, ó, ť dropped as the three
  // least-frequent, per sourced corpus data).
  qwertzCZ: [...'ěščřžýáíéůúďĚŠČŘŽÝÁÍÉŮÚĎ'],
  // Slovak QWERTZ — see keyboardLayouts/qwertzSK.ts for sourcing. 15 of 17
  // Slovak diacritics are included (ĺ, ŕ dropped as the two most extreme
  // rarities, per sourced corpus data — independently corroborated as
  // absent from the real traditional keyboard too).
  qwertzSK: [...'áýéíščžťľóďúäňôÁÝÉÍŠČŽŤĽÓĎÚÄŇÔ'],
  // Hungarian QWERTZ — see keyboardLayouts/qwertzHU.ts for sourcing. All 9
  // Hungarian accented letters are included (the cleanest coverage in this
  // kit so far — nothing needed to be dropped for lack of a dedicated key).
  qwertzHU: [...'áéíóöőúüűÁÉÍÓÖŐÚÜŰ'],
}

const merged = new Set(sharedBase)
for (const chars of Object.values(layouts)) {
  for (const char of chars) merged.add(char)
}

export const allChars = [...merged]
