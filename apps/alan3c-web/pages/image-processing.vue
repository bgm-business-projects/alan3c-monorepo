<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding">
    <div class="max-width flex flex-col gap-1.5rem pt-1.5rem lg:pt-3rem">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          {{ t('navbar.imageProcessingSeminar') }}
        </h1>
      </div>
      <div class="flex">
        <q-input v-model="keyword" outlined :placeholder="t('search')" dense @keyup.enter="refreshImageProcessing()">
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
          {{ t('imageProcessingSeminar.date') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('imageProcessingSeminar.titleOfPaper') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('imageProcessingSeminar.journalOfPaper') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('imageProcessingSeminar.authorOfThePaper') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('imageProcessingSeminar.reporter') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('imageProcessingSeminar.file') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('imageProcessingSeminar.video') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('imageProcessingSeminar.downloads') }}
        </div>
      </div>
      <template v-if="!isLoading">
        <template v-if="imageProcessing?.data.length && imageProcessing?.data.length > 0">
          <template
            v-for="item in imageProcessing?.data"
            :key="item.id"
          >
            <div>
              {{ item.reportDate }}
            </div>
            <div>
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
            <div class="underline cursor-pointer" @click="addDownloadCount('imageProcessing', item.id.toString())">
              {{ item.file?.title }}
            </div>
            <div class="underline cursor-pointer" @click="openVideoDialog(combineImageUrl(item.video?.filename_disk))">
              {{ item.video?.title }}
            </div>
            <div>
              {{ item.downloadCount }}
            </div>
          </template>
        </template>
      </template>
    </div>
    <template v-if="isLoading">
      <div class="max-width flex items-center justify-center h-300px relative">
        <q-inner-loading :showing="isLoading" />
      </div>
    </template>
    <template v-else>
      <template v-if="!imageProcessing?.data.length || imageProcessing?.data.length === 0">
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
        <image-processing-mobile-card
          v-for="item in imageProcessing?.data"
          :key="item.id"
          :data="item"
        />
      </div>
    </template>

    <div class="flex justify-center pt-1rem">
      <q-pagination
        v-if="listMeta"
        v-model="currentPage"
        color="primary"
        :max="listMeta"
        flat
        direction-links
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseVideoDialog from '~/components/base-video-dialog.vue'
import ImageProcessingMobileCard from '~/components/image-processing/image-processing-mobile-card.vue'
import { combineImageUrl } from '../utils/combine-image-url'

const { locale, t } = useI18n()

const keyword = ref('')

const useImageProcessing = useImageProcessingApi()

const isLoading = ref(false)

const limit = ref(15)
const currentPage = ref(1)
const offset = computed(() => (currentPage.value - 1) * limit.value)

const { data: imageProcessing, refresh: refreshImageProcessing } = useLazyAsyncData('image-processing', async () => {
  isLoading.value = true
  const [err, result] = await to (useImageProcessing.findList({
    query: {
      'filter[thesisTitle][_icontains]': keyword.value ? keyword.value : undefined,
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
}, {
  watch: [locale, currentPage],
})

const listMeta = computed(() => {
  if (imageProcessing.value?.meta.filter_count && typeof Number.parseInt(imageProcessing.value?.meta.filter_count) === 'number') {
    if (Number.parseInt(imageProcessing.value?.meta.filter_count) / limit.value < 1) {
      return 1
    }
    return Math.ceil(Number.parseInt(imageProcessing.value?.meta.filter_count) / limit.value)
  }
  return undefined
})

async function addDownloadCount(collection: string, id: string) {
  const [err, result] = await to (useImageProcessing.addDownloadCount({
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
  title: '圖像處理 Seminar',
  description: '圖像處理 Seminar',
  keywords: '圖像處理 Seminar',
  ogTitle: '圖像處理 Seminar',
  ogDescription: '圖像處理 Seminar',
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
  grid-template-columns: auto 1fr 1fr 1fr 1fr 1fr 1fr auto
  gap: 1rem 2.5rem
  align-items: start

@media (max-width: 1279px)
  .custom-grid
    display: none
</style>
