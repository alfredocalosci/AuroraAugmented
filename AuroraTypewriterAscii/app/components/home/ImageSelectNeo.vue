<template>
  <div>

    <div class="flex items-center justify-between gap-x-2 w-full  mb-1 border-b border-olivetti-shade-10 pb-2">
      
      <div class="flex items-center gap-x-2"> 
        <UIcon
          name="i-lucide-image"
          class="size-4 text-black"
        />
  
        <p class="text-sm text-black font-display">select an image</p>
      </div>

      <div class="flex items-center justify-end gap-x-4">
        <p class="text-black/50 my-2 font-display text-sm">{{ helpMessage }}</p>
        <button
          class="cursor-pointer group"
          @click="toggleSettings('image')"
        >
           <UIcon
              name="i-lucide-circle-x"
              class="size-5 text-black group-hover:text-orange-500 transition-colors duration-300"
            />
        </button>
      </div>

    </div>

    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-0 items-start  mt-3">
      
      <div class="md:col-span-3 order-2 md:order-1">
          <nav class="flex gap-x-3">
            <button
              v-for="option in imageOptions"
              :key="option.name"
              type="button"
              class="cursor-pointer group"
              @click="selectOption(option)"
            >
              <UIcon
                :name="option.icon"
                class="size-6 md:size-9 group-hover:text-orange-500 transition-colors duration-300"
                :class="selected === option.name ? 'text-black' : 'text-olivetti-shade-20'"
              />
            </button>
          </nav>
      </div>

      <div class="order-1 md:order-2 md:row-span-3">
        <div class="w-full aspect-square  border border-mist-200 p-0.5">
          <img
            v-if="rasterImgUrl && asciiSource === 'image'"
            :src="rasterImgUrl"
            alt="selected image thumbnail"
            class="h-full w-full object-cover"
          />
          <!-- placeholder for default ascii mode (no image selected/converted) -->
          <div
            v-else
            class="h-full w-full bg-mist-50 flex items-center justify-center text-black"
          >
            <UIcon name="custom:gatoascii" class="size-16" />
          </div>
        </div>
      </div>

     <!-- lower alt -->
    <div
      v-if="selected != 'default'"
      class="order-3 md:col-span-3 py-2 w-full"
    >
     
      <HomeImageSelectNeoLibrary
        v-if="selected === 'library'"
        @select="onLibrarySelect"
      />

      <HomeImageSelectNeoCamera v-else-if="selected === 'camera'" />

      <HomeImageSelectNeoUpload
        v-else-if="selected === 'upload'"
        @select="onUploadSelect"
      />
    </div>

    </div>

    <!-- lower block 
    <div
      v-if="selected != 'default'"
      class="py-2"
    >
     
      <HomeImageSelectNeoLibrary
        v-if="selected === 'library'"
            @select="onLibrarySelect"
      />

      <HomeImageSelectNeoCamera v-else-if="selected === 'camera'" />

      <HomeImageSelectNeoUpload
          v-else-if="selected === 'upload'"
          @select="onUploadSelect"
        />
    </div>
    -->

  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    rasterImgUrl?: string
    asciiSource?: 'image' | 'text'
  }>()

  const { toggleSettings } = useShowSettings()

  // image options — unlike home/ImageSelect.vue, every option here only ever
  // feeds a raster image into the halftone/conversion pipeline: there is no
  // premade-ascii-text bypass. 'default' replaces that component's 'cat'
  // slot — it doesn't select a raster image at all, it just signals reverting
  // to the page's own hardcoded default ascii art (see select-default emit).
  const imageOptions = [
    { name: 'default', icon: 'lucide-ligature' , msg:'default ascii mode'},
    { name: 'library', icon: 'i-lucide-library' , msg:'select from library'},
    { name: 'camera', icon: 'i-lucide-camera', msg:'take a photo' },
    { name: 'upload', icon: 'i-lucide-cloud-upload', msg:'upload from device' },

  ] as const

  type ImageOptionName = typeof imageOptions[number]['name']

  const selected = ref<ImageOptionName>('default')

  const helpMessage = computed(
    () => imageOptions.find((option) => option.name === selected.value)?.msg ?? ''
  )

  const emit = defineEmits<{
    'select-default': []
    'update:rasterImgFile': [file: string | File]
  }>()

  function selectOption(option: (typeof imageOptions)[number]) {
    selected.value = option.name

    if (option.name === 'default') {
      emit('select-default')
    }
  }

  function onLibrarySelect(rasterFile: string) {
    emit('update:rasterImgFile', rasterFile)
  }

  function onUploadSelect(file: File) {
    emit('update:rasterImgFile', file)
  }
</script>

<style>

</style>
