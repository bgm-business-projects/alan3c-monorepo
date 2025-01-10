<template>
  <div class="w-full flex flex-col gap-1rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        研究重點
      </h1>
    </div>
    <div class="max-width">
      <div v-html="researchFocus?.translations?.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const useResearchFocus = useResearchFocusApi()
const { locale } = useI18n()

const { data: researchFocus, refresh: refreshResearchFocus } = useLazyAsyncData('research-focus', async () => {
  const [err, result] = await to (useResearchFocus.findOne())
  if (err) {
    return Promise.reject(err)
  }
  return result
}, {
  transform: (data) => {
    return {
      ...data?.data,
      translations: data?.data.translations.filter((item) => item.researchFocusLanguages_code === locale.value)[0],
    }
  },
  watch: [locale],
})

useSeoMeta({
  title: '研究重點',
  description: '研究重點',
  keywords: '研究重點',
  ogTitle: '研究重點',
  ogDescription: '研究重點',
})
</script>

<style scoped lang="sass">
</style>
