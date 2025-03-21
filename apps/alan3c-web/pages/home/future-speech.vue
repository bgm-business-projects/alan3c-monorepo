<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-1.5rem lg:py-3rem">
    <div class="flex max-width">
      <base-breadcrumbs
        :bread-list="[
          {
            name: '老闆的家',
            route: {
              name: 'home',
            },
          },
          {
            name: '未來演講',
            route: {
              name: 'home-future-speech',
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col gap-4rem">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          未來演講
        </h1>
        <div class="w-full custom-grid">
          <div class="text-lg font-medium">
            編號
            <!-- {{ t('futureSpeech.grantNumber') }} -->
          </div>
          <div class="text-lg font-medium">
            演講題目
            <!-- {{ t('futureSpeech.projectTitle') }} -->
          </div>
          <div class="text-lg font-medium">
            日期
            <!-- {{ t('futureSpeech.date') }} -->
          </div>
          <div class="text-lg font-medium">
            地點
            <!-- {{ t('futureSpeech.location') }} -->
          </div>
          <template v-if="!isLoading">
            <template
              v-for="(item, index) in futureSpeech?.data.transformedData"
              :key="index"
            >
              <template v-if="item.translations.name && item.translations.location">
                <div class="flex">
                  <div>
                    {{ Number(index) + 1 }}
                  </div>
                </div>
                <div class="flex">
                  <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
                    {{ item.translations.name }}
                  </div>
                </div>
                <div class="flex">
                  <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
                    {{ dayjs(item.lectureDate.toString(), 'YYYYMMDD').format('YYYY-MM-DD') }}
                  </div>
                </div>
                <div class="flex">
                  <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
                    {{ item.translations.location }}
                  </div>
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
          <template
            v-if="!futureSpeech?.data.transformedData || !futureSpeech?.data.transformedData?.every(item => item.translations.name && item.translations.location)"
          >
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
            <academic-lecture-record-mobile-card
              v-for="(item, index) in futureSpeech?.data.originalData?.data"
              :key="index"
              :index="index + 1"
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
      <div class="w-full flex flex-col gap-2rem">
        <h2 class="text-2xl font-bold text-primary">
          學術榮譽
        </h2>
        <base-quotes :content="futureSpeech?.data.honorsData?.data.content" />
      </div>
      <div class="w-full flex flex-col gap-2rem">
        <h2 class="text-2xl font-bold text-primary">
          雨露長纖草，山苗高入雲 － 張語錄
        </h2>
        <base-quotes :content="futureSpeech?.data.quotesData?.data.content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AcademicLectureRecordMobileCard from '~/components/academic-lecture-record/academic-lecture-record-mobile-card.vue'
import BaseQuotes from '~/components/future-speech/base-quotes.vue'
import { useFutureSpeechApi } from '../../composables/use-future-speech-api'

const dayjs = useDayjs()

const useFutureSpeech = useFutureSpeechApi()
const { locale, t } = useI18n()

const isLoading = ref(false)
const limit = ref(15)
const currentPage = ref(1)
const offset = computed(() => (currentPage.value - 1) * limit.value)

const { data: futureSpeech, refresh: refreshFutureSpeech } = useLazyAsyncData('future-speech', async () => {
  isLoading.value = true
  try {
    // 使用 Promise.all 同時發送三個請求
    const [listResult, quotesResult, honorsResult] = await Promise.all([
      useFutureSpeech.findList({
        query: {
          limit: `${limit.value}`,
          offset: `${offset.value}`,
        },
      }),
      useFutureSpeech.findQuotes(),
      useFutureSpeech.findAcademicHonors(),
    ])

    isLoading.value = false

    return {
      list: listResult,
      quotes: quotesResult,
      honors: honorsResult,
    }
  }
  catch (error) {
    isLoading.value = false
    return Promise.reject(error)
  }
}, {
  transform: (data) => {
    const transformedList = data?.list?.data.map((item) => {
      return {
        ...item,
        translations: item.translations.filter((item) => item.academicLectureRecordLanguages_code === locale.value)[0],
      }
    })

    return {
      data: {
        transformedData: transformedList,
        originalData: data.list,
        quotesData: data.quotes,
        honorsData: data.honors,
      },
    }
  },
  watch: [locale, currentPage],
})

const listMeta = computed(() => {
  if (futureSpeech.value?.data.originalData?.meta.filter_count && typeof Number.parseInt(futureSpeech.value?.data.originalData.meta.filter_count) === 'number') {
    if (Number.parseInt(futureSpeech.value?.data.originalData.meta.filter_count) / limit.value < 1) {
      return 1
    }
    return Math.ceil(Number.parseInt(futureSpeech.value?.data.originalData.meta.filter_count) / limit.value)
  }
  return undefined
})

useSeoMeta({
  title: '未來演講',
  description: '未來演講',
  keywords: '未來演講',
  ogTitle: '未來演講',
  ogDescription: '未來演講',
})
</script>

<style scoped lang="sass">
.custom-grid
  display: grid
  align-items: center
  grid-template-columns: auto 1fr auto 1fr
  gap: 1rem 2.5rem
  align-items: start

@media (max-width: 1279px)
  .custom-grid
    display: none
</style>
