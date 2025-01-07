<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding">
    <div class="max-width flex flex-col gap-1.5rem bg-white fixed pt-3rem">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          圖像處理 Seminar
        </h1>
      </div>
    </div>
    <div class="max-width flex flex-col gap-2rem pt-10rem pb-1rem">
      {{ imageProcessing }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const localePath = useLocalePath()
const route = useRoute()

const useImageProcessing = useImageProcessingApi()

const { data: imageProcessing, refresh: refreshImageProcessing } = useLazyAsyncData('image-processing', async () => {
  const [err, result] = await to (useImageProcessing.findList())
  if (err) {
    return Promise.reject(err)
  }
  return result
}, {
  watch: [locale],
})

useSeoMeta({
  title: '圖像處理 Seminar',
  description: '圖像處理 Seminar',
  keywords: '圖像處理 Seminar',
  ogTitle: '圖像處理 Seminar',
  ogDescription: '圖像處理 Seminar',
})
</script>

<style scoped lang="sass">
.test
  background: #000
</style>
