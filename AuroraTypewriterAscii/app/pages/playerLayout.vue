<template>
  <div class="min-h-screen">
    
    <SiteNav>
      <AppSettings />
    </SiteNav>

    <!--
    <header class="tw_slice pt-24 pb-6 lg:py-6 bg-mist-200 dark:bg-mist-900 ">
      <div class="bg-mist-100 col-start-2"><p>center</p></div>
    </header>
    -->

    <!-- spacer ? -->
    <div class="h-20 md:h-24 lg:h-6"></div>

    <!-- hoja -->
  
    <!-- image setting trigger -->
    <section class="tw_slice mt-4"  v-if="playMode === 'idle'">
        <div></div>
        <article class="tw_grid">
          <div class="col-start-3 col-span-7 bg-mist-200 shadow-x-xl p-2  ">

           <button class="h-full w-full text-xs text-mist-500 flex items-center justify-between cursor-pointer" @click="toggleSettings('image')">
               <div class="flex items-center space-x-2">
                 <UIcon
                    name="i-lucide-image"
                    class="size-4 text-mist-700 "
                  />
                  <span>select an image</span>
               </div>

                <span
                  v-if="!showSettings.image"
                  class="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
                  :class="typewriterBg">1</span>

                  <!-- gridicons:cross-circle -->
                <UIcon
                    v-else
                   name="lucide:circle-x"
                   class="size-5 text-mist-700 "
                 /> 
            </button> 
          </div>
        </article>
    </section>
   
    <!-- ascii setting trigger -->
    <section class="tw_slice " v-if="playMode === 'idle'">
        <div></div>
        <article class="tw_grid">
          <div class="col-start-3 col-span-7 bg-mist-100 p-2 shadow-x-xl">
            <button class="h-full w-full text-xs text-mist-500 flex items-center justify-between cursor-pointer" @click="toggleSettings('ascii')">
               <div class="flex items-center space-x-2">
                 <UIcon
                    name="i-lucide-a-large-small"
                    class="size-4 text-mist-700 "
                  />
                  <span>image to ascii settings</span>
               </div>

               <span
                  v-if="!showSettings.ascii"
                  class="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
                  :class="typewriterBg">2</span>

                  <!-- gridicons:cross-circle -->
                <UIcon
                    v-else
                   name="lucide:circle-x"
                   class="size-5 text-mist-700 "
                 /> 
            </button> 
          </div>
        </article>
    </section>
   

    <!-- image settings accordion-->
    <CustomUiAccordion :isOpen="showSettings.image">
      <section
        class="tw_slice"
      >
        <div class="border-b border-mist-200 dark:border-mist-600"></div>
        <article class="tw_grid">
        
          <div class="col-span-2 border-b border-mist-200 dark:border-mist-600"></div>
            <div class="col-span-7 shadow-x-xl pb-4 pl-2 pr-2 border-b border-dashed border-mist-300 bg-white">
              <HomeImageSelect
                  :raster-img-url="rasterImgUrl"
                  :ascii-source="asciiSource"
                  @update:ascii-img-file="onAsciiImgFileUpdate"
                  @update:raster-img-file="onRasterImgFileUpdate"
              />
            </div>
            <div class="col-span-2 border-b border-mist-200 dark:border-mist-600 ">
              
            </div>

        </article>

       <div class="border-b border-mist-200 dark:border-mist-600"></div>

    
      </section>
    </CustomUiAccordion>

     <!-- ascii settings accordion-->
    <CustomUiAccordion :isOpen="showSettings.ascii">
       <section
        class="tw_slice"
      >
        <div class="border-b border-mist-200 dark:border-mist-600"></div>
        <article class="tw_grid">
        
          <div class="col-span-2 border-b border-mist-200 dark:border-mist-600"></div>
            <div class="col-span-7 bg-white shadow-x-xl pl-4 pr-2 pt-0 pb-0 border-b border-dashed border-mist-300">
              <HomeAsciiSettings
                  v-model:shade-chars="shadeChars"
                  v-model:num-shade-chars="numShadeChars"
                  v-model:columns-width="columnsWidth"
                  v-model:img-brightness="imgBrightness"
                  v-model:img-contrast="imgContrast"
                  v-model:auto-levels="autoLevels"
                  :available-chars="availableChars"
              />
            </div>
            <div class="col-span-2 border-b border-mist-200 dark:border-mist-600 ">
              
            </div>

        </article>

       <div class="border-b border-mist-200 dark:border-mist-600"></div>

    
      </section>
    </CustomUiAccordion>

    <!-- ascii image holder -->
    <section class="tw_slice ">
      <div></div>
      <article class="tw_grid items-end">
      
        <div></div>
        <div class=" h-6 rounded-tl-full" :class="typewriterBg"></div>

        <div class="col-span-7 p-2 pb-0 bg-white shadow-x-xl h-full">

            <HomeAsciiImageHolder
                :ascii-image-string="asciiImageString"
                :columns-width="columnsWidth"
                :rows-height="rowsHeight"
                :play-mode="playMode"
                :play-count="playCount"
                :line-index="lineIndex"
                :row-index="rowIndex"
                :char-pitch="charPitch"
                :line-spacing="lineSpacing"
            />

        </div>

        <div class="h-6 rounded-tr-full" :class="typewriterBg"></div>
         <div></div>
        
      </article>

      <div></div>

    </section>

    <!-- typewriter upper block -->
    <section class="tw_slice ">
      <!-- first row -->
      <div></div>

      <!-- keep this for tablet and up-->
      <div class ="hidden md:block">
        <article class="tw_grid bg-mist-300 dark:bg-mist-700">
  
          <!-- carriage return lever holder -->
          <div class="bg-mist-50 dark:bg-mist-700 row-span-3">
            <div class="hidden md:block h-full w-full"><lever/></div>
          </div>
  
          <div class=" bg-black h-16 border-y-6 border-x-0 border-mist-50 dark:border-mist-700"></div>
          
          <!-- rulli holder -->
          <div class="bg-white col-span-7 h-full ">
            <div class="flex w-full h-full items-end mt-2">
               <div class="grid grid-cols-12 items-center mb-6 w-full">
                  <div class="h-2 bg-black" ></div>
                  <div class="h-4 rounded-full bg-black" ></div>
    
                  <div class="h-2 col-span-8 bg-black" ></div>
    
                  <div class="h-4 rounded-full bg-black" ></div>
                  <div class="h-2 bg-black" ></div>
                </div>
            </div>
          </div>
  
          <div class=" bg-black h-full border-y-6 border-mist-50 dark:border-mist-700"></div>
          <div class="bg-mist-50 dark:bg-mist-700 ">
            <div class="w-5 h-9/12 my-2 bg-mist-300 dark:bg-mist-600 ml-1 rounded-full">&nbsp;</div>
          </div>
  
          <!-- second row -->
          <div class="w-full aspect-2/1" :class="typewriterBg"></div>
          <div class="col-span-3 rounded-l rounded-full flex items-center" :class="typewriterBg">
             <p class="text-xs text-white/80 pt-1 hidden md:block">
                <span class="font-bold text-white">{{ lineIndex }}</span> of
                <span>{{ columnsWidth }}</span>
                   | row: <span class="font-bold text-white">{{ rowIndex }}</span>
              </p>
          </div>
          <div></div>
          <div class="col-span-3 rounded-r rounded-full flex items-center justify-end" :class="typewriterBg">
            <p class="text-sm text-white/70 pt-2 hidden md:block">08' 59"</p>
          </div>
          <div :class="typewriterBg"></div>
          <div class="bg-mist-50 dark:bg-mist-700"></div>

          <!-- third row -->
          <div class="aspect-square w-full" :class="typewriterBg"></div>
          <div :class="typewriterBg">
           <button
            class="w-full h-full flex items-center justify-start cursor-pointer group"
            @click="toggleSettings('player')"
          >
              <UIcon
                name="i-lucide-audio-lines"
                class="size-6 text-white/50 group-hover:text-white transition-colors duration-300"
              />
           </button>
          </div>

          <!-- big hole  -->
          <div class="col-span-5" :class="typewriterBg">
            <div class="bg-mist-300 dark:bg-mist-700 w-full h-full rounded-full">
              <div class="flex justify-center items-center h-full w-full">
                <RemoteEvo
                    v-model:play-mode="playMode"
                />
              </div>
            </div>
          </div>

          <!-- led -->
          <div class="w-full h-full flex items-center justify-end" :class="typewriterBg">
            <span
              class="w-2 h-2 block rounded-full inset-shadow-sm/50"
              :class="{
                'bg-green-500': playMode === 'play',
                'bg-orange-400': playMode === 'pause',
                'bg-mist-400': playMode === 'idle',
              }"
            ></span>
          </div>

          <div :class="typewriterBg"></div>
          <div class="bg-mist-50 dark:bg-mist-700"></div>
  
        </article>
      </div>

      <div class ="block md:hidden">
        <article class="tw_grid">
          <div class="text-center">a</div>
         <div class="col-start-2 col-span-9" :class="typewriterBg">
           <RemoteEvo
              v-model:play-mode="playMode"
            />
        </div>
        <div class="text-center">c</div>
        </article>
      </div>

      <div></div>

    </section>

    <!-- player settings holder -->
    <CustomUiAccordion :isOpen="showSettings.player">
    <section class="tw_slice bg-mist-50 dark:bg-mist-700">
        <div></div>
        <article class="tw_grid">
          <div></div>
          <div class="col-span-9 h-12 border-x-12 md:border-x-24 px-2" :class="[typewriterBg, typewriterBorder]">
            <div class="p-2 text-sm border border-dashed h-full">
              <p>player settings</p>
            </div>
          </div>
        </article>
        <div></div>
    </section>
    </CustomUiAccordion>

    <!-- guitar hero holder -->
    <CustomUiAccordion :isOpen="playMode !== 'idle'" >
      <section class="tw_slice bg-mist-50 dark:bg-mist-700">
          <div></div>
          <article class="tw_grid">
            <div></div>
            <div class="col-span-9 h-48 border-x-12 md:border-x-24 px-2 pt-3" :class="[typewriterBg, typewriterBorder]">
              <GuitarHeroEvo
                  v-model:line-index="lineIndex"
                  v-model:row-index="rowIndex"
                  :play-mode="playMode"
                  :play-count="playCount"
                  :shade-chars="shadeChars"
                  :columns-width="columnsWidth"
                  :rows-height="rowsHeight"
                  :ascii-image-string="asciiImageString"
                  :key-positions="keyPositions"
                  @sound="onSound"
              />
            </div>
          </article>
          <div></div>
      </section>
    </CustomUiAccordion>
    
    <!-- typewriter keyboard  holder -->
    <section class="tw_slice bg-mist-50 dark:bg-mist-700">
      <div></div>
      <article class="tw_grid">
        <div></div>
        <div class="col-span-9 border-12 md:border-24 border-t-0 rounded-b-4xl " :class="typewriterBorder">
          <!-- keyboard background-->
            <div class="w-full h-full" :class="typewriterBg">
              <div class="w-full h-full bg-mist-50 dark:bg-mist-700 rounded-t-xl rounded-b-2xl p-2">

                <KeyboardEvo
                    :layout="activeLayout"
                    :edit-mode="editMode"
                    :play-mode="playMode"
                    :density-chars="shadeChars"
                    :active-sound="activeSound"
                    @update:layout="onLayoutEdit"
                    @get-k-data="onGetKData"
                />
              </div>
            </div>
        </div>
      </article>
      <div></div>
    </section>

    <!-- keyboard settings holder -->
    <CustomUiAccordion :isOpen="showSettings.keyboard">
     <section class="tw_slice border-t border-dashed border-mist-300 dark:border-mist-600">
        <div></div>
        <article class="tw_grid ">
         <div class="col-start-2 col-span-9 bg-mist-100 dark:bg-mist-600 mx-6 p-2 ">

          <HomeTypewriterSettings
              v-model:active-layout="activeLayout"
              v-model:selected-preset="selectedPreset"
              v-model:edit-mode="editMode"
              v-model:char-pitch="charPitch"
              v-model:line-spacing="lineSpacing"
              v-model:keys-number="keysNumber"
          />

        </div>

         <div></div>
        </article>
        
     </section>
    </CustomUiAccordion>

    <!-- keyboard settings trigger -->
    <section class="tw_slice"  v-if="playMode === 'idle'">
      <div></div>
        <article class="tw_grid ">
          <div class="col-start-2 col-span-4 bg-mist-100 dark:bg-mist-600 h-6 rounded-bl-full ml-6"></div>
          <div class="w-full aspect-square rounded-b-full bg-mist-100 dark:bg-mist-600">
            <button class="w-full h-full flex items-center justify-center cursor-pointer group" @click="toggleSettings('keyboard')">
              <UIcon
                :name="!showSettings.keyboard ? 'i-lucide-keyboard' : 'lucide:circle-x'"
                class="size-7 text-mist-400 dark:text-mist-400 group-hover:text-mist-600 group-hover:dark:text-mist-300 transition-colors duration-300"/>
            </button>
          </div>
          <div class="col-span-4 bg-mist-100 dark:bg-mist-600 h-6 rounded-br-full mr-6"></div>
        </article>
     </section>

    <!-- model info -->
    <section class="tw_slice bg-mist-50 dark:bg-mist-700 mt-12 mb-24">
      <div></div>
      <div class="text-center text-mist-400 dark:text-mist-500">{{ tw_model?.manufacturer ?? 'none' }} : <span class="font-bold">{{ tw_model?.model ?? 'custom model' }}</span> </div>
    </section>

  </div>
</template>

<script lang="ts" setup>
import type { SelectItem } from '@nuxt/ui'
import { presets, type KeyboardLayout } from '~/utils/keyboardLayouts'
import { getLayoutDensityChars } from '~/utils/keyboardLayouts/layoutChars'
import type { KeyPosition } from '~/utils/keyboardLayouts/types'
import { extractShadeChars } from '~/utils/asciiShadeChars'
import { loadImageData, loadImageElementFromUrl } from '~/utils/imageSampling'

// --- UI variables ---
// typewriterColor/selectedPreset/charPitch/keysNumber/tw_model are shared
// site-wide state (see useActiveTypewriterSettings) rather than page-local
// refs, so any other page/component reading them stays in sync
const { typewriterColor, selectedPreset, charPitch, keysNumber, tw_model } = useActiveTypewriterSettings()
const typewriterBg = computed(() => TYPEWRITER_COLORS[typewriterColor.value].bg)
const typewriterBorder = computed(() => TYPEWRITER_COLORS[typewriterColor.value].border)

const { showSettings, toggleSettings } = useShowSettings()

// --- App variables ---
// dark -> light by Lekton charDensity; every char here is on all 18 keyboardLayouts
const shadeChars = ref('WMmhi=:-. ')
const numShadeChars = ref(shadeChars.value.length)

const imgBrightness = ref(100) // 0 to 200
const imgContrast = ref(100) // 0 to 200
const autoLevels = ref(false) // auto contrast levels

type PlayMode = 'idle' | 'play' | 'pause'
const playMode = ref<PlayMode>('idle')

const DEFAULT_LINE_SPACING: LineSpacing = 'single'

// playback position within the ascii image
const lineIndex = ref(0) // current playback column (char) index within the row
const rowIndex = ref(0) // current playback row index

const playCount = computed(() => lineIndex.value + (rowIndex.value * columnsWidth.value))
// computed from lineIndex and rowIndex, used to determine when to stop playback

watch(playMode, (mode) => {
    if (mode === 'idle') {
        lineIndex.value = 0
        rowIndex.value = 0
    }
    // stopped/paused playback shouldn't leave a key stuck highlighted
    if (mode !== 'play') activeSound.value = null
})

// last beat GuitarHeroEvo reported as actually sounding (note, shift
// companion, or carriageReturn), relayed down to KeyboardEvo so it can
// flash the physical key(s) involved (see guitarHeroEvo's `sound` emit)
const activeSound = ref<SoundEvent | null>(null)
const onSound = (event: SoundEvent) => {
    activeSound.value = event
}

// rows and columns of the ascii image, in characters
const rowsHeight = ref(0) // ascii image height, in rows
const columnsWidth = ref(48)

// ascii_image
const asciiImageString = ref<string>('')

// tracks how asciiImageString was produced: 'image' generation (imgToAscii-style
// pipeline, driven by rasterImgFile + the settings below) vs 'text' (a premade
// .txt loaded verbatim from the library) — the two sources write to the same
// asciiImageString ref, so this flag decides which watcher's write should stick.
type AsciiSource = 'image' | 'text'
const asciiSource = ref<AsciiSource>('image')

const asciiImgFile = ref<string>('')
const { text, lines, rowsInImage, charsPerLine } = useAsciiTextFile(() => asciiImgFile.value)

// library pick: load the premade .txt verbatim and derive settings from it
watch(text, (newText) => {
    if (!newText || asciiSource.value !== 'text') return
    asciiImageString.value = newText
    columnsWidth.value = Math.max(...charsPerLine.value)
    shadeChars.value = extractShadeChars(lines.value)
    numShadeChars.value = shadeChars.value.length
    rowsHeight.value = rowsInImage.value
})

// raster_image
const rasterImgFile = ref<string | File>('catFace.jpg')
// holds the object URL for an uploaded File (revoked/replaced whenever rasterImgFile changes)
const uploadedRasterUrl = ref<string | null>(null)

watch(rasterImgFile, (file) => {
    if (uploadedRasterUrl.value) {
        URL.revokeObjectURL(uploadedRasterUrl.value)
        uploadedRasterUrl.value = null
    }
    if (file instanceof File) {
        uploadedRasterUrl.value = URL.createObjectURL(file)
    }
}, { immediate: true })

const rasterImgUrl = computed(() =>
    rasterImgFile.value instanceof File
        ? (uploadedRasterUrl.value ?? undefined)
        : `/img/gallery/raster_img/${rasterImgFile.value}`
)
// in /img/gallery/raster_img/, the source image catFace.txt was generated from

// decoded pixel data for rasterImgFile, kept in sync for the imgToAscii pipeline below
const sourceImage = ref<SourceImageData | null>(null)

watch(rasterImgUrl, async (url) => {
    if (!url) {
        sourceImage.value = null
        return
    }
    try {
        const img = await loadImageElementFromUrl(url)
        sourceImage.value = await loadImageData(img)
    } catch (err) {
        console.error('Failed to load raster image for ASCII conversion', err)
        sourceImage.value = null
    }
}, { immediate: true })

// -- emit handlers for child components ---

// from HomeImageSelect: library pick (premade .txt)
const onAsciiImgFileUpdate = (file: string) => {
    asciiSource.value = 'text'
    asciiImgFile.value = file
}

// from HomeImageSelect: camera/upload pick (generate via the imgToAscii pipeline)
const onRasterImgFileUpdate = (file: string | File) => {
    asciiSource.value = 'image'
    rasterImgFile.value = file
}

// --- Keyboard variables ---
// selectedPreset is global (see above) — seed activeLayout from it instead of
// hardcoding a preset, so this page doesn't start out desynced from whatever
// preset another page/component already chose
const activeLayout = ref<KeyboardLayout>(
    structuredClone(presets[selectedPreset.value !== 'custom' ? selectedPreset.value : 'qwertyES'])
)
const availableChars = computed(() => getLayoutDensityChars(activeLayout.value))
const editMode = ref(false)
const keyPositions = ref<KeyPosition[]>([])
const lineSpacing = ref<LineSpacing>(DEFAULT_LINE_SPACING)

// same conversion pipeline as app/pages/imgToAscii.vue, driven by the settings
// above (imgBrightness/imgContrast are exposed here as 0..200, matching
// HomeAsciiSettings' slider convention, hence the -100 offset into the -100..100
// range convertSourceImageToTypewriterAscii expects)
const asciiOptions = computed<ImageToAsciiOptions>(() => ({
    charsPerLine: columnsWidth.value,
    pitch: charPitch.value,
    lineSpacing: lineSpacing.value,
    availableChars: availableChars.value,
    maxShades: numShadeChars.value,
    shadeRampOverride: shadeChars.value,
    brightness: imgBrightness.value - 100,
    contrast: imgContrast.value - 100,
    autoLevels: autoLevels.value,
}))

const { text: generatedAsciiText, rows: generatedRows } = useImageAsciiConverter(sourceImage, asciiOptions)

// also re-syncs on asciiSource flipping back to 'image' (e.g. re-selecting the
// default cat image after a library pick) even when generatedAsciiText itself
// didn't change value, since a plain watch(generatedAsciiText) wouldn't fire then
watch([generatedAsciiText, asciiSource], ([newText, source]) => {
    if (source !== 'image') return
    asciiImageString.value = newText
    rowsHeight.value = generatedRows.value
})

const onLayoutEdit = (layout: KeyboardLayout) => {
    activeLayout.value = layout
    selectedPreset.value = 'custom'
}

const onGetKData = (data: KeyPosition[]) => {
    keyPositions.value = data
}

const incrementRowIndex = () => {
    rowIndex.value = Math.min(rowIndex.value + 1, rowsHeight.value)
}

const decrementRowIndex = () => {
    rowIndex.value = Math.max(rowIndex.value - 1, 0)
}
</script>

<style scoped>
   
</style>