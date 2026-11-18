<template>
  <div>
     <!-- options  -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-x-9 gap-y-6 items-start mt-3 ">

      <div class="">
         <p class="text-xs  text-black w-full mb-1">columns:</p>
         <CustomUiStepperNeo
            v-model:value="columnsWidth"
            class="mb-2 "
          />
           <!-- mini hor bar -->
           <div class="h-px w-full bg-olivetti-shade-20 rounded-full overflow-hidden">
            <div
              class="h-full bg-orange-500 transition-all duration-300"
              :style="{ width: (columnsWidth / 80 * 100) + '%' }"
            ></div>
          </div>
          <p class="text-xs text-olivetti-shade-30 mt-2">7 → 80</p>
      </div>

      <div>
         <p class="text-xs text-black w-full mb-1">shades:</p>
          <CustomUiStepperNeo
            v-model:value="numShadeChars"
            :min="2"
            :max="16"
            class="mb-2"
          />
          <!-- mini hor bar -->
           <div class="h-px w-full bg-olivetti-shade-20 rounded-full overflow-hidden">
            <div
              class="h-full bg-orange-500 transition-all duration-300"
              :style="{ width: (numShadeChars / 16 * 100) + '%' }"
            ></div>
          </div>
          <p class="text-xs text-olivetti-shade-30 mt-2">2 → 16</p>
      </div>

      <div class="md:col-span-2 md:row-span-3">
        <p class="text-xs text-black w-full mb-2">midtones chars:</p>

        <HomeMidtonesCharsEditorNeo
          v-model:shadeChars="shadeChars"
          v-model:numShadeChars="numShadeChars"
          :availableChars="props.availableChars"
        />

      </div>

     <div class="md:col-span-2 col-start-1 flex flex-col gap-y-4">

        <UFormField label="brightness" :hint="String(imgBrightness - 100)" :ui="{ hint: 'text-black  font-normal', label: 'text-black text-xs' }" class="">

           <USlider v-model="imgBrightness" :min="0" :max="200" size="xs" :ui="{ thumb: 'ring-4' }" color="neutral" id="imgBrightness"/>
        </UFormField>

        <UFormField label="contrast" :hint="String(imgContrast - 100)" :ui="{ hint: 'text-black font-normal', label: 'text-black text-xs' }">
           <USlider v-model="imgContrast" :min="0" :max="200" size="xs" :ui="{ thumb: 'ring-4' }" color="neutral" id="imgContrast"/>
        </UFormField>

        <button
          id="autoLevels"
          class="text-sm text-black flex items-center justify-between group cursor-pointer border-black/40 border p-2 hover:border-orange-500 transition-colors duration-300 rounded mt-2"
          @click="autoLevels = !autoLevels"
        >
          <span >auto contrast</span>
          <UIcon
            name="i-ic:round-contrast"
            class="size-5 "
            :class="autoLevels ? 'text-black' : 'text-black/20 '"
          />

        </button>
      </div>

    </div>

    <div class="flex items-center justify-between gap-x-2 w-full  mt-1 border-t border-olivetti-shade-10 pt-2">
      
      <div class="flex items-center gap-x-2"> 
        <UIcon
          name="i-lucide-a-large-small"
          class="size-4 text-black"
        />
  
        <p class="text-sm text-black font-display">ascii settings</p>
      </div>

      <div class="flex items-center justify-end gap-x-4">
       
        <button
          class="cursor-pointer group"
          @click="toggleSettings('ascii')"
        >
           <UIcon
              name="i-lucide-circle-x"
              class="size-5 text-black group-hover:text-orange-500 transition-colors duration-300"
            />
        </button>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
  const { toggleSettings } = useShowSettings()

  const DEFAULT_SHADE_CHARS = '@%#*+=-:. '
  const DEFAULT_COLUMNS_WIDTH = 48
  const DEFAULT_IMG_BRIGHTNESS = 100
  const DEFAULT_IMG_CONTRAST = 100

  const props = defineProps<{
    shadeChars?: string
    numShadeChars?: number
    columnsWidth?: number
    imgBrightness?: number
    imgContrast?: number
    autoLevels?: boolean
    availableChars?: string
  }>()

  const emit = defineEmits<{
    'update:shadeChars': [value: string]
    'update:numShadeChars': [value: number]
    'update:columnsWidth': [value: number]
    'update:imgBrightness': [value: number]
    'update:imgContrast': [value: number]
    'update:autoLevels': [value: boolean]
  }>()

  const shadeChars = computed({
    get: () => props.shadeChars ?? DEFAULT_SHADE_CHARS,
    set: (value) => emit('update:shadeChars', value),
  })

  const numShadeChars = computed({
    get: () => props.numShadeChars ?? shadeChars.value.length,
    set: (value) => emit('update:numShadeChars', value),
  })

  const columnsWidth = computed({
    get: () => props.columnsWidth ?? DEFAULT_COLUMNS_WIDTH,
    set: (value) => emit('update:columnsWidth', value),
  })

  const imgBrightness = computed({
    get: () => props.imgBrightness ?? DEFAULT_IMG_BRIGHTNESS,
    set: (value) => emit('update:imgBrightness', value),
  })

  const imgContrast = computed({
    get: () => props.imgContrast ?? DEFAULT_IMG_CONTRAST,
    set: (value) => emit('update:imgContrast', value),
  })

  const autoLevels = computed({
    get: () => props.autoLevels ?? false,
    set: (value) => emit('update:autoLevels', value),
  })

  // const isOpen = ref(false);

</script>

<style>

</style>
