<template>
    <article>
        <!-- head row -->
        <div class="flex justify-between items-start mx-2 md:mx-4 mt-2 b">
            <div class="mb-2 flex justify-start gap-x-2">
                <UIcon
                name="i-lucide-a-large-small"
                class="size-4 text-mist-700 dark:text-mist-100"
                />
                <p class="text-xs text-black dark:text-mist-300">keyboard settings:</p>
            </div>


            <div class="flex gap-x-2 items-center justify-end">
               <button class="cursor-pointer group">
                    <UIcon
                    name="i-lucide-circle-help"
                    class="size-5 text-mist-300 dark:text-mist-500"
                    />
                </button>

                <button class="cursor-pointer group ">
                    <UIcon
                    name="i-lucide-circle-x"
                    class="size-5 text-mist-700 dark:text-white group-hover:text-orange-500 transition-colors duration-300"
                    />
                </button>
            </div>

        </div>

        <!-- select and edit -->
        <div class="flex flex-col md:flex-row justify-between items-stretch md:items-end gap-y-2 md:gap-y-0 gap-x-6 mb-2 mx-2 md:mx-4 border-t pt-2 border-mist-300 dark:border-mist-500">

            <div class="flex flex-col md:flex-row flex-1 gap-y-2 md:gap-y-0 gap-x-2 items-center justify-between">
                <UFormField label="Keyboard Preset" class="w-full md:w-1/4" size="sm">
                    <USelect
                        v-model="selectedPreset"
                        :items="presetItems"
                        class="w-full"
    
                        @update:model-value="onPresetChange"
                    />
                </UFormField>

                <UFormField label="Number of Keys" class="w-full md:w-1/4" size="sm">
                    <USelect
                        v-model="keysNumber"
                        :items="keysNumberItems"
                        class="w-full"
                    />
                </UFormField>
    
                <UFormField label="Pitch (cpi)" class="w-full md:w-1/4" size="sm">
                    <USelect
                        v-model="charPitch"
                        :items="pitchItems"
                        class="w-full"
                    />
                </UFormField>
    
                <UFormField label="Line Spacing" class="w-full md:w-1/4" size="sm">
                    <USelect
                        v-model="lineSpacing"
                        :items="lineSpacingItems"
                        class="w-full"
                    />
                </UFormField>
            </div>

            <button
                class="cursor-pointer flex justify-end items-center gap-x-2 text-xs group mb-1"
                @click="editMode = !editMode"
                >
                {{ editMode ? 'done editing' : 'edit keys' }}
                <UIcon
                name="i-lucide-keyboard"
                class="size-5 text-mist-700 group-hover:text-orange-500 transition-colors duration-300"
                />
            </button>

        </div>

        
    </article>
</template>

<script lang="ts" setup>
    import { presets, type KeyboardLayout, type PresetName } from '~/utils/keyboardLayouts'

    const props = defineProps<{
        activeLayout: KeyboardLayout
        selectedPreset: SelectableLayout
        editMode: boolean
        charPitch: CharPitch
        lineSpacing: LineSpacing
        keysNumber: number
    }>()

    const emit = defineEmits<{
        'update:activeLayout': [value: KeyboardLayout]
        'update:selectedPreset': [value: SelectableLayout]
        'update:editMode': [value: boolean]
        'update:charPitch': [value: CharPitch]
        'update:lineSpacing': [value: LineSpacing]
        'update:keysNumber': [value: number]
    }>()

    const presetItems: SelectableLayout[] = [...Object.keys(presets) as PresetName[], 'custom']

    const pitchItems = [
        { label: 'Pica 10 ', value: 'pica' },
        { label: 'Pica Lite 11', value: 'pica-lite' },
        { label: 'Elite 12', value: 'elite' },
    ]

    const lineSpacingItems = [
        { label: 'single - 1', value: 'single' },
        { label: 'medium - 1.5', value: '1.5' },
        { label: 'double - 2', value: 'double' },
    ]

    const keysNumberItems = [
        { label: '42', value: 42, rows:[10,11,11,10] },
        { label: '43', value: 43, rows:[10,11,11,11] },
        { label: '44', value: 44, rows:[11,11,11,11] },
        { label: '45', value: 45, rows:[12,11,11,11] },
        { label: '46', value: 46, rows:[12,11,12,11] },
    ]

    const keysNumber = computed({
        get: () => props.keysNumber,
        set: (value) => emit('update:keysNumber', value),
    })

    const selectedPreset = computed({
        get: () => props.selectedPreset,
        set: (value) => emit('update:selectedPreset', value),
    })

    const editMode = computed({
        get: () => props.editMode,
        set: (value) => emit('update:editMode', value),
    })

    const charPitch = computed({
        get: () => props.charPitch,
        set: (value) => emit('update:charPitch', value),
    })

    const lineSpacing = computed({
        get: () => props.lineSpacing,
        set: (value) => emit('update:lineSpacing', value),
    })

    const onPresetChange = (name: SelectableLayout) => {
        if (name === 'custom') return
        emit('update:activeLayout', structuredClone(presets[name as PresetName]))
    }
</script>
