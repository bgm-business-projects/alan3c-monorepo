<template>
  <div class="w-full flex flex-col gap-1rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('navbar.researchFocus') }}
      </h1>
    </div>
    <div class="max-width">
      <div
        v-if="researchFocus?.translations?.content"
        v-html="researchFocus?.translations?.content"
      />
      <div
        v-else
        class="w-full bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem font-medium text-lg text-#666"
        :class="locale === 'zh' ? ['tracking-.1rem']
          : locale === 'en' ? ['tracking-.05rem']
            : []"
      >
        {{ t('notFound') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const useResearchFocus = useResearchFocusApi()
const { locale, t } = useI18n()

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
