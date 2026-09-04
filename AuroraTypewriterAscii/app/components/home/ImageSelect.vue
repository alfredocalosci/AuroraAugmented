<template>
  <div>
    <!-- head row 
    <div class="flex justify-between items-start">
      <div class="mb-2 flex justify-start gap-x-2">

        <UIcon
        name="i-lucide-image"
        class="size-4 text-mist-700 "
        />
        <p class="text-xs text-black">select an image:</p>
      </div>

      <div class="flex gap-x-2 items-center justify-end">
        <button class="cursor-pointer group">
          <UIcon
            name="i-lucide-circle-help"
            class="size-5 text-mist-300 "
          />
        </button>

         <button class="cursor-pointer group">
          <UIcon
            name="i-lucide-circle-x"
            class="size-5 text-mist-700 "
          />
        </button>
      </div>

    </div>
    -->

    <div class="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-0 items-start  mt-3">
      <div class="md:col-span-3 order-2 md:order-1">
          <nav class="flex gap-x-2">
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
                :class="selected === option.name ? 'text-mist-900' : 'text-mist-300'"
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
          <!-- placeholder for when no image is selected -->
          <div
            v-else
            class="h-full w-full bg-mist-50 flex items-center justify-center text-mist-300"
          >
            <UIcon name="i-lucide-ligature" class="size-12" />
          </div>
        </div>
      </div>
      <div class="md:col-span-3 order-3">
         <p class="text-mist-800 mb-2 font-hand">{{ helpMessage }}</p>
      </div>
    </div>

    <!-- lower block -->
    <div
      v-if="selected != 'cat'"
      class="py-2"
    >
      <!-- working area -->
      <HomeImageSelectLibrary
        v-if="selected === 'library'"
            @select="onLibrarySelect"
      />

      <HomeImageSelectCamera v-else-if="selected === 'camera'" />

      <HomeImageSelectUpload
          v-else-if="selected === 'upload'"
          @select="onUploadSelect"
        />

        <HomeImageSelectPattern v-else-if="selected === 'pattern'" />
    </div>

  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    rasterImgUrl?: string
    asciiSource?: 'image' | 'text'
  }>()

  // image options
  const imageOptions = [
    { name: 'cat', icon: 'i-lucide-cat' , msg:'use default image'},
    { name: 'library', icon: 'i-lucide-library' , msg:'select from library'},
    { name: 'camera', icon: 'i-lucide-camera', msg:'take a photo' },
    { name: 'upload', icon: 'i-lucide-cloud-upload', msg:'upload from device' },
    { name: 'pattern', icon: 'i-lucide-grip', msg:'create a pattern' },
  ] as const

  type ImageOptionName = typeof imageOptions[number]['name']

  const selected = ref<ImageOptionName>('cat')

  const helpMessage = computed(
    () => imageOptions.find((option) => option.name === selected.value)?.msg ?? ''
  )

  const emit = defineEmits<{
    'update:asciiImgFile': [file: string]
    'update:rasterImgFile': [file: string | File]
  }>()

  function selectOption(option: (typeof imageOptions)[number]) {
    selected.value = option.name

    if (option.name === 'cat') {
      emit('update:rasterImgFile', 'catFace.jpg')
    }
  }

  function onLibrarySelect(asciiFile: string) {
    emit('update:asciiImgFile', asciiFile)
  }

  function onUploadSelect(file: File) {
    emit('update:rasterImgFile', file)
  }
</script>

<style>

</style>
