<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding">
    <div class="max-width flex flex-col gap-1.5rem pt-3rem">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          {{ t('navbar.artificialIntelligenceSeminar') }}
        </h1>
      </div>
      <div class="flex">
        <q-input v-model="keyword" outlined :placeholder="t('search')" dense @keyup.enter="refreshArtificialIntelligence()">
          <template #prepend>
            <q-icon name="search" class="text-16px" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="max-width custom-grid">
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('artificialIntelligenceSeminar.date') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('artificialIntelligenceSeminar.titleOfPaper') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('artificialIntelligenceSeminar.journalOfPaper') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('artificialIntelligenceSeminar.authorOfThePaper') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('artificialIntelligenceSeminar.reporter') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('artificialIntelligenceSeminar.downloads') }}
        </div>
      </div>
      <template v-if="artificialIntelligence?.data.length && artificialIntelligence?.data.length > 0">
        <template
          v-for="item in artificialIntelligence?.data"
          :key="item.id"
        >
          <div>
            {{ item.reportDate }}
          </div>
          <div class="underline cursor-pointer" @click="addDownloadCount('artificialIntelligence', item.id.toString())">
            {{ item.thesisTitle }}
          </div>
          <div>
            {{ item.academicJournal }}
          </div>
          <div>
            {{ item.paperAuthor }}
          </div>
          <div>
            {{ item.reporter }}
          </div>
          <div>
            {{ item.downloadCount }}
          </div>
        </template>
      </template>
      <template v-else>
        <div class="w-full bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem">
          查無結果
        </div>
      </template>
    </div>
    <div class="w-full flex flex-col gap-1.5rem xl:hidden">
      <artificial-intelligence-mobile-card
        v-for="item in artificialIntelligence?.data"
        :key="item.id"
        :data="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArtificialIntelligenceMobileCard from '~/components/artificial-intelligence/artificial-intelligence-mobile-card.vue'

const { locale, t } = useI18n()

const keyword = ref('')

const useArtificialIntelligence = useArtificialIntelligenceApi()

const { data: artificialIntelligence, refresh: refreshArtificialIntelligence } = useLazyAsyncData('artificial-intelligence', async () => {
  if (keyword.value.length > 0) {
    const [err, result] = await to (useArtificialIntelligence.findList({
      query: {
        'filter[thesisTitle][_contains]': keyword.value,
      },
    }))
    if (err) {
      return Promise.reject(err)
    }
    return result
  }
  else {
    const [err, result] = await to (useArtificialIntelligence.findList())
    if (err) {
      return Promise.reject(err)
    }
    return result
  }
}, {
  watch: [locale],
})

async function addDownloadCount(collection: string, id: string) {
  const [err, result] = await to (useArtificialIntelligence.addDownloadCount({
    collection,
    id,
  }))
  if (err) {
    throw new Error(err.message)
  }
  if (result?.downloadFileId) {
    // console.log('result?.downloadFileId', result?.downloadFileId)
    downloadFile(result?.downloadFileId)
  }
}

const config = useRuntimeConfig()

function downloadFile(fileId: string) {
  const fileUrl = `${config.public.apiBaseUrl}/assets/${fileId}`
  // 建立一個隱藏的 a 標籤，觸發下載
  const a = document.createElement('a')
  a.href = `${fileUrl}?download`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
};

useSeoMeta({
  title: '人工智慧 Seminar',
  description: '人工智慧 Seminar',
  keywords: '人工智慧 Seminar',
  ogTitle: '人工智慧 Seminar',
  ogDescription: '人工智慧 Seminar',
})
</script>

<style scoped lang="sass">
.q-field--outlined
  :deep() .q-field__control
    border-radius: .6rem

.custom-grid
  display: grid
  align-items: center
  justify-self: start
  grid-template-columns: auto 1fr 1fr 1fr auto auto
  gap: 1rem 2.5rem
  align-items: start

@media (max-width: 1279px)
  .custom-grid
    display: none
</style>
