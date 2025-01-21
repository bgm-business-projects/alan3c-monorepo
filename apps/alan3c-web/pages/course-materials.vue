<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding">
    <div class="max-width flex flex-col gap-1.5rem pt-1.5rem lg:pt-3rem">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          {{ t('navbar.courseMaterials') }}
        </h1>
      </div>
      <div class="flex">
        <q-input v-model="keyword" outlined :placeholder="t('search')" dense @keyup.enter="refreshCourseMaterials()">
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
          {{ t('courseMaterials.date') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('courseMaterials.title') }}
        </div>
      </div>
      <div class="flex items-center gap-.5rem">
        <div class="w-6px h-6px bg-primary rounded-full" />
        <div class="tracking-1px text-lg font-medium">
          {{ t('courseMaterials.downloads') }}
        </div>
      </div>
      <template v-if="!isLoading">
        <template v-if="courseMaterials?.data.length && courseMaterials?.data.length > 0">
          <template
            v-for="item in courseMaterials?.data"
            :key="item.id"
          >
            <div>
              {{ item.uploadDate }}
            </div>
            <div class="underline cursor-pointer" @click="addDownloadCount('courseMaterials', item.id.toString())">
              {{ item.documentTitle }}
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
      <template v-if="!courseMaterials?.data.length || courseMaterials?.data.length === 0">
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
        <course-materials-mobile-card
          v-for="item in courseMaterials?.data"
          :key="item.id"
          :data="item"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import CourseMaterialsMobileCard from '~/components/course-materials/course-materials-mobile-card.vue'

const { locale, t } = useI18n()

const keyword = ref('')

const useCourseMaterials = useCourseMaterialsApi()

const isLoading = ref(false)
const { data: courseMaterials, refresh: refreshCourseMaterials } = useLazyAsyncData('course-materials', async () => {
  isLoading.value = true
  if (keyword.value.length > 0) {
    const [err, result] = await to (useCourseMaterials.findList({
      query: {
        'filter[documentTitle][_icontains]': keyword.value,
      },
    }))
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return result
  }
  else {
    const [err, result] = await to (useCourseMaterials.findList())
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return result
  }
}, {
  watch: [locale],
})

async function addDownloadCount(collection: string, id: string) {
  const [err, result] = await to (useCourseMaterials.addDownloadCount({
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
  title: '課程教材',
  description: '課程教材',
  keywords: '課程教材',
  ogTitle: '課程教材',
  ogDescription: '課程教材',
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
