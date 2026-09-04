<template>
  <div class="min-h-screen">
    

    <section
      class="fixed z-10 bg-white inset-y-6 left-0 overflow-hidden transition-[width] duration-300 ease-in-out shadow-xl rounded-r-3xl"
      :class="isOpen ? 'w-full md:w-[calc(100%-1.5rem)] lg:w-1/2' : 'w-24'"
    >
      <div class="flex h-full">

        <div class="w-24 shrink-0 h-full bg-white dark:bg-mist-800 flex flex-col items-center gap-y-2 pt-6">

          <div class="flex flex-col justify-between items-center h-full">
            <div>

              <nav class="flex flex-col justify-start gap-y-6">
                
                <img
                  src="/img/gato_ascii.svg"
                  alt="ascii cat"
                  class="w-12 h-auto mx-auto"
                />

                 <hr class="-my-2 border-mist-300"/>

                <button class="cursor-pointer group">
                  <img
                    src="/img/typePiano_icon.svg"
                    alt="type piano icon"
                    class="w-16 h-auto mx-auto"
                  />
                </button>

                <hr class="-my-2 border-mist-300"/>

                <div class=" w-full flex flex-col items-center min-h-24 gap-y-3">
                 
                 
                    <UIcon
                        name="i-lucide-settings-2"
                        class="size-6 text-mist-300 hover:text-orange-500 transition-colors duration-300  mb-2" 
                    />
                 
               
                  <UIcon
                    name="i-lucide-image"
                    class="size-8 text-mist-700 hover:text-orange-500 transition-colors duration-300"
                />
               

                <UIcon
                    name="i-lucide-a-large-small"
                    class="size-8 text-mist-700 hover:text-orange-500 transition-colors duration-300"
                />

                <UIcon
                    name="i-lucide-audio-lines"
                    class="size-8 text-mist-700 hover:text-orange-500 transition-colors duration-300"
                />

                 <UIcon
                    name="i-lucide-keyboard"
                    class="size-8 text-mist-700 hover:text-orange-500 transition-colors duration-300"
                />

                

                </div>

                

                  <hr class="-my-2 border-mist-300"/>

               <button class="cursor-pointer group">
                   <UIcon
                      name="lucide:user"
                      class="size-8 text-mist-700 hover:text-orange-500 transition-colors duration-300"
                  />
                 </button>

               <hr class="-my-2 border-mist-300"/>

            

                 <button class="cursor-pointer group">
                   <UIcon
                      name="lucide:circle-question-mark"
                      class="size-8 text-mist-700 hover:text-orange-500 transition-colors duration-300"
                  />
                 </button>

                <button class="cursor-pointer group" @click="isOpen = true">
                  <UIcon
                    name="i-lucide-chevron-right"
                    class="size-8 text-mist-700 hover:text-orange-500 transition-colors duration-300"
                  />
                </button>

                 

               
              </nav>

            </div>

            <div>
              <div class="pb-6">
                <UColorModeSwitch color="primary"/>
              </div>
            </div>

          </div>
        </div>


        <div class="relative flex-1 h-full bg-white flex items-center justify-center">
          <button class="cursor-pointer group absolute top-6 right-6" @click="isOpen = false">
            <UIcon
              name="i-lucide-x"
              class="size-5 text-mist-700 hover:text-orange-500 transition-colors duration-300"
            />
          </button>
          <p class="text-xs">content</p>
        </div>
      </div>
    </section>

    <section class="container grid grid-cols-[1fr_4fr_1fr_2fr] pt-6">

      <div></div>

      <header class="mt-6">
          <h1 class="text-xl font-mono font-bold  dark:text-white ">
          Type <span class="font-normal">by</span> tune<span class="font-bold text-orange-500 pl-0.5">.</span>
        </h1>
        <h3 class="font-hand mb-4 text-mist-400 dark:text-mist-400 ">your typewriter image generation assistent</h3>
      </header>

      <div></div>

      <!-- -rotate-4 -->
      <article class=" col-start-2  mt-2 -mx-4 -rotate-2">
        <div class="font-hand text-2xl text-mist-600 dark:text-mist-300 mt-6 ">
          <p>Ever tryed to create <span class="underline underline-offset-4 decoration-orange-500">ASCII images</span> with your old <span class="underline underline-offset-4 decoration-orange-500">typewriter</span>? Well, if you did it already, this site may helps you in your next attempt !</p>
          <p><br/>If you never tryed before, here is your chance for a good fresh start <span class="text-orange-500">...</span> </p>
        </div>
      </article>

      <aside class="col-start-4 -mt-6 row-span-3">
        <homeAsciiCatAnimation/>
      </aside>

      <article class=" col-start-2  mt-12">

        <div class="grid grid-cols-[3fr_2fr] gap-0 ">
          <div class="border-r border-mist-200 dark:border-mist-600">
            <img
              src="/img/typePiano_color_icon.svg"
              alt="type piano icon"
              class=" w-full h-auto -mx-6 pt-6"
            />
            <p class="text-center text-xs">color picker</p>
          </div>

          <div class="pl-6 ">

            <p class="text-xs mb-2">set up your typewriter:</p>
            <div class="flex flex-col gap-y-2 mb-12">
              <USelect v-model="value" :items="items" class="w-full" />
              <USelect v-model="value" :items="items" class="w-full" />
            </div>
           
            

            <!--
            <div class="aspect-square rounded-full bg-white m-6 shadow-2xl">
              
            </div>
            -->

            <nuxtLink
              class="flex flex-col items-center font-hand gap-y-2 "
              to="/next-page"
            >
              <UIcon
                  name="i-lucide-circle-arrow-right"
                  class="size-32 mt-3 text-orange-500 hover:text-orange-500 transition-colors duration-300"
                />
                let's try it
            </nuxtLink>
          </div>
          

        </div>
      </article>

    </section>
    
  </div>
</template>

<script lang="ts" setup>
import type { SelectItem } from '@nuxt/ui'

const isOpen = ref(false)

const items = ref([
  ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'],
  ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']
])
const value = ref('Apple')
</script>

<style>

</style>