import { qwertzDE } from './qwertzDE'

// Austria uses the identical German typewriter/keyboard standard — same
// letters, same symbols, same DIN 2137 lineage documented in qwertzDE.ts.
// Multiple sources (the QWERTZ Wikipedia article, cross-checked against
// DIN 2137's own scope) confirm Austrian keyboards differ from German ones
// only in a few printed key *labels* (e.g. "Strg" vs "Ctrl"), which don't
// affect this project's character data at all. So this is a re-export
// rather than a duplicated data file — matches fontDensity/charSets.js's
// qwertzAT entry, which is likewise identical to its qwertzDE entry.
export const qwertzAT = qwertzDE
