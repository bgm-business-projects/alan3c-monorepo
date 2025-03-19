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
    <template v-if="!isLoading">
      <div class="max-width flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          {{ compilation?.title }}
        </h1>
      </div>
      <div class="max-width flex flex-col gap-1rem">
        <base-wysiwyg-preview
          :html-code="compilation?.content"
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
import { isEmpty } from 'lodash-es'
import BaseWysiwygPreview from '~/components/wysiwyg-preview/base-wysiwyg-preview.vue'

const { locale, t } = useI18n()

const useCompilation = useCompilationApi()

const route = useRoute()

const isLoading = ref(false)

const { data: compilation, refresh: refreshCompilation } = await useAsyncData('compilation-single', async () => {
  isLoading.value = true
  const [err, result] = await to (useCompilation.findOne({
    query: {
      'filter[translations][compilationLanguages_code][_eq]': locale.value as 'zh' | 'en',
      'filter[translations][compilation_id][_eq]': route.query.id as string,
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
    return data?.data[0].translations.find((item) => item.compilationLanguages_code === locale.value)
  },
  watch: [locale],
})

if (isEmpty(compilation.value) || !compilation.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Data Not Found',
  })
}

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
