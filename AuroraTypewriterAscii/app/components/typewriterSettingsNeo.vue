<template>
    <article>
        <!-- head row -->
        <div class="flex justify-between items-start mx-2 md:mx-4 mt-2 b">
            <div class="mb-2 flex justify-start gap-x-2">
                <UIcon
                name="i-lucide-keyboard"
                class="size-4 text-mist-700 dark:text-mist-100"
                />
                <p class="text-xs font-display text-black dark:text-mist-300">keyboard settings:</p>
            </div>


            <div class="flex gap-x-2 items-center justify-end">
               <button class="cursor-pointer group">
                    <UIcon
                    name="i-lucide-circle-help"
                    class="size-12 md:size-5 text-mist-300 dark:text-mist-500"
                    />
                </button>

                <button class="cursor-pointer  group " @click="toggleSettings('keyboard')">
                    <UIcon
                    name="i-lucide-circle-x"
                    class="size-12 md:size-5  text-mist-700 dark:text-white group-hover:text-orange-500 transition-colors duration-300"
                    />
                </button>
            </div>

        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2 md:mx-4 border-t pt-3 border-olivetti-shade-20 dark:border-olivetti-shade-40  ">
           
            <!-- left column -->
             <div class="grid grid-cols-2 md:grid-cols-2 gap-x-3 gap-y-2">
                 <UFormField label="Typewriter Model" class="w-full  col-span-2 text-xs" size="sm">
                    <USelect
                        v-model="selectedModelId"
                        :items="typewriterModelItems"
                        placeholder="Choose a typewriter model"
                        class="w-full"

                        @update:model-value="onModelChange"
                    />
                </UFormField>

                <UFormField label="Number of Keys" class="w-full " size="sm">
                    <USelect
                        v-model="keysNumber"
                        :items="keysNumberItems"
                        class="w-full"

                        @update:model-value="onDialChange"
                    />
                </UFormField>

                <UFormField label="Pitch (cpi)" class="w-full " size="sm">
                    <USelect
                        v-model="charPitch"
                        :items="pitchItems"
                        class="w-full"

                        @update:model-value="onDialChange"
                    />
                </UFormField>


             </div>


            <!-- right column -->
             <div class="grid grid-cols-1 md:grid-cols-4 gap-x-3 gap-y-2 items-end">
                <UFormField label="Keyboard Preset" class="w-full md:col-span-4" size="sm">
                    <USelect
                        v-model="selectedPreset"
                        :items="presetItems"
                        class="w-full"

                        @update:model-value="onPresetChange"
                    />
                </UFormField>

                  

            <UFormField label="Line Spacing" class="w-full md:col-span-2" size="sm">
                    <USelect
                        v-model="lineSpacing"
                        :items="lineSpacingItems"
                        size="sm"
                        class="w-full"
                    />
                </UFormField>

               

                <UButton
                    :trailing-icon="editMode ? 'lucide:square-check' : 'lucide:square-dashed-mouse-pointer'"
                    :size="editKeysButtonSize"
                    class="cursor-pointer w-full col-span-2 justify-between items-end  border border-white dark:border-olivetti-shade-40"
                    variant="ghost"
                    color="neutral"
                    @click="editMode = !editMode"
                > 
                    {{ editMode ? 'Done Editing' : 'Edit Keys' }}
                </UButton>
          

             </div>
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
        twModel: TypewriterModel | null
    }>()

    const emit = defineEmits<{
        'update:activeLayout': [value: KeyboardLayout]
        'update:selectedPreset': [value: SelectableLayout]
        'update:editMode': [value: boolean]
        'update:charPitch': [value: CharPitch]
        'update:lineSpacing': [value: LineSpacing]
        'update:keysNumber': [value: number]
        'update:twModel': [value: TypewriterModel]
    }>()

    const { toggleSettings } = useShowSettings()

    const isSmallScreen = useMediaQuery('(max-width: 767px)')
    const editKeysButtonSize = computed(() => isSmallScreen.value ? 'xl' : 'sm')

    const presetItems: SelectableLayout[] = [...Object.keys(presets) as PresetName[], 'custom']

    const typewriterModelItems = typewriterModelSelectItems()

    const selectedModelId = ref<string | undefined>(
        props.twModel ? typewriterModelId(props.twModel) : undefined,
    )

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

    const keysNumberItems = KEYS_NUMBER_ITEMS

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

    const onModelChange = (id: string | undefined) => {
        const found = findTypewriterModelById(id)
        if (!found) return
        if (!isCustomTypewriterModel(found)) {
            charPitch.value = found.pitch
            keysNumber.value = found.keys
        }
        emit('update:twModel', found)
    }

    // charPitch/keysNumber edited directly (not via the model picker above) no
    // longer match any known model, so fall back to the "custom" entry
    const onDialChange = () => {
        const customId = typewriterModelId(CUSTOM_TYPEWRITER_MODEL)
        if (selectedModelId.value === customId) return
        selectedModelId.value = customId
        emit('update:twModel', CUSTOM_TYPEWRITER_MODEL)
    }
</script>
