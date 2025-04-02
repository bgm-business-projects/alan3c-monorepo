// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  // ssr: false,
  modules: [
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'dayjs-nuxt',
    'nuxt-gtag',
    '@nuxt/image',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-anchorscroll',
    'nuxt-swiper',
    'nuxt-marquee',
    // 'nuxt-security',
  ],
  i18n: {
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
  },
  image: {
    ipx: {
      baseURL: '/',
    },
  },
  quasar: {
    plugins: [
      'Notify',
      'Dialog',
      'Loading',
    ],
    config: {
      notify: {},
    },
    extras: {
      fontIcons: [
        'material-symbols-outlined',
      ],
    },
  },
  dayjs: {
    locales: ['zh-tw'],
    defaultLocale: 'zh-tw',
    defaultTimezone: 'Asia/Taipei',
    plugins: ['utc', 'timezone'],
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/_colors.sass" as *\n',
        },
      },
    },
  },
  css: [
    '@/assets/style/main.sass',
  ],
  unocss: {
    nuxtLayers: true,
    preflight: true,
  },
  // devServer: {
  //   https: true
  // },
  runtimeConfig: {
    public: {
      // 客戶端和服務端都可以訪問的環境變數
      // eslint-disable-next-line node/prefer-global/process
      apiBaseSSRUrl: process.env.NUXT_API_BASE_SSR_URL,
      // eslint-disable-next-line node/prefer-global/process
      apiBaseCSRUrl: process.env.NUXT_API_BASE_CSR_URL,

      apiBaseUrl: '',
    },
    baseUrl: '',
  },
  hooks: {
    'pages:extend': function (pages) {
      pages.push({
        name: 'home',
        path: '/',
        file: '~/pages/home/index.vue',
      })
    },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  // security: {
  //   // Options
  //   headers: {
  //     contentSecurityPolicy: {
  //       'script-src': ['\'self\'', '\'strict-dynamic\'', '\'nonce-{{nonce}}\''],
  //     },
  //   },
  //   corsHandler: false,
  // },
  nitro: {
    // preset: 'cloudflare', // 預設為 node-server
    errorHandler: '~/error',
  },
})
