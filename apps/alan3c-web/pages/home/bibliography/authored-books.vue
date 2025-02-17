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
            name: t('home.bibliography'),
            route: {
              name: 'home-bibliography',
            },
          },
          {
            name: t('bibliography.authoredBooks'),
            route: {
              name: 'home-bibliography-authored-books',
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('bibliography.authoredBooks') }}
      </h1>
    </div>
    <div class="max-width flex flex-col gap-1rem">
      <template v-if="!isLoading">
        <template v-if="!bibliography">
          <div
            class="max-width bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem font-medium text-lg text-#666"
            :class="locale === 'zh' ? ['tracking-.1rem']
              : locale === 'en' ? ['tracking-.05rem']
                : []"
          >
            {{ t('notFound') }}
          </div>
        </template>
        <template v-else>
          <div class="w-full flex flex-col gap-2rem items-start">
            <list-card v-for="(item, index) in bibliography" :key="index" :data="item" />
          </div>
          <!-- <base-wysiwyg-preview class="w-full" :html-code="bibliography.content" /> -->
        </template>
      </template>
      <template v-else>
        <div class="max-width flex items-center justify-center h-300px relative">
          <q-inner-loading :showing="isLoading" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListCard from '../../../components/authored-books/list-card.vue'

const { locale, t } = useI18n()

const useBibliography = useBibliographyApi()

const isLoading = ref(false)

const { data: bibliography, refresh: refreshBibliography } = useLazyAsyncData('bibliography-authored-books', async () => {
  isLoading.value = true
  const [err, result] = await to (useBibliography.findAuthoredBooks({
    query: {},
  }))
  if (err) {
    isLoading.value = false
    return Promise.reject(err)
  }
  isLoading.value = false
  return result
}, {
  transform: (data) => {
    return data?.data.map((item) => {
      return {
        ...item,
        translations: item.translations.filter((translation) => translation.authoredBooksLanguages_code === locale.value)[0],
      }
    })
  },
  watch: [locale],
})

useSeoMeta({
  title: t('bibliography.authoredBooks'),
  description: t('bibliography.authoredBooks'),
  keywords: t('bibliography.authoredBooks'),
  ogTitle: t('bibliography.authoredBooks'),
  ogDescription: t('bibliography.authoredBooks'),
})
</script>

<style scoped lang="sass">
</style>
