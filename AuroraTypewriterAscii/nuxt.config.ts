// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["shadcn-nuxt", "@nuxtjs/google-fonts", "@nuxt/icon"],
  compatibilityDate: "2025-04-19",
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  googleFonts: {
    // Options
    families: {
      Lekton: {
        wght: '300..900',
        ital: '300..900',
      },
      Merriweather: {
        wght: [400, 700],
        ital: [400],  
      },
      Lato: {
        wght: [100, 300, 400, 700],
        ital: [100, 300, 400, 700],
      },
    display: "swap",
    prefetch: true,
    preload: true,
    preconnect: true,
  }
  },
  icon: {
    mode: 'css',
    cssLayer: 'base'
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
});