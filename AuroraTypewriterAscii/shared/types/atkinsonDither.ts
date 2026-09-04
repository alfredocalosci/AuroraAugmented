import type { ShadeRampEntry } from './shadeRamp'

export interface DitherStrategy {
  quantize(luminanceGrid: number[][], shadeRamp: ShadeRampEntry[]): string[][]
}
