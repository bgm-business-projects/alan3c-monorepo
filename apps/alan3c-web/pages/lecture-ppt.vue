<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding">
    <div class="max-width flex flex-col gap-1.5rem pt-1.5rem lg:pt-3rem">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          {{ t('navbar.lecturePPT') }}
        </h1>
      </div>
      <div class="flex">
        <q-input v-model="keyword" outlined placeholder="搜尋" dense @keyup.enter="refreshLecturePpt()">
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
          {{ t('lecturePPT.date') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('lecturePPT.title') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('lecturePPT.downloads') }}
        </div>
      </div>
      <template v-if="!isLoading">
        <template v-if="lecturePpt?.data.length && lecturePpt?.data.length > 0">
          <template
            v-for="item in lecturePpt?.data"
            :key="item.id"
          >
            <div>
              {{ item.uploadDate }}
            </div>
            <div class="underline cursor-pointer" @click="addDownloadCount('lecturePPT', item.id.toString())">
              {{ item.lectureTitle }}
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
      <template v-if="!lecturePpt?.data.length || lecturePpt?.data.length === 0">
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
        <lecture-ppt-mobile-card
          v-for="item in lecturePpt?.data"
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
    <!-- <div class="max-width flex flex-col gap-1.2rem">
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
        <template v-if="lecturePpt?.data.length && lecturePpt?.data.length > 0">
          <div
            v-for="item in lecturePpt?.data"
            :key="item.id"
            class="flex w-full gap-1rem font-medium"
          >
            <div class="w-10rem">
              {{ item.uploadDate }}
            </div>
            <div class="w-15rem underline cursor-pointer" @click="addDownloadCount('lecturePPT', item.id.toString())">
              {{ item.lectureTitle }}
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
    </div> -->
  </div>
</template>

<script setup lang="ts">
import LecturePptMobileCard from '~/components/lecture-ppt/lecture-ppt-mobile-card.vue'

const { locale, t } = useI18n()

const keyword = ref('')

const useLecturePpt = useLecturePptApi()

const isLoading = ref(false)

const limit = ref(15)
const currentPage = ref(1)
const offset = computed(() => (currentPage.value - 1) * limit.value)

const { data: lecturePpt, refresh: refreshLecturePpt } = useLazyAsyncData('lecture-ppt', async () => {
  isLoading.value = true
  const [err, result] = await to (useLecturePpt.findList({
    query: {
      'filter[lectureTitle][_icontains]': keyword.value ? keyword.value : undefined,
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
  if (lecturePpt.value?.meta.filter_count && typeof Number.parseInt(lecturePpt.value?.meta.filter_count) === 'number') {
    if (Number.parseInt(lecturePpt.value?.meta.filter_count) / limit.value < 1) {
      return 1
    }
    return Math.ceil(Number.parseInt(lecturePpt.value?.meta.filter_count) / limit.value)
  }
  return undefined
})

async function addDownloadCount(collection: string, id: string) {
  const [err, result] = await to (useLecturePpt.addDownloadCount({
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
  title: '演講PPT',
  description: '演講PPT',
  keywords: '演講PPT',
  ogTitle: '演講PPT',
  ogDescription: '演講PPT',
})
</script>

<style scoped lang="sass">
.q-field--outlined
  :deep() .q-field__control
    border-radius: .6rem

.custom-grid
  display: grid
  align-items: center
  grid-template-columns: auto 1fr auto
  gap: 1rem 2.5rem
  align-items: start

@media (max-width: 1279px)
  .custom-grid
    display: none
</style>
