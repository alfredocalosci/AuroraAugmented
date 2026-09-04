<template>
  <div class="mx-6 md:mx-0">
    
    <SiteNav/>
  
    <section class="container grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_2fr_1fr] lg:grid-cols-[1fr_4fr_1fr_2fr-1fr] pt-20 lg:pt-6">

      <header class="mt-6 md:col-start-2 md:col-span-2">
        <h1 class="text-xl font-mono font-bold  dark:text-white ">
          Type <span class="font-normal">by</span> tune<span class="font-bold text-orange-500 pl-0.5">.</span>
        </h1>
        <h3 class="font-hand mb-4 text-mist-400 dark:text-mist-400 ">your typewriter image generation assistent</h3>
      </header>

      <article class=" md:col-start-2 mt-2 md:-mx-4 md:-rotate-2">
        <div class="font-hand text-2xl text-mist-600 dark:text-mist-300 mt-6 ">
          <p>Ever tryed to create <span class="underline underline-offset-4 decoration-orange-500">ASCII images</span> with your old <span class="underline underline-offset-4 decoration-orange-500">typewriter</span>? Well, if you did it already, this site may helps you in your next attempt !</p>
          <p><br/>If you never tryed before, here is your chance for a good fresh start <span class="text-orange-500">...</span> </p>
        </div>
      </article>

      <aside class="md:col-start-4 mt-12 md:-mt-8 lg:-mt-6 md:row-span-3">
        <homeAsciiCatAnimation/>
      </aside>

      <article class="md:col-span-3 mt-4 ">
        <div class="w-full md:w-3/4 lg:w-5/6  mx-auto">
          <HomeTypewriterIconBig/>
        </div>

        <div class="flex justify-center">
           <HomeColorPicker
                :active-color="typewriterColor"
                @change="typewriterColor = $event"
              />
        </div>
      </article>

      <article class=" md:col-start-2  mt-12 mb-12">
         
        <UFormField label="Set up your typewriter">
          <USelect
            v-model="selectedModelId"
            :items="typewriterModelItems"
            placeholder="Choose a typewriter model"
            class="w-full mt-2"
            @update:model-value="onModelChange"
          />
          <USelect v-model="selectedPreset" :items="presetItems" class="w-full mt-2" />
        </UFormField>

        <nuxtLink
          class="flex justify-between items-center font-hand gap-y-2 mt-4 text-xl"
          to="/playerLayout"
        >
        
          <span class="pl-2">let's type !</span>

           <UIcon
            name="i-lucide-circle-arrow-right"
            class="size-12 mt-3 text-orange-500 hover:text-orange-500 transition-colors duration-300"
          />
        </nuxtLink>
         
      </article>

    </section>
    
  </div>
</template>

<script lang="ts" setup>
  import type { SelectItem } from '@nuxt/ui'
 
  import { presets, type KeyboardLayout, type PresetName } from '~/utils/keyboardLayouts'
  const presetItems: SelectableLayout[] = [...Object.keys(presets) as PresetName[], 'custom']

  const { typewriterColor, selectedPreset, charPitch, keysNumber, tw_model } = useActiveTypewriterSettings();

  const typewriterModelItems = typewriterModelSelectItems()

  const selectedModelId = ref<string | undefined>(tw_model.value ? typewriterModelId(tw_model.value) : undefined)

  function onModelChange(id: string | undefined) {
    const found = findTypewriterModelById(id)
    if (!found) return
    charPitch.value = found.pitch
    keysNumber.value = found.keys
    tw_model.value = found
  }

</script>

<style>

</style>