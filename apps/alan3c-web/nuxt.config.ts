// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "nuxt-quasar-ui", 
    "@nuxtjs/i18n",
    '@pinia/nuxt',
    'dayjs-nuxt',
    "nuxt-gtag",
    '@nuxt/image',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-swiper'
  ],
  image: {
    domains: [
      'https://oppa-toy-creative.de.r.appspot.com'
    ]
  },
  quasar: {
    plugins: [
      'Notify',
      'Dialog',
      'Loading'
    ],
    config: {
      notify: {},
    },
    extras:{
      fontIcons: [
        'material-symbols-outlined'
      ]
    }
  },
  dayjs: {
    locales: [ 'zh-tw'],
    defaultLocale: 'zh-tw',
    defaultTimezone: 'Asia/Taipei',
    plugins: [ 'utc', 'timezone' ]
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/_colors.sass" as *\n'
        }
      }
    }
  },
  css: [
    '@/assets/style/main.sass'
  ],
  unocss: {
    nuxtLayers: true,
    preflight: true
  },
  // devServer: {
  //   https: true
  // },
  runtimeConfig: {
    public: {
      // 客戶端和服務端都可以訪問的環境變數
      apiBaseUrl: process.env.NUXT_API_BASE_URL || 'https://localhost:3000',
    }
  }
})