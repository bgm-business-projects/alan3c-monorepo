<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        研究計畫
      </h1>
    </div>
    <div class="max-width custom-grid">
      <div class="font-medium text-lg">
        計畫名稱
      </div>
      <div class="font-medium text-lg">
        期間
      </div>
      <div class="font-medium text-lg">
        贊助單位
      </div>
      <div class="font-medium text-lg">
        編號
      </div>
      <template
        v-for="(item, index) in researchPlan?.transformedData"
        :key="index"
      >
        <div class="flex">
          <div class="bg-accent px-1.5rem py-.4rem rounded-.4rem">
            {{ item.translations.name }}
          </div>
        </div>
        <div class="flex">
          <div class="bg-accent px-1.5rem py-.4rem rounded-.4rem">
            {{ item.startDate }} - {{ item.endDate }}
          </div>
        </div>
        <div class="flex">
          <div class="bg-accent px-1.5rem py-.4rem rounded-.4rem">
            {{ item.translations.sponsor }}
          </div>
        </div>
        <div class="flex">
          <div class="bg-accent px-1.5rem py-.4rem rounded-.4rem">
            {{ item.referenceNumber }}
          </div>
        </div>
      </template>
    </div>
    <div class="flex lg:hidden w-full">
      <research-plan-mobile-card
        v-for="(item, index) in researchPlan?.originalData?.data"
        :key="index"
        :data="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResearchPlanMobileCard from '~/components/research-plan/research-plan-mobile-card.vue'
import { useResearchPlanApi } from '../../composables/use-research-plan-api'

const useResearchPlan = useResearchPlanApi()
const { locale } = useI18n()

const { data: researchPlan, refresh: refreshResearchPlan } = useLazyAsyncData('research-plan', async () => {
  const [err, result] = await to (useResearchPlan.findList())
  if (err) {
    return Promise.reject(err)
  }
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
  watch: [locale],
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
