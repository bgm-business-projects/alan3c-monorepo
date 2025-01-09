<template>
  <div class="layout-padding flex justify-center w-full py-3rem">
    <div class="w-full flex flex-col max-width gap-2rem">
      <div class="flex gap-1.5rem lg:gap-3rem w-full flex-col lg:flex-row">
        <div class="flex flex-col gap-1rem items-center justify-center flex-1 w-full">
          <h1 class="font-bold text-xl w-full">
            老闆的家
          </h1>
          <div ref="imageContainerRef" class="w-full aspect-4/3 relative">
            <base-polygon
              class="absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]"
              :container-width="imageContainerWidth" :container-height="imageContainerHeight"
            />
            <div
              class="absolute top-50% left-50% w-75% aspect-4/3 translate-x-[-50%] translate-y-[-50%] overflow-hidden"
            >
              <nuxt-img :src="combineImageUrl(home?.mainImage?.filename_disk)" />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3rem lg:gap-4rem justify-center flex-1">
          <div class="flex flex-col gap-1rem">
            <h2 class="font-bold text-xl">
              現任
            </h2>
            <ul class="flex flex-col gap-.5rem font-medium">
              <li v-for="item in home?.translations?.incumbent" :key="item.title">
                {{ item.title }}
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-1rem">
            <h2 class="font-bold text-xl">
              研究領域
            </h2>
            <ul class="flex flex-col gap-.5rem font-medium">
              <li v-for="item in home?.translations?.incumbent" :key="item.title">
                {{ item.title }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="border bg-gray-50 p-2rem flex justify-center gap-2rem font-medium">
        <nuxt-link v-for="item in data" :key="item.name" :to="localePath(item.route)">
          {{ item.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
  <nuxt-marquee class="my-0 lg:my-3rem py-.7rem border-t-1px border-b-1px border-solid border-gray-200">
    <div
      v-for="item in 10"
      :key="item"
      class="flex items-center gap-.5rem mx-1rem"
    >
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.56171 5.58042L5.89481 1.30563C5.93554 0.782926 5.46249 0.333733 4.93823 0.327727C4.42901 0.321893 4.07186 0.754749 4.12101 1.26163L4.53797 5.56159C4.5442 5.62578 4.5442 5.69043 4.53797 5.75462L4.12393 10.0244C4.07321 10.5474 4.48432 11.0003 5.00983 11.0003C5.52864 11.0003 5.93749 10.5584 5.89719 10.0412L5.56171 5.73579C5.55768 5.68408 5.55768 5.63213 5.56171 5.58042Z" fill="black" />
        <path d="M5.37252 6.08461L9.12989 4.01897C9.58933 3.76639 9.70555 3.12448 9.42308 2.68279C9.14872 2.25376 8.59089 2.19247 8.19398 2.51153L4.82688 5.21821C4.77661 5.25862 4.72255 5.29407 4.66546 5.32407L0.867889 7.31928C0.402681 7.5637 0.249394 8.15584 0.53757 8.59529C0.822076 9.02914 1.41585 9.12867 1.82629 8.81132L5.24259 6.16982C5.28363 6.13809 5.32707 6.1096 5.37252 6.08461Z" fill="black" />
        <path d="M4.75073 6.16615L8.10843 8.83271C8.519 9.15877 9.15593 9.01778 9.45406 8.5865C9.74365 8.1676 9.58451 7.62946 9.1368 7.38677L5.3388 5.32796C5.2821 5.29723 5.2285 5.26108 5.17877 5.22002L1.87047 2.48916C1.4652 2.15462 0.859843 2.24219 0.565985 2.67786C0.275871 3.10798 0.41364 3.69406 0.864995 3.94989L4.62192 6.07927C4.66704 6.10484 4.71011 6.13389 4.75073 6.16615Z" fill="black" />
      </svg>
      <div class="text-md">
        千教萬教，教人求真
      </div>
      <div class="w-5px h-5px bg-black rounded-full" />
      <div class="text-md">
        千學萬學，學做真人
      </div>
    </div>
  </nuxt-marquee>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import BasePolygon from '../../components/base-polygon.vue'
import { combineImageUrl } from '../../utils/combine-image-url'

const imageContainerRef = ref<HTMLDivElement>()

const { width: imageContainerWidth, height: imageContainerHeight } = useElementSize(imageContainerRef)

const { locale } = useI18n()

const localePath = useLocalePath()

const useHome = useHomeApi()

const { data: home, refresh: refreshHome } = useLazyAsyncData('home', async () => {
  const [err, result] = await to (useHome.findOne())
  if (err) {
    return Promise.reject(err)
  }
  return result
}, {
  transform: (data) => {
    return {
      ...data?.data,
      translations: data?.data.translations.filter((item) => item.homeLanguages_code === locale.value)[0],
    }
  },
  watch: [locale],
})

const data = ref([
  {
    name: '個人資料',
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'resume' },
    },
  },
  {
    name: 'Curriculum Vitae',
    route: {
      name: 'home-curriculum-vitae',
    },
  },
  {
    name: '我的徒弟',
    route: {
      name: 'trainee',
    },
  },
  {
    name: '研究計畫',
    route: {
      name: 'home-research-plan',
    },
  },
  {
    name: '生活點滴',
    route: {
      name: 'home-life-snippets',
    },
  },
  {
    name: '薪火相傳。文心薈萃文集',
    route: {
      name: 'home-proceedings',
    },
  },
  {
    name: '訪問學者/博士後研究員',
    route: {
      name: 'home-scholar',
    },
  },
  {
    name: '真誠文集',
    route: {
      name: 'home-compilation',
    },
  },
  {
    name: '學術演講',
    route: {
      name: 'home-academic-lecture-record',
    },
  },
])

useSeoMeta({
  title: '老闆的家 | 多媒體暨網路安全實驗室',
  description: '老闆的家 | 多媒體暨網路安全實驗室',
  keywords: '老闆的家 | 多媒體暨網路安全實驗室',
  ogTitle: '老闆的家 | 多媒體暨網路安全實驗室',
  ogDescription: '老闆的家 | 多媒體暨網路安全實驗室',
})
</script>

<style scoped lang="sass">
.test
  background: #000
</style>
