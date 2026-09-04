import type { PresetName } from '~/utils/keyboardLayouts'
import type { TypewriterModel } from '#shared/types/typewriterModels'

export type SelectableLayout = PresetName | 'custom'

const DEFAULT_PRESET: SelectableLayout = 'qwertyES'
const DEFAULT_PITCH: CharPitch = 'pica'
const DEFAULT_KEYS_NUMBER = 43

// site-wide "active typewriter" settings — shared via useState so any page/component
// reading them stays in sync, instead of each owner (index.vue, TypewriterSettings.vue)
// keeping its own local copy
export function useActiveTypewriterSettings() {
    return {
        typewriterColor: useState<TypewriterColorName>('typewriter-color', () => DEFAULT_TYPEWRITER_COLOR),
        selectedPreset: useState<SelectableLayout>('typewriter-selected-preset', () => DEFAULT_PRESET),
        charPitch: useState<CharPitch>('typewriter-char-pitch', () => DEFAULT_PITCH),
        keysNumber: useState<number>('typewriter-keys-number', () => DEFAULT_KEYS_NUMBER),
        tw_model: useState<TypewriterModel | null>('typewriter-tw-model', () => null),
    }
}
