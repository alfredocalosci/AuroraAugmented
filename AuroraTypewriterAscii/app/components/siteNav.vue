<template>
  <div>
    <!-- nav holder -->
    <section
      class="fixed z-10 bg-white dark:bg-mist-800 overflow-hidden shadow-md md:shadow-lg lg:shadow-xl top-0 inset-x-0 md:inset-x-9 h-16 md:h-18 rounded-none md:rounded-b-3xl lg:inset-x-auto lg:inset-y-6 lg:left-0 lg:h-auto lg:w-24 lg:rounded-bl-none lg:rounded-r-3xl"
    >
      <!-- split content -->
      <div class="flex lg:flex-col items-center justify-between h-full px-4 lg:px-0 lg:py-6">

        <!-- slot split-->
       <div class="flex lg:flex-col items-center lg:items-center">
          <nav class="flex lg:flex-col items-center justify-between  lg:gap-x-0 lg:gap-y-2 divide-x lg:divide-x-0 lg:divide-y divide-gray-200 dark:divide-mist-700">
            <NuxtLink
              v-for="item in navItems" :key="item.label"
              :to="item.to"
              class="cursor-pointer px-4 lg:px-0 lg:py-2 pt-1 "
              :class="route.path === item.to ? 'text-mist-900 dark:text-mist-50' : 'text-mist-300 dark:text-mist-500'"
            >
              <UIcon :name="item.icon" :class="item.sizeClass == 'bigger' ? 'size-10 lg:size-12' : 'size-7 lg:size-9'" />
            </NuxtLink>
          </nav>

          <slot />

       </div>

        <aside class="flex lg:flex-col items-center gap-x-2 lg:gap-x-0 lg:gap-y-3">
           <UColorModeButton size="xl"/>
           <div
              class="w-6 h-6 rounded-full inset-shadow-sm/50 lg:mx-auto"
              :class="typewriterBg"
            >&nbsp;</div>
        </aside>
       </div>

    </section>
  </div>
</template>

<script lang="ts" setup>
  const { typewriterColor } = useActiveTypewriterSettings();
  const typewriterBg = computed(() => TYPEWRITER_COLORS[typewriterColor.value].bg)

  const route = useRoute();

  const navItems =[
    {
      label:'home',
      icon:'custom:gatoascii',
      sizeClass: 'bigger',
      to:'/landing',

    },
    {
      label:'player',
      icon:'custom:typepiano',
      sizeClass: 'bigger',
      to:'/playerLayout',
    },
    {
      label:'about',
      icon:'i-lucide-info',
      sizeClass: 'normal',
      to:'/about',
    }
  ];

</script>

<style>

</style>
