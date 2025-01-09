<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        研究計畫
      </h1>
    </div>
    <div class="w-full custom-grid">
      <div>
        計畫名稱
      </div>
      <div>
        期間
      </div>
      <div>
        贊助單位
      </div>
      <div>
        編號
      </div>
      <template
        v-for="(item, index) in researchPlan?.transformData"
        :key="index"
      >
        <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
          {{ item.translations.name }}
        </div>
        <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
          {{ item.startDate }} - {{ item.endDate }}
        </div>
        <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
          {{ item.translations.sponsor }}
        </div>
        <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
          {{ item.referenceNumber }}
        </div>
      </template>
    </div>
    <!-- <div class="max-width flex-col gap-1rem lg:!flex hidden">
      <div class="flex py-.4rem font-medium tracking-.05rem">
        <div class="w-250px">
          計畫名稱
        </div>
        <div class="w-250px">
          期間
        </div>
        <div class="w-250px">
          贊助單位
        </div>
        <div class="w-200px">
          編號
        </div>
      </div>
      <div class="flex flex-col gap-.8rem tracking-.02rem">
        <div
          v-for="(item, index) in researchPlan?.transformData"
          :key="index"
          class="flex border"
        >
          <div class="w-250px flex">
            <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
              {{ item.translations.name }}
            </div>
          </div>
          <div class="w-250px flex">
            <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
              {{ item.startDate }} - {{ item.endDate }}
            </div>
          </div>
          <div class="w-250px flex">
            <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
              {{ item.translations.sponsor }}
            </div>
          </div>
          <div class="w-200px flex">
            <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
              {{ item.referenceNumber }}
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="flex lg:hidden">
      <research-plan-mobile-card
        v-for="(item, index) in researchPlan?.originData?.data"
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
      originData: data,
      transformData: result,
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
  grid-template-columns: repeat(4, auto)
  gap: .4rem 1rem

@media (max-width: 1024px)
  .custom-grid
    display: none
</style>
