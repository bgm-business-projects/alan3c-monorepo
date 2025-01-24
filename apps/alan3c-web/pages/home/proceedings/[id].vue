<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-1.5rem lg:py-3rem">
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
            name: t('home.passingTheTorchACollectionOfLiteraryMinds'),
            route: {
              name: 'home-proceedings',
            },
          },
          {
            name: route.params.id as string,
            route: {
              name: 'home-proceedings-id',
              params: {
                id: route.params.id as string,
              },
            },
          },
        ]"
      />
    </div>
    <template v-if="!isLoading">
      <div class="max-width flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          {{ proceedings?.title }}
        </h1>
      </div>
      <div class="max-width flex flex-col gap-1rem">
        <base-wysiwyg-preview
          :html-code="proceedings?.content"
        />
      </div>
    </template>
    <template v-else>
      <div class="max-width flex items-center justify-center h-300px relative">
        <q-inner-loading :showing="isLoading" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import BaseWysiwygPreview from '~/components/wysiwyg-preview/base-wysiwyg-preview.vue'

const { locale, t } = useI18n()

const localePath = useLocalePath()

const useProceedings = useProceedingsApi()

const route = useRoute()

const isLoading = ref(false)

const { data: proceedings, refresh: refreshProceedings } = useLazyAsyncData('proceedings-single', async () => {
  isLoading.value = true
  const [err, result] = await to (useProceedings.findOne({
    query: {
      'filter[translations][proceedingsLanguages_code][_eq]': locale.value as 'zh' | 'en',
      'filter[translations][title][_eq]': route.params.id as string,
    },
  }))
  if (err) {
    isLoading.value = false
    return Promise.reject(err)
  }
  isLoading.value = false
  return result
}, {
  transform: (data) => {
    return data?.data[0].translations.find((item) => item.proceedingsLanguages_code === locale.value)
  },
  watch: [locale],
})

useSeoMeta({
  title: '薪火相傳。文心薈萃文集',
  description: '薪火相傳。文心薈萃文集',
  keywords: '薪火相傳。文心薈萃文集',
  ogTitle: '薪火相傳。文心薈萃文集',
  ogDescription: '薪火相傳。文心薈萃文集',
})
</script>

<style scoped lang="sass">
</style>
