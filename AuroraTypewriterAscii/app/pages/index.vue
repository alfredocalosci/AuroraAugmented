<template>
    <div class="mb-12">
        <header class="tw_container my-6 py-2">
            
            <section class="grid grid-cols-[2fr_7fr_2fr]">
                <div class="col-start-2 border-b border-dashed border-mist-300 dark:border-mist-500  ">
                    <h1 class="text-xl font-mono font-bold pb-2 dark:text-white">
                        Type <span class="font-normal">by</span> tune<span class="font-bold text-orange-500 pl-0.5">.</span>
                    </h1>
                </div>
                
                <div class="flex justify-end"><UColorModeSwitch /></div>
                
                <div class="col-start-2 mt-2">
                    <h3 class="font-hand mb-4 dark:text-mist-400">your typewriter image generation assistent ...</h3>
                    
                </div>
            </section>
            
            <section class="grid grid-cols-[2fr_7fr_2fr] mb-12 mt-6">
                
                <div class="col-start-2 mb-3">
                    <button class="flex gap-x-2 items-end cursor-pointer group">
                        
                        <UIcon
                        name="gridicons:visible"
                        class="size-5 text-mist-400 dark:text-mist-500 group-hover:text-orange-500 transition-colors duration-300"
                        />
                        <p class="text-sm text-mist-500 dark:text-mist-400">show intro</p>
                    </button>
                    
                </div>
                
                <article class="col-start-2 font-hand text-2xl text-stone-600 dark:text-stone-300 ">
                    <p>Ever tryed to create <span class="underline underline-offset-4 decoration-orange-500">ASCII images</span> with your old <span class="underline underline-offset-4 decoration-orange-500">typewriter</span>? Well, if you did it already, this site may helps you in your next attempt!</p>
                    <p><br/>If you never tryed before, here is your chance for a good fresh start ... </p>
                </article>
                
                <article class="col-start-2  mt-18 ">
                    <homeAsciiCatAnimation/>
                </article>
                
            </section>
            
        </header>
        
        <!-- image and ascii settings icons -->
        <section class="tw_container">
            <aside class="grid grid-cols-[2fr_7fr_2fr] mb-4">
                
                <div class="col-start-2 flex justify-between items-end ">
                    
                    <div class="flex justify-start items-center gap-x-2">
                        <button class="cursor-pointer group">
                            <UIcon
                            name="i-lucide-image"
                            class="size-9 text-mist-300 dark:text-mist-500 group-hover:text-orange-500 transition-colors duration-300"
                            />
                        </button>
                        
                        <button>
                            <UIcon
                            name="i-lucide-settings"
                            class="size-9 text-mist-500 dark:text-mist-200"
                            />
                        </button>
                    </div>
                    
                    <div>
                        <p class="text-xs text-right">help message</p>
                    </div>
                </div>
                
            </aside>
        </section>
        
        <section class="tw_container">
            
            <!-- hoja -->
            <article class="tw_grid mt-2 items-end">
                <div class="col-start-3 col-span-7  bg-white border-6 border-white  border-b-0  px-2 pt-2  shadow-xl row-span-2 ">
                    
                    <!-- select image -->
                    <HomeImageSelect
                        :raster-img-url="rasterImgUrl"
                        :ascii-source="asciiSource"
                        @update:ascii-img-file="onAsciiImgFileUpdate"
                        @update:raster-img-file="onRasterImgFileUpdate"
                    />
                    
                    <hr class="mb-3 mt-3 border-dashed border-mist-300 "/>
                    
                    <!-- ascii settings -->
                    <HomeAsciiSettings
                        v-model:shade-chars="shadeChars"
                        v-model:num-shade-chars="numShadeChars"
                        v-model:columns-width="columnsWidth"
                        v-model:img-brightness="imgBrightness"
                        v-model:img-contrast="imgContrast"
                        v-model:auto-levels="autoLevels"
                        :available-chars="availableChars"
                    />
                    
                    <hr class="mb-3 mt-3 border-dashed border-mist-300 "/>
                    
                    <div class="min-h-24 ">

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
                    
                </div>
                
                <div class="col-start-2 rounded-tl-xl h-6" :class="typewriterBg"></div>
                <div class="col-start-10 rounded-tr-xl h-6" :class="typewriterBg"></div>
            </article> 
            
            <!-- rulli + rulli 2 + hueco, merged into one grid so the return-carriage-lever
                 silhouette (col 1) can row-span all four rows instead of four separate cells -->
            <article class="tw_grid bg-mist-200 dark:bg-mist-800">

                <!-- lever silhouette space: paper continuing down behind the rollers -->
                <div class="col-start-1 row-span-4 bg-mist-50 dark:bg-mist-700  ">
                    <lever/>
                </div>

                <!-- rulli row -->
                <div class="row-span-2 bg-black/80 dark:bg-black/10 border-y-8 border-mist-50 dark:border-mist-700"></div>
                <div class="h-6 col-span-7 bg-white border-x-6 border-white p-2"></div>
                <!-- border-y-6 border-red-500 -->
                <div class="row-span-2  bg-black/80 dark:bg-black/10 border-y-8 border-mist-50 dark:border-mist-700"  >
                      <!-- two small arrows -->
                    <div class="flex  items-center justify-end pr-3 pt-1 gap-x-2 h-full">
                        <button
                            type="button"
                            class="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            :disabled="playMode !== 'pause' || rowIndex >= rowsHeight"
                            @click="incrementRowIndex"
                        >
                            <UIcon
                                name="lucide:arrow-up"
                                class="size-5 text-white"
                            />
                        </button>
                        <button
                            type="button"
                            class="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            :disabled="playMode !== 'pause' || rowIndex <= 0"
                            @click="decrementRowIndex"
                        >
                            <UIcon
                                name="lucide:arrow-down"
                                class="size-5 text-white"
                            />
                        </button>
                    </div>
                </div>

                <div class="bg-mist-50 dark:bg-mist-700">
                    <div class="h-6 border-t-8 border-r-8  border-mist-50 dark:border-mist-700 rounded-tr-2xl bg-black/50 dark:bg-black/10"></div>
    
                </div>
                <!-- rulli 2 row -->
                <div class="col-span-7 bg-white  ">

                    <div class="grid grid-cols-12 items-center mb-6">
                        <div class="h-2 bg-black" ></div>
                        <div class="h-4 rounded-full bg-black" ></div>

                        <div class="h-2 col-span-8 bg-black" ></div>

                        <div class="h-4 rounded-full bg-black" ></div>
                        <div class="h-2 bg-black" ></div>
                    </div>

                </div>
                
                <div class="bg-mist-50 dark:bg-mist-700">
                    <div class=" bg-black/70 dark:bg-black/50 w-full h-full border-b-8 border-r-8 border-mist-50 dark:border-mist-700 rounded-br-2xl"></div>
                </div>
           
                <!-- hueco row 1 -->
                <div class="col-start-2 aspect-2/1" :class="typewriterBg"></div>
                <div class="col-span-2 flex justify-start items-center" :class="typewriterBg">
                    <p class="text-xs text-white/80">
                        <span class="font-bold text-white">{{ lineIndex }}</span> of
                        <span>{{ columnsWidth }}</span>
                        | row: <span class="font-bold text-white">{{ rowIndex }}</span>
                    </p>
                </div>
                <div class="rounded-r-full" :class="typewriterBg"></div>
                <div class=" bg-mist-200 dark:bg-mist-800 "></div>
                <div class="rounded-l-full" :class="typewriterBg"></div>
                <div class="col-span-2 flex justify-end items-center" :class="typewriterBg">
                    <p class="text-sm text-white/70 pt-2">08' 59"</p>
                </div>
                <div :class="typewriterBg"></div>
                <div class="bg-mist-50 dark:bg-mist-700"></div>

                <!-- hueco row 2 -->
                <div class="col-start-2 aspect-square " :class="typewriterBg"></div>
                <div class="flex items-center" :class="typewriterBg">
                    <UIcon
                        name="i-lucide-audio-lines"
                        class="size-5"
                        :class="{
                            'text-white/75': playMode === 'idle',
                            'text-green-300': playMode === 'play',
                            'text-orange-500': playMode === 'pause',
                        }"
                    />
                </div>
                <div class="text-center col-span-5" :class="typewriterBg">
                    <div class="bg-mist-200 dark:bg-mist-800 h-full w-full rounded-full">

                        <div class="flex justify-center items-center h-full w-full">

                            <RemoteEvo
                                v-model:play-mode="playMode"
                            />

                        </div>

                    </div>
                </div>
                <div class="text-white flex items-center justify-end" :class="typewriterBg">
                    <UIcon
                        name="i-lucide-settings-2"
                        class="size-5"
                    />
                </div>
                <div :class="typewriterBg"></div>
                <div class="bg-mist-50 dark:bg-mist-700"></div>

            </article>
            
            <!-- hero holder -->
            <article class="tw_grid ">
                <div class="col-start-2 col-span-9" :class="typewriterBg">

                    <div class="mx-6" >
                        <CustomUiAccordion :isOpen="playMode !== 'idle'" >
                            <div class="mt-6 text-white text-xs h-48">
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
                        </CustomUiAccordion>
                        &nbsp;
                    </div>

                </div>
            </article>
               
            <!-- keyboard holder -->
            <article class="tw_grid">
                
                <div></div>
                
                <div
                    class="col-span-9 border-12 border-t-0 md:border-24 md:border-t-0 rounded-b-4xl pb-2 pt-1"
                    :class="typewriterBorder"
                >

                    <CustomUiAccordion :isOpen="playMode === 'idle'" >
                        <HomeTypewriterSettings
                            v-model:active-layout="activeLayout"
                            v-model:selected-preset="selectedPreset"
                            v-model:edit-mode="editMode"
                            v-model:char-pitch="charPitch"
                            v-model:line-spacing="lineSpacing"
                            v-model:keys-number="keysNumber"
                        />
                    </CustomUiAccordion>

                <!-- keyboard -->
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

            <div></div>
        </article>

        </section>

        <!-- keyboard settings icons -->
        <section class="tw_container">
            <aside class="grid grid-cols-[2fr_7fr_2fr] mt-6">

                <div class="col-start-2 flex justify-between items-center gap-x-4">

                    <div class="flex justify-start items-start gap-x-4">

                         <UIcon
                            name="i-lucide-settings-2"
                            class="size-5 text-mist-400 dark:text-mist-500 mt-2"
                            />

                        <button>
                            <UIcon
                            name="i-lucide-a-large-small"
                            class="size-9"
                            />
                        </button>
    
                         <button>
                            <UIcon
                            name="i-lucide-audio-lines"
                            class="size-9"
                            />
                        </button>
                    </div>
                    
                    <HomeColorPicker
                        :active-color="typewriterColor"
                        @change="typewriterColor = $event"
                    />
                </div>
                
            </aside>
        </section>

        <!-- bottom section -->
        <section class="tw_container mt-12">
            <section class="grid grid-cols-[2fr_7fr_2fr]">
                <article class="col-start-2 font-hand text-2xl text-stone-600 dark:text-stone-300">
                    <p>Lorem ipsum </p>
                </article>
            </section>
        </section>
    </div>

</template>

<script setup lang="ts">
    import { presets, type KeyboardLayout } from '~/utils/keyboardLayouts'
    import { getLayoutDensityChars } from '~/utils/keyboardLayouts/layoutChars'
    import type { KeyPosition } from '~/utils/keyboardLayouts/types'
    import { extractShadeChars } from '~/utils/asciiShadeChars'
    import { loadImageData, loadImageElementFromUrl } from '~/utils/imageSampling'

    // --- App variables ---
    // dark -> light by Lekton charDensity; every char here is on all 18 keyboardLayouts
    // "WOEsc:- " best 8 // "WRUyv!:- "
    const shadeChars = ref('WMmhi=:-. ')
    const numShadeChars = ref(shadeChars.value.length);

    const imgBrightness = ref(100) // 0 to 200
    const imgContrast = ref(100) // 0 to 200
    const autoLevels = ref(false) // auto contrast levels
    
    type PlayMode = 'idle' | 'play' | 'pause'
    const playMode = ref<PlayMode>('idle');

    const DEFAULT_LINE_SPACING: LineSpacing = 'single'

    // playback position within the ascii image
    const lineIndex = ref(0) // current playback column (char) index within the row
    const rowIndex = ref(0) // current playback row index

    const playCount = computed(() => lineIndex.value  + (rowIndex.value * columnsWidth.value))
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
    // - the two are siblings here, so index.vue is the hub
    const activeSound = ref<SoundEvent | null>(null)
    const onSound = (event: SoundEvent) => {
        activeSound.value = event
    }

    // rows and coulmns of the ascii image, in characters
    const rowsHeight = ref(0) // ascii image height, in rows
    const columnsWidth = ref(48);

    // ascii_image
    const asciiImageString = ref<string>('');

    // tracks how asciiImageString was produced: 'image' generation (imgToAscii-style
    // pipeline, driven by rasterImgFile + the settings below) vs 'text' (a premade
    // .txt loaded verbatim from the library) — the two sources write to the same
    // asciiImageString ref, so this flag decides which watcher's write should stick.
    type AsciiSource = 'image' | 'text'
    const asciiSource = ref<AsciiSource>('image')

    const asciiImgFile = ref<string>('');
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
    const rasterImgFile = ref<string | File>('catFace.jpg');
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



    // --- UI variables ---

    // typewriterColor/selectedPreset/charPitch/keysNumber are shared site-wide
    // state (see useActiveTypewriterSettings) rather than page-local refs, so any
    // other page/component reading them stays in sync with what's set here
    const { typewriterColor, selectedPreset, charPitch, keysNumber } = useActiveTypewriterSettings()

    // typewriter body silhouette color (bg-*/border-* pair) — swappable via a
    // future color picker; TYPEWRITER_COLORS holds full literal class names
    // so Tailwind's scanner can find them (a template-built `bg-${x}` string
    // would never be generated, since Tailwind only greps source text)
    const typewriterBg = computed(() => TYPEWRITER_COLORS[typewriterColor.value].bg)
    const typewriterBorder = computed(() => TYPEWRITER_COLORS[typewriterColor.value].border)

    // --- Keyboard variables ---
    const activeLayout = ref<KeyboardLayout>(presets.qwertyES)
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