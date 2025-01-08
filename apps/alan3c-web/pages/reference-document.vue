<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding">
    <div class="max-width flex flex-col gap-1.5rem pt-3rem">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          參考文件
        </h1>
      </div>
      <div class="flex">
        <q-input v-model="keyword" outlined placeholder="搜尋" dense @keyup.enter="refreshReferenceDocument()">
          <template #prepend>
            <q-icon name="search" class="text-16px" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="max-width flex flex-col gap-1.2rem">
      <div class="flex w-full gap-1rem text-lg font-semibold">
        <div class="w-10rem flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px">
            上傳日期
          </div>
        </div>
        <div class="w-15rem flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px">
            文件標題
          </div>
        </div>
        <div class="w-10rem flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px">
            下載次數
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col gap-1.5rem">
        <template v-if="referenceDocument?.data.length && referenceDocument?.data.length > 0">
          <div
            v-for="item in referenceDocument?.data"
            :key="item.id"
            class="flex w-full gap-1rem font-medium"
          >
            <div class="w-10rem">
              {{ item.uploadDate }}
            </div>
            <div class="w-15rem underline cursor-pointer" @click="addDownloadCount('referenceDocument', item.id.toString())">
              {{ item.documentTitle }}
            </div>
            <div class="w-10rem">
              {{ item.downloadCount }}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="w-full bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem">
            查無結果
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const keyword = ref('')

const localePath = useLocalePath()
const route = useRoute()

const useReferenceDocument = useReferenceDocumentApi()

const { data: referenceDocument, refresh: refreshReferenceDocument } = useLazyAsyncData('reference-document', async () => {
  if (keyword.value.length > 0) {
    const [err, result] = await to (useReferenceDocument.findList({
      query: {
        'filter[documentTitle][_contains]': keyword.value,
      },
    }))
    if (err) {
      return Promise.reject(err)
    }
    return result
  }
  else {
    const [err, result] = await to (useReferenceDocument.findList())
    if (err) {
      return Promise.reject(err)
    }
    return result
  }
}, {
  watch: [locale],
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
  const fileUrl = `${config.public.apiBaseUrl}/assets/${fileId}`
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
</script>

<style scoped lang="sass">
.q-field--outlined
  :deep() .q-field__control
    border-radius: .6rem
.test
  background: #000
</style>
