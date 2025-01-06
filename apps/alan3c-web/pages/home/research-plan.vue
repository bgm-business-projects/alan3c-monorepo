<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        研究計畫
      </h1>
    </div>
    <div class="max-width flex flex-col gap-1rem">
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
          v-for="(item, index) in researchPlan?.data"
          :key="index"
          class="flex"
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
    </div>
  </div>
</template>

<script setup lang="ts">
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
      data: result,
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
.test
  background: #000
</style>
