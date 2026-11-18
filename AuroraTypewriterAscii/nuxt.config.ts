// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxtjs/i18n", "@vueuse/nuxt"],
  compatibilityDate: "2026-08-15",
  icon: {
    clientBundle: {
      scan: true,
    },
    customCollections: [{
      prefix: 'custom',
      dir: './app/assets/icons'
    }]
  },
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [
     
      { name: 'Lekton', provider: 'google', weights: [400, 700] },
      { name: 'Orbitron', provider: 'local', weights: [400, 900] },
      { name: 'Shadows Into Light Two', provider: 'google', weights: [400] }
    ]
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    strategy: 'no_prefix',
  },
});
