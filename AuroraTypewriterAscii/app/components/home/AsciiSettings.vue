<template>
  <div>
    <!-- head row 
    <div class="flex justify-between items-start">
      <div class="mb-2 flex justify-start gap-x-2">
        <UIcon
        name="i-lucide-settings"
        class="size-4 text-mist-700 "
        />
        <p class="text-xs text-black">Image to ASCII settings:</p>
      </div>
    
     
       <div class="flex gap-x-2 items-center justify-end">

         <button class="cursor-pointer group">
          <UIcon
            name="gridicons:undo"
            class="size-5 text-mist-300 "
          />
        </button>

        <button class="cursor-pointer group">
          <UIcon
            name="i-lucide-circle-help"
            class="size-5 text-mist-300 "
          />
        </button>

        <button class="cursor-pointer group" @click="isOpen = !isOpen">
          <UIcon
            :name="isOpen ? 'i-lucide-square-chevron-up' : 'i-lucide-square-chevron-down'"
            class="size-5 text-mist-700 hover:text-orange-500 transition-colors duration-300"
          />
        </button>

         <button class="cursor-pointer group ">
          <UIcon
            name="gridicons:cross-circle"
            class="size-5 text-mist-700 "
          />
        </button>
      </div>
      
    </div>
    -->

  
     <!-- options  -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-x-9 gap-y-6 items-start mt-3">
      
      <div>
         <p class="text-sm text-mist-500 w-full mb-1">columns:</p>
         <CustomUiStepper
            v-model:value="columnsWidth"
            class="mb-2"
          />
           <!-- mini hor bar -->
           <div class="h-px w-full bg-mist-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-orange-500 transition-all duration-300"
              :style="{ width: (columnsWidth / 80 * 100) + '%' }"
            ></div>
          </div>
          <p class="text-xs text-mist-400 mt-1">7 → 80</p>
      </div>

      <div>
         <p class="text-sm text-mist-500 w-full mb-1">shades:</p>
          <CustomUiStepper
            v-model:value="numShadeChars"
            :min="2"
            :max="16"
            class="mb-2"
          />
          <!-- mini hor bar -->
           <div class="h-px w-full bg-mist-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-orange-500 transition-all duration-300"
              :style="{ width: (numShadeChars / 16 * 100) + '%' }"
            ></div>
          </div>
          <p class="text-xs text-mist-400 mt-1">2 → 16</p>
      </div>

      <div class="md:col-span-2 md:row-span-3">
        <p class="text-sm text-mist-500 w-full mb-1">midtones chars:</p>

        <HomeMidtonesCharsEditor
          v-model:shadeChars="shadeChars"
          v-model:numShadeChars="numShadeChars"
          :availableChars="props.availableChars"
        />
    
      </div>

     <div class="md:col-span-2 col-start-1 flex flex-col gap-y-4">

        <UFormField label="brightness" :hint="String(imgBrightness - 100)" :ui="{ hint: 'text-black font-bold' }">
           <USlider v-model="imgBrightness" :min="0" :max="200" size="xs" :ui="{ thumb: 'ring-4' }" color="neutral" id="imgBrightness"/>
        </UFormField>

        <UFormField label="contrast" :hint="String(imgContrast - 100)" :ui="{ hint: 'text-black font-bold' }">
           <USlider v-model="imgContrast" :min="0" :max="200" size="xs" :ui="{ thumb: 'ring-4' }" color="neutral" id="imgContrast"/>
        </UFormField>

        <button
          id="autoLevels"
          class="text-sm text-gray-700 flex items-center justify-between group cursor-pointer border-mist-300 border p-2 hover:border-orange-500 transition-colors duration-300"
          @click="autoLevels = !autoLevels"
        >
          <span >auto contrast</span>
          <UIcon
            name="i-ic:round-contrast"
            class="size-5 "
            :class="autoLevels ? 'text-black' : 'text-mist-300 '"
          />

        </button>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
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