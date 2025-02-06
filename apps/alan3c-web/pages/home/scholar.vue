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
            name: t('home.visitingScholarsPostdoctoralFellow'),
            route: {
              name: 'home-scholar',
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col gap-1.5rem bg-white">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          {{ t('home.visitingScholarsPostdoctoralFellow') }}
        </h1>
      </div>
    </div>
    <div class="max-width flex flex-col gap-2rem">
      <template v-if="!isLoading">
        <scholar-card
          v-for="(item) in scholarList?.originalData?.data" :key="item.id"
          :data="item"
        />
      </template>
      <template v-else>
        <div class="max-width flex items-center justify-center h-300px relative">
          <q-inner-loading :showing="isLoading" />
        </div>
      </template>
      <div class="flex justify-center pt-3rem">
        <q-pagination
          v-if="listMeta"
          v-model="currentPage"
          color="primary"
          :max="listMeta"
          flat
          direction-links
        />
      </div>
      <!-- <div
        v-for="scholar in scholarList" :key="scholar.id"
        class="flex gap-1rem"
      >
        <div class="w-10rem aspect-3/4 border overflow-hidden relative">
          <nuxt-img
            :src="combineImageUrl(scholar.mainImage.filename_disk)"
            class="w-full absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]"
          />
        </div>
        <div class="px-1.5rem border bg-[#fdfdfd] flex-1 flex flex-col gap-1rem justify-center rounded-.7rem">
          <div class="flex w-full">
            <div class="flex flex-col flex-1 items-start gap-1rem">
              <div class="font-semibold text-lg">
                {{ scholar.translations?.name }}
              </div>
              <div class="flex flex-col gap-.4rem items-start">
                <div class="bg-accent px-1rem py-.1rem rounded-.7rem font-medium">
                  來自 | {{ scholar.translations?.comeFrom }}
                </div>
                <div class="bg-accent px-1rem py-.1rem rounded-.7rem font-medium">
                  專長 | {{ scholar.translations?.expertise }}
                </div>
              </div>
            </div>
            <div class="font-medium">
              期間：{{ scholar.startAt }} 至 {{ scholar.endAt }}
            </div>
          </div>
          <q-separator class="mt-.5rem" />
          <div class="font-medium">
            E-Mail | {{ scholar.email }}
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import ScholarCard from '../../components/scholar/scholar-card.vue'

const { locale, t } = useI18n()

const useScholar = useScholarApi()

const isLoading = ref(false)
const limit = ref(15)
const currentPage = ref(1)
const offset = computed(() => (currentPage.value - 1) * limit.value)

const { data: scholarList, refresh: refreshScholar } = useLazyAsyncData('scholar', async () => {
  isLoading.value = true
  const [err, result] = await to (useScholar.findList({
    query: {
      limit: `${limit.value}`,
      offset: `${offset.value}`,
    },
  }))
  if (err) {
    isLoading.value = false
    return Promise.reject(err)
  }
  isLoading.value = false
  return result
}, {
  transform: (data) => {
    return {
      transformedData: data?.data.map((scholar) => {
        return {
          ...scholar,
          translations: scholar.translations.find((item) => item.scholarLanguages_code === locale.value),
        }
      }),
      originalData: data,
    }
  },
  watch: [locale, currentPage],
})

const listMeta = computed(() => {
  if (scholarList.value?.originalData?.meta.filter_count && typeof Number.parseInt(scholarList.value?.originalData?.meta.filter_count) === 'number') {
    if (Number.parseInt(scholarList.value?.originalData?.meta.filter_count) / limit.value < 1) {
      return 1
    }
    return Math.ceil(Number.parseInt(scholarList.value?.originalData?.meta.filter_count) / limit.value)
  }
  return undefined
})

useSeoMeta({
  title: '訪問學者-博士後研究員',
  description: '訪問學者-博士後研究員',
  keywords: '訪問學者-博士後研究員',
  ogTitle: '訪問學者-博士後研究員',
  ogDescription: '訪問學者-博士後研究員',
})
</script>

<style scoped lang="sass">
</style>
