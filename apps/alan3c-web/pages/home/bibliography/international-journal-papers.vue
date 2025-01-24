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
            name: t('bibliography.internationalJournalPapers'),
            route: {
              name: 'home-bibliography-international-journal-papers',
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col items-start gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('bibliography.internationalJournalPapers') }}
      </h1>
      <q-btn outline dense label="新增資料" class="border-primary px-1.5rem" />
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
            <div v-for="item, index in bibliography.data" :key="item.id">
              <a v-if="item.file?.filename_disk" :href="combineImageUrl(item.file?.filename_disk)" target="_blank" class="underline text-primary">
                {{ index + 1 }}
              </a>
              <span v-else>
                {{ index + 1 }}
              </span>. {{ item.author }} , ({{ item.year }}) : {{ item.titleOfThePaper }} {{ item.journalName }} {{ item.journalName }}, Vol. {{ item.vol }}, No. {{ item.no }}, {{ item.month }}, {{ item.year }}, pp. {{ item.pp }}
            </div>
          </div>
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
import { combineImageUrl } from '../../../utils/combine-image-url'

const { locale, t } = useI18n()

const useInternationalJournalPapers = useInternationalJournalPapersApi()

const isLoading = ref(false)

const { data: bibliography, refresh: refreshBibliography } = useLazyAsyncData('international-journal-papers', async () => {
  isLoading.value = true
  const [err, result] = await to (useInternationalJournalPapers.findList({
    query: {},
  }))
  if (err) {
    isLoading.value = false
    return Promise.reject(err)
  }
  isLoading.value = false
  return result
})

// const $q = useQuasar()
// function openPasswordDialog() {
//   $q.dialog({
//     component: BaseLoginDialog,
//   })
// }

useSeoMeta({
  title: t('bibliography.internationalJournalPapers'),
  description: t('bibliography.internationalJournalPapers'),
  keywords: t('bibliography.internationalJournalPapers'),
  ogTitle: t('bibliography.internationalJournalPapers'),
  ogDescription: t('bibliography.internationalJournalPapers'),
})
</script>

<style scoped lang="sass">
</style>
