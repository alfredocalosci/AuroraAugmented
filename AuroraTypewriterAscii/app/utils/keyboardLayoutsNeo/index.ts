import type { KeyboardLayoutNeo } from './types'
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

// Preset registry mirroring keyboardLayouts/index.ts's naming and ordering,
// but for the KeyboardLayoutNeo shape (content-only, no special keys) --
// see types.ts.
export const presetsNeo = {
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
} satisfies Record<string, KeyboardLayoutNeo>

export type PresetNameNeo = keyof typeof presetsNeo

export type { KeyboardLayoutNeo, KeyRowNeo, KeyContent, KeyPositionNeo } from './types'
