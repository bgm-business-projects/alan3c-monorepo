<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-3rem">
    <div class="flex max-width">
      <base-breadcrumbs
        :bread-list="[
          {
            name: t('navbar.home'),
            route: {
              name: 'home',
            },
          },
          {
            name: t('home.theCollectedWorksOfChinChen'),
            route: {
              name: 'home-compilation',
            },
          },
          {
            name: route.params.id as string,
            route: {
              name: 'home-compilation-id',
              params: {
                id: route.params.id as string,
              },
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ compilation?.title }}
      </h1>
    </div>
    <div class="max-width flex flex-col gap-1rem">
      <div v-html="compilation?.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()

const localePath = useLocalePath()

const useCompilation = useCompilationApi()

const route = useRoute()

const { data: compilation, refresh: refreshCompilation } = useLazyAsyncData('compilation-single', async () => {
  const [err, result] = await to (useCompilation.findOne({
    query: {
      'filter[translations][compilationLanguages_code][_eq]': locale.value as 'zh' | 'en',
      'filter[translations][title][_eq]': route.params.id as string,
    },
  }))
  if (err) {
    return Promise.reject(err)
  }
  return result
}, {
  transform: (data) => {
    return data?.data[0].translations.find((item) => item.compilationLanguages_code === locale.value)
  },
  watch: [locale],
})

useSeoMeta({
  title: '真誠文集',
  description: '真誠文集',
  keywords: '真誠文集',
  ogTitle: '真誠文集',
  ogDescription: '真誠文集',
})
</script>

<style scoped lang="sass">
</style>
