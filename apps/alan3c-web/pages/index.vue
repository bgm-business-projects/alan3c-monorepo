<template>
  <div class="w-full flex flex-col">
    <div class="flex flex-row py-3rem">
      <div class="flex flex-col gap-2rem items-center flex-1">
        <h1 class="font-bold text-xl">
          老闆的家
        </h1>
        <div ref="imageContainerRef" class="border w-full h-600px">
          {{ imageContainerWidth }} / {{ imageContainerHeight }}
          <base-polygon :container-width="imageContainerWidth" :container-height="imageContainerHeight" />
          <div class="">
            <nuxt-img :src="combineImageUrl(home?.mainImage?.filename_disk)" />
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex flex-col gap-1rem">
          <h2 class="font-semibold text-lg">
            現任
          </h2>
          <ul class="flex flex-col gap-.5rem font-medium">
            <li v-for="item in home?.translations?.incumbent" :key="item.title">
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import BasePolygon from '../components/base-polygon.vue'
import { combineImageUrl } from '../utils/combine-image-url'

const imageContainerRef = ref<HTMLDivElement>()

const { width: imageContainerWidth, height: imageContainerHeight } = useElementSize(imageContainerRef)

const { locale } = useI18n()

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

useSeoMeta({
  title: 'home',
  description: 'home',
  keywords: 'home',
  ogTitle: 'home',
  ogDescription: 'home',
})
</script>

<style scoped lang="sass">
.test
  background: #000
</style>
