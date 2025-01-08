<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding">
    <div class="max-width flex flex-col gap-1.5rem bg-white fixed pt-3rem">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          圖像處理 Seminar
        </h1>
      </div>
      <div class="flex">
        <q-input v-model="keyword" outlined placeholder="搜尋" dense>
          <template #prepend>
            <q-icon name="search" class="text-16px" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="max-width flex flex-col gap-2rem pt-10rem pb-1rem">
      <div class="flex w-full gap-1rem">
        <div class="w-10rem">
          報告日期
        </div>
        <div class="w-15rem">
          論文標題
        </div>
        <div class="w-13rem">
          論文期刊
        </div>
        <div class="w-12rem">
          論文作者
        </div>
        <div class="w-10rem">
          報告者
        </div>
        <div class="w-10rem">
          下載次數
        </div>
      </div>
      <div class="w-full">
        <div
          v-for="item in imageProcessing?.data"
          :key="item.id"
          class="flex w-full gap-1rem"
        >
          <div class="w-10rem border">
            {{ item.reportDate }}
          </div>
          <div class="w-15rem border underline cursor-pointer" @click="addDownloadCount('imageProcessing', item.id.toString())">
            {{ item.thesisTitle }}
          </div>
          <div class="w-13rem border">
            {{ item.academicJournal }}
          </div>
          <div class="w-12rem border">
            {{ item.paperAuthor }}
          </div>
          <div class="w-10rem border">
            {{ item.reporter }}
          </div>
          <div class="w-10rem border">
            {{ item.downloadCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const keyword = ref('')

const localePath = useLocalePath()
const route = useRoute()

const useImageProcessing = useImageProcessingApi()

const { data: imageProcessing, refresh: refreshImageProcessing } = useLazyAsyncData('image-processing', async () => {
  const [err, result] = await to (useImageProcessing.findList())
  if (err) {
    return Promise.reject(err)
  }
  return result
}, {
  watch: [locale],
})

async function addDownloadCount(collection: string, id: string) {
  const [err, result] = await to (useImageProcessing.addDownloadCount({
    collection,
    id,
  }))
  if (err) {
    throw new Error(err.message)
  }
  // if (result?.downloadFileId) {
  //   downloadFile(result?.downloadFileId)
  // }
  return result
}

const config = useRuntimeConfig()

function downloadFile(fileId: string) {
  const fileUrl = `${config.public.apiBaseUrl}/assets/${fileId}`

  // 建立一個隱藏的 a 標籤，觸發下載
  const a = document.createElement('a')
  a.href = fileUrl
  a.download = '' // 瀏覽器會自動處理檔名
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
</script>

<style scoped lang="sass">
.q-field--outlined
  :deep() .q-field__control
    border-radius: .6rem
.test
  background: #000
</style>
