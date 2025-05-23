<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding">
    <div class="max-width flex flex-col gap-1.5rem pt-1.5rem lg:pt-3rem">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          {{ t('navbar.referenceDocuments') }}
        </h1>
      </div>
      <div class="flex">
        <q-input v-model="keyword" outlined :placeholder="t('search')" dense @keyup.enter="refreshReferenceDocument()">
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
          {{ t('referenceDocuments.date') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('referenceDocuments.title') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('referenceDocuments.file') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('referenceDocuments.video') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('referenceDocuments.downloads') }}
        </div>
      </div>
      <template v-if="referenceDocument?.data.length && referenceDocument?.data.length > 0">
        <template
          v-for="item in referenceDocument?.data"
          :key="item.id"
        >
          <div>
            {{ item.uploadDate }}
          </div>
          <div>
            {{ item.documentTitle }}
          </div>
          <div class="underline cursor-pointer" @click="addDownloadCount('referenceDocument', item.id.toString())">
            {{ item.file.title }}
          </div>
          <div class="underline cursor-pointer" @click="openVideoDialog(combineImageUrl(item.video?.filename_disk))">
            {{ item.video?.title }}
          </div>
          <div>
            {{ item.downloadCount }}
          </div>
        </template>
      </template>
    </div>
    <template v-if="isLoading">
      <div class="max-width flex items-center justify-center h-300px relative">
        <q-inner-loading :showing="isLoading" />
      </div>
    </template>
    <template v-else>
      <template v-if="!referenceDocument?.data.length || referenceDocument?.data.length === 0">
        <div
          class="max-width bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem font-medium text-lg text-#666"
          :class="locale === 'zh' ? ['tracking-.1rem']
            : locale === 'en' ? ['tracking-.05rem']
              : []"
        >
          {{ t('notFound') }}
        </div>
      </template>
      <div class="w-full flex flex-col gap-1.5rem xl:hidden">
        <reference-document-mobile-card
          v-for="item in referenceDocument?.data"
          :key="item.id"
          :data="item"
        />
      </div>
    </template>

    <div class="flex justify-center pt-3rem">
      <q-pagination
        v-if="listMeta"
        v-model="currentPage"
        color="primary"
        :max="listMeta"
        :max-pages="6"
        flat
        direction-links
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseVideoDialog from '~/components/base-video-dialog.vue'
import ReferenceDocumentMobileCard from '../components/reference-document/reference-document-mobile-card.vue'
import { combineImageUrl } from '../utils/combine-image-url'

const { locale, t } = useI18n()

const keyword = ref('')

const useReferenceDocument = useReferenceDocumentApi()

const isLoading = ref(false)

const limit = ref(15)
const currentPage = ref(1)
const offset = computed(() => (currentPage.value - 1) * limit.value)

const { data: referenceDocument, refresh: refreshReferenceDocument } = useLazyAsyncData('reference-document', async () => {
  isLoading.value = true
  const [err, result] = await to (useReferenceDocument.findList({
    query: {
      'filter[documentTitle][_icontains]': keyword.value ? keyword.value : undefined,
      'limit': `${limit.value}`,
      'offset': `${offset.value}`,
    },
  }))
  if (err) {
    isLoading.value = false
    return Promise.reject(err)
  }
  isLoading.value = false
  return result

  // if (keyword.value.length > 0) {
  //   const [err, result] = await to (useReferenceDocument.findList({
  //     query: {
  //       'filter[documentTitle][_contains]': keyword.value,
  //     },
  //   }))
  //   if (err) {
  //     isLoading.value = false
  //     return Promise.reject(err)
  //   }
  //   isLoading.value = false
  //   return result
  // }
  // else {
  //   const [err, result] = await to (useReferenceDocument.findList())
  //   if (err) {
  //     isLoading.value = false
  //     return Promise.reject(err)
  //   }
  //   isLoading.value = false
  //   return result
  // }
}, {
  watch: [locale, currentPage],
})

const listMeta = computed(() => {
  if (referenceDocument.value?.meta.filter_count && typeof Number.parseInt(referenceDocument.value?.meta.filter_count) === 'number') {
    if (Number.parseInt(referenceDocument.value?.meta.filter_count) / limit.value < 1) {
      return 1
    }
    return Math.ceil(Number.parseInt(referenceDocument.value?.meta.filter_count) / limit.value)
  }
  return undefined
})

async function addDownloadCount(collection: string, id: string) {
  const [err, result] = await to (useReferenceDocument.addDownloadCount({
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
  const fileUrl = `${config.public.apiBaseCSRUrl}/assets/${fileId}`
  // 建立一個隱藏的 a 標籤，觸發下載
  const a = document.createElement('a')
  a.href = `${fileUrl}?download`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
};

useSeoMeta({
  title: '參考文件',
  description: '參考文件',
  keywords: '參考文件',
  ogTitle: '參考文件',
  ogDescription: '參考文件',
})

const $q = useQuasar()

function openVideoDialog(src: string) {
  $q.dialog({
    component: BaseVideoDialog,
    componentProps: {
      src,
    },
  })
}
</script>

<style scoped lang="sass">
.q-field--outlined
  :deep() .q-field__control
    border-radius: .6rem

.custom-grid
  display: grid
  align-items: center
  grid-template-columns: auto 1fr 1fr 1fr auto
  gap: 1rem 2.5rem
  align-items: start

@media (max-width: 1279px)
  .custom-grid
    display: none
</style>
