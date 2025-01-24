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
            name: t(`bibliography.${route.params.id}`),
            route: {
              name: 'home-bibliography-id',
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
        {{ t(`bibliography.${route.params.id}`) }}
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
          <base-wysiwyg-preview class="w-full" :html-code="bibliography.content" />
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
import { pipe } from 'remeda'
import BaseWysiwygPreview from '~/components/wysiwyg-preview/base-wysiwyg-preview.vue'
import { isBookChapters, isDomesticMagazineArticles, isGuestEditorial, isInternationalConferencePapers, isLocalConferencePapers, isLocalJournalPapers, isTechnicalReports } from '~/contract/bibliography/bibliography.type'

const { locale, t } = useI18n()

const useBibliography = useBibliographyApi()

const route = useRoute()

const localePath = useLocalePath()

const isLoading = ref(false)

const { data: bibliography, refresh: refreshBibliography } = useLazyAsyncData(`bibliography-${route.params.id}`, async () => {
  isLoading.value = true
  const [err, result] = await to (useBibliography.findOne({
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
    if (!data?.data)
      return
    return pipe(
      data?.data,
      (value) => Object.entries(value),
      (value) => value.find((item) => item[0] === route.params.id),
      (value) => value?.[1],
      (value) => {
        // if (isInternationalJournalPapers(value)) {
        //   return value.find((item) => item.internationalJournalPapersLanguages_code === locale.value)
        // }
        if (isInternationalConferencePapers(value)) {
          return value.find((item) => item.internationalConferencePapersLanguages_code === locale.value)
        }
        if (isBookChapters(value)) {
          return value.find((item) => item.bookChaptersLanguages_code === locale.value)
        }
        if (isLocalJournalPapers(value)) {
          return value.find((item) => item.localJournalPapersLanguages_code === locale.value)
        }
        if (isDomesticMagazineArticles(value)) {
          return value.find((item) => item.domesticMagazineArticlesLanguages_code === locale.value)
        }
        if (isTechnicalReports(value)) {
          return value.find((item) => item.technicalReportsLanguages_code === locale.value)
        }
        if (isGuestEditorial(value)) {
          return value.find((item) => item.guestEditorialLanguages_code === locale.value)
        }
        if (isLocalConferencePapers(value)) {
          return value.find((item) => item.localConferencePapersLanguages_code === locale.value)
        }
      },
    )
  },
  watch: [locale],
})

useSeoMeta({
  title: t(`bibliography.${route.params.id}`),
  description: t(`bibliography.${route.params.id}`),
  keywords: t(`bibliography.${route.params.id}`),
  ogTitle: t(`bibliography.${route.params.id}`),
  ogDescription: t(`bibliography.${route.params.id}`),
})
</script>

<style scoped lang="sass">
</style>
