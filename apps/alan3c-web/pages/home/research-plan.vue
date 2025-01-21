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
            name: t('home.researchPlan'),
            route: {
              name: 'home-research-plan',
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('home.researchPlan') }}
      </h1>
    </div>
    <div
      class="max-width custom-grid"
    >
      <div class="font-medium text-lg">
        {{ t('researchPlan.planeName') }}
      </div>
      <div class="font-medium text-lg">
        {{ t('researchPlan.timePeriod') }}
      </div>
      <div class="font-medium text-lg">
        {{ t('researchPlan.sponsor') }}
      </div>
      <div class="font-medium text-lg">
        {{ t('researchPlan.grantNumber') }}
      </div>
      <template v-if="!isLoading">
        <template v-if="researchPlan?.transformedData && researchPlan?.transformedData.length > 0 && !researchPlan?.transformedData.every(item => !item.translations?.name)">
          <template
            v-for="(item, index) in researchPlan?.transformedData"
            :key="index"
          >
            <div class="flex">
              <div class="bg-accent px-1.5rem py-.4rem rounded-.4rem flex-1">
                {{ item.translations?.name }}
              </div>
            </div>
            <div class="flex">
              <div class="bg-accent px-1.5rem py-.4rem rounded-.4rem flex-1">
                {{ item?.startDate }} - {{ item?.endDate }}
              </div>
            </div>
            <div class="flex">
              <div class="bg-accent px-1.5rem py-.4rem rounded-.4rem flex-1">
                {{ item.translations?.sponsor }}
              </div>
            </div>
            <div class="flex">
              <div class="bg-accent px-1.5rem py-.4rem rounded-.4rem flex-1">
                {{ item?.referenceNumber }}
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
      <template v-if="!researchPlan?.transformedData || researchPlan?.transformedData.length === 0 || researchPlan?.transformedData.every(item => !item.translations?.name)">
        <div
          class="max-width bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem font-medium text-lg text-#666"
          :class="locale === 'zh' ? ['tracking-.1rem']
            : locale === 'en' ? ['tracking-.05rem']
              : []"
        >
          {{ t('notFound') }}
        </div>
      </template>
      <div class="flex lg:hidden w-full">
        <template v-if="researchPlan?.transformedData && researchPlan?.transformedData.length > 0 && !researchPlan?.transformedData.every(item => !item.translations?.name)">
          <research-plan-mobile-card
            v-for="(item, index) in researchPlan?.originalData?.data"
            :key="index"
            :data="item"
          />
        </template>
      </div>
      <div class="max-width flex justify-center mt-8">
        <q-pagination
          v-if="listMeta"
          v-model="currentPage"
          color="primary"
          :max="listMeta"
          flat
          direction-links
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import ResearchPlanMobileCard from '~/components/research-plan/research-plan-mobile-card.vue'
import { useResearchPlanApi } from '../../composables/use-research-plan-api'

const useResearchPlan = useResearchPlanApi()
const { locale, t } = useI18n()

const isLoading = ref(false)

const limit = ref(15)
const currentPage = ref(1)
const offset = computed(() => (currentPage.value - 1) * limit.value)

const { data: researchPlan, refresh: refreshResearchPlan } = useLazyAsyncData('research-plan', async () => {
  isLoading.value = true
  const [err, result] = await to (useResearchPlan.findList({
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
    const result = data?.data.map((item) => {
      return {
        ...item,
        translations: item.translations.filter((item) => item.researchPlanLanguages_code === locale.value)[0],
      }
    })
    return {
      originalData: data,
      transformedData: result,
    }
  },
  watch: [locale, currentPage],
})

const listMeta = computed(() => {
  if (researchPlan.value?.originalData?.meta.filter_count && typeof Number.parseInt(researchPlan.value?.originalData.meta.filter_count) === 'number') {
    if (Number.parseInt(researchPlan.value?.originalData.meta.filter_count) / limit.value < 1) {
      return 1
    }
    return Math.ceil(Number.parseInt(researchPlan.value?.originalData.meta.filter_count) / limit.value)
  }
  return undefined
})

useSeoMeta({
  title: '學術演講',
  description: '學術演講',
  keywords: '學術演講',
  ogTitle: '學術演講',
  ogDescription: '學術演講',
})
</script>

<style scoped lang="sass">
.custom-grid
  display: grid
  align-items: center
  justify-content: start
  grid-template-columns: auto auto auto auto
  gap: 1rem 1rem

@media (max-width: 1024px)
  .custom-grid
    display: none
</style>
