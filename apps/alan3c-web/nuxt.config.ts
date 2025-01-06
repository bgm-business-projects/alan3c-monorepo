// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'dayjs-nuxt',
    'nuxt-gtag',
    '@nuxt/image',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-swiper',
    'nuxt-marquee',
  ],
  i18n: {
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
  },
  image: {
    domains: [
      'https://alan3c.de.r.appspot.com',
    ],
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
      apiBaseUrl: process.env.NUXT_API_BASE_URL || 'https://localhost:3000',
    },
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
})
