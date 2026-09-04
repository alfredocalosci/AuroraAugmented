import type { KeyboardLayout } from './types'
import { qwertyES } from './qwertyES'
import { qwertyUS } from './qwertyUS'
import { qwertyUK } from './qwertyUK'
import { qwertzDE } from './qwertzDE'
import { qwertzAT } from './qwertzAT'
import { qwertzCH } from './qwertzCH'
import { azertyFR } from './azertyFR'
import { azertyBE } from './azertyBE'
import { qzertyIT } from './qzertyIT'
import { hcesarPT } from './hcesarPT'
import { qwertyPT } from './qwertyPT'
import { qwertyDK_NO } from './qwertyDK_NO'
import { qwertySE_FI } from './qwertySE_FI'
import { fggioTR } from './fggioTR'
import { ewertPL } from './ewertPL'
import { qwertzCZ } from './qwertzCZ'
import { qwertzSK } from './qwertzSK'
import { qwertzHU } from './qwertzHU'

// Preset registry. Names match fontDensity/charSets.js's `layouts` keys
// (qwertyUS, qwertzDE, azertyFR, ...) so the two systems stay aligned as
// more verified national layouts are added — each is just a new data file
// plus one entry here. qwertzAT is a re-export of qwertzDE (Austria uses
// the identical standard, see qwertzAT.ts); qwertzCH is genuinely distinct
// data (see qwertzCH.ts).
export const presets = {
  qwertyES,
  qwertyUS,
  qwertyUK,
  qwertzDE,
  qwertzAT,
  qwertzCH,
  azertyFR,
  azertyBE,
  qzertyIT,
  hcesarPT,
  qwertyPT,
  qwertyDK_NO,
  qwertySE_FI,
  fggioTR,
  ewertPL,
  qwertzCZ,
  qwertzSK,
  qwertzHU,
} satisfies Record<string, KeyboardLayout>

export type PresetName = keyof typeof presets

export type { KeyboardLayout, KeyRow, KeyDef, KeyType, KeyPosition } from './types'
