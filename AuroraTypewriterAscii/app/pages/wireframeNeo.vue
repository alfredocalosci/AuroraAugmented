<template>
  <div class="min-h-screen bg-olivetti-slate dark:bg-olivetti-yellow text-olivetti-black dark:text-olivetti-black">

    <!--
      Layout schema translated from layout_phone.svg / layout_tablet.svg / layout blocks.svg.

      One template, not one-per-breakpoint: each <section> below is its own full-bleed
      "row" grid — [gutter | content | gutter] — reused at every breakpoint with the
      same responsive grid-cols. Row height is never set directly; it's whatever the
      content column needs, and grid's default item-stretch makes the gutter/background
      divs (which have no content of their own) match that height automatically. Content
      column width: 100% on mobile (no gutters), 90% on tablet, a fixed 691.2px on
      desktop (= 90% of the 768px tablet breakpoint, per spec, not a fluid value).

      Colors are the schema's literal hex values, not the app's mist/TYPEWRITER_COLORS
      palettes (different concern). The desktop side panel is `fixed`, not a grid column,
      since it needs to stay pinned to the viewport height regardless of how tall the
      stacked rows end up — see its own comment below.
    -->

    <!-- side panel ("layer block"): pinned to the viewport, not part of any row -->
    <div class="hidden lg:block fixed inset-y-0 left-0 w-72 py-6 z-10">
      <div class="h-full w-full bg-white rounded-r-[20px] shadow-2xl"></div>
    </div>

    <!-- paper: ascii display -->
    <section class="grid grid-cols-1 md:grid-cols-[1fr_90%_1fr] lg:grid-cols-[6fr_76px_692px_76px_1fr] md:bg-olivetti-yellow dark:bg-olivetti-shade-20">

      <div class="hidden md:flex lg:col-start-2 lg:col-span-1 bg-olivetti-yellow dark:bg-olivetti-shade-20 items-end ">
        <div class="bg-olivetti-shade-40 h-12 w-full rounded-tl-2xl lg:rounded-tl-full"></div>
      </div>
      
      <div class="md:col-start-2 lg:col-start-3 bg-white px-4 mt-0 pb-6 md:mt-6 shadow-2xl">
         <div class="border border-dashed border-white px-3  mt-6">
          <header class="flex items-center justify-between">
              <p class="font-display font-normal tracking-wide text-lg">Type <span class="text-olivetti-shade-30">by</span> tune <span class="font-bold text-olivetti-red text-xl">.</span></p>
              <UColorModeButton size="xl"/>
          </header>
        </div>

        <div class="border border-dashed border-mist-300 p-3 text-xs min-h-32 mt-6">
          <p>ascii image placeholder</p>
        </div>

        <!-- image selection holder -->
        <div class=" p-4 text-xs min-h-32 mt-6 rounded-t-2xl bg-olivetti-yellow">
          <p>image selection placeholder</p>
        </div>

        <!-- double split bg trick -->
        <div class="w-full h-12 relative">

          <div class="h-6 w-full bg-olivetti-yellow"></div>
          <div class="h-6 w-full bg-olivetti-sage"></div>

          <div class="absolute inset-0 h-12 rounded-full px-4 md:px-6 bg-olivetti-shade-10">
           
            <div class="flex items-center justify-between h-full w-full">
              <!-- dummy ascii image editor buttons -->
              <div>
                <button
                  class="cursor-pointer w-12 h-12 pt-2"
                >
                <UIcon
                  name="i-lucide-text-cursor"
                  class="size-7 text-mist-700"
                />
              </button>

              <button
                  class="cursor-pointer w-12 h-12 pt-2"
                >
                <UIcon
                  name="i-lucide-grip"
                  class="size-7 text-mist-700"
                />
              </button>
              </div>
              <div><AppSettingsNeo /></div>
           </div>
          </div>

        </div>

         <!-- image to ascii options holder -->
        <div class=" p-4 text-xs min-h-32 rounded-b-2xl bg-olivetti-sage">
          <p>image to ascii options placeholder</p>
        </div>


      </div>

      <div class="hidden md:flex lg:col-start-4 lg:col-span-1 bg-olivetti-yellow dark:bg-olivetti-shade-20 items-end">
        <div class="bg-olivetti-shade-40 h-12 w-full rounded-tr-2xl lg:rounded-tr-full"></div>
      </div>

    </section>

    <!-- keyboard / guitar hero -->
    <section class="grid grid-cols-1 md:grid-cols-[1fr_90%_1fr] lg:grid-cols-[6fr_76px_692px_76px_1fr] md:bg-olivetti-shade-40 lg:bg-olivetti-sage lg:dark:bg-olivetti-shade-30">
      <!-- desktop only: the dark band narrows to content+right-gutter, leaving the
           left gutter (behind the side panel) showing the green section background -->
      <div class="hidden lg:block lg:col-start-2 lg:col-span-2 bg-olivetti-shade-40 rounded-bl-xl"></div>

      <div class="hidden lg:block lg:col-start-2 lg:col-span-1 bg-olivetti-shade-40 rounded-bl-xl"></div>

      <div class="md:col-start-2 lg:col-start-3 bg-olivetti-shade-10 dark:bg-olivetti-shade-50 p-4 pb-0 flex flex-col">

        <!-- wireframe-only toggle to preview both playMode states -->
        <button type="button" class="mb-2 text-xs underline" @click="isPlaying = !isPlaying">
          toggle playMode ({{ isPlaying ? 'on' : 'off' }})
        </button>

        <!--
          guitar hero note-highway (back) + keyboard (front, height unset).

          The back svg is `absolute inset-0` on the `relative` wrapper below, so
          its box (and therefore the rect filling it at w-full h-full) always
          spans the wrapper's FULL height — including the part directly behind
          the keyboard — rather than a fixed height that could fall short of
          wherever the keyboard's own (content-driven) bottom edge ends up.

          The wrapper's actual height comes from its normal-flow children only
          (absolutely-positioned elements don't contribute to it): the "peek"
          spacer (h-56, how much svg shows above the keyboard) plus the keyboard
          box itself. So back = spacer + keyboard, exactly matching keyboard's
          bottom by construction, no matter how tall the keyboard turns out.

          While playMode is off, back + spacer are both removed (v-if) so the
          wrapper collapses to just the keyboard's own height (layout shifts by
          design, per the "collapse the space" choice made earlier).

          mt-auto (on the wrapper): bottom-anchors it within the column
          regardless of the row's height.
        -->
        <div class="relative mt-auto">

          <template v-if="isPlaying">
            <div class="absolute inset-0 border border-dashed border-mist-400">
              <!-- viewBox="0 0 100 100" -->
              <svg class="w-full h-full"  preserveAspectRatio="none">
                <rect x="0" y="0" width="100%" height="100%" class="fill-olivetti-shade-20 dark:fill-olivetti-shade-50" />

                <text x="50" y="50"  font-size="8" fill="currentColor">guitar hero svg placeholder</text>

              </svg>
            </div>

            <!-- peek spacer: how much of the back svg shows above the keyboard -->
            <div class="h-56" aria-hidden="true"></div>
          </template>

          <div class="relative border border-dashed border-mist-400 bg-olivetti-shade-10/80 dark:bg-olivetti-shade-50">
            <div class="flex items-center justify-center text-xs p-4">
              <p>keyboard placeholder</p>
            </div>
          </div>

        </div>

      </div>

      <div class="hidden lg:block lg:col-start-4 lg:col-span-1 bg-olivetti-shade-40 rounded-br-xl"></div>

    </section>

    <!-- remote control -->
    <section class="grid grid-cols-1 md:grid-cols-[1fr_90%_1fr] lg:grid-cols-[6fr_76px_692px_76px_1fr] md:bg-olivetti-slate md:dark:bg-olivetti-yellow">

      <div class="hidden lg:block lg:col-start-2 lg:col-span-1 "></div>

      <div class="md:col-start-2 lg:col-start-3  bg-olivetti-shade-20 dark:bg-olivetti-shade-40 rounded-b-3xl ">

        <!-- double background trick -->
        <div class="bg-olivetti-shade-20 dark:bg-olivetti-shade-40 min-h-6">
          <div class="bg-olivetti-shade-10 dark:bg-olivetti-shade-50 h-full rounded-b-3xl p-4">
            <div class="border border-dashed border-mist-400 text-xs min-h-8 p-4">
              <p>keyboard settings</p>
            </div>
          </div>
        </div>
        
        <div class="border border-dashed border-mist-400  text-xs min-h-16 m-4">
          <p>remote control placeholder</p>
        </div>

        <div class="border border-dashed border-mist-400  text-xs min-h-8 m-4">
          <p>remote control preferences</p>
        </div>

      </div>

      <div class="hidden lg:block lg:col-start-4 lg:col-span-1 "></div>
    </section>

    <!-- bottom spacer -->
    <div class="h-6"></div>

  </div>
</template>

<script lang="ts" setup>
const isPlaying = ref(false)
</script>

<style>

</style>
