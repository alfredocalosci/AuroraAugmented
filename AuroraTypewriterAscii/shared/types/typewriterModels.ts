import type { CharPitch } from './typewriterGeometry'

export interface TypewriterModel {
  manufacturer: string
  model: string
  keys: number
  pitch: CharPitch
}
