<template>
  <div class="w-full flex flex-col gap-3rem lg:gap-8rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        生活點滴
      </h1>
    </div>
    <life-snippets-desktop-entry class="hidden lg:!flex" :life-snippets="lifeSnippets" :life-snippets-main="lifeSnippetsMain" />
    <life-snippets-mobile-entry class="flex lg:!hidden" :life-snippets="lifeSnippets" :life-snippets-main="lifeSnippetsMain" />
  </div>
</template>

<script setup lang="ts">
import type { LifeSnippets } from '~/contract/life-snippets/life-snippets.type'
import LifeSnippetsDesktopEntry from '~/components/life-snippets/life-snippets-desktop-entry.vue'
import LifeSnippetsMobileEntry from '~/components/life-snippets/life-snippets-mobile-entry.vue'

const { locale } = useI18n()
const localePath = useLocalePath()

const useLifeSnippets = useLifeSnippetsApi()
const { data: lifeSnippets, refresh: refreshLifeSnippets } = useLazyAsyncData('life-snippets', async () => {
  const data: LifeSnippets = {
    teacherStudentSnapshots: undefined,
    growthRecord: undefined,
    leisureTime: undefined,
    academicLecture: undefined,
    primeOfLife: undefined,
    administrativeYears: undefined,
  }
  try {
    const [err, result] = await to(Promise.all([
      useLifeSnippets.findTeacherStudentSnapshots().then((res) => {
        if (res) {
          data.teacherStudentSnapshots = res
        }
      }),
      useLifeSnippets.findGrowthRecord().then((res) => {
        if (res) {
          data.growthRecord = res
        }
      }),
      useLifeSnippets.findLeisureTime().then((res) => {
        if (res) {
          data.leisureTime = res
        }
      }),
      useLifeSnippets.findAcademicLecture().then((res) => {
        if (res) {
          data.academicLecture = res
        }
      }),
      useLifeSnippets.findPrimeOfLife().then((res) => {
        if (res) {
          data.primeOfLife = res
        }
      }),
      useLifeSnippets.findAdministrativeYears().then((res) => {
        if (res) {
          data.administrativeYears = res
        }
      }),
    ]))
    if (err) {
      throw err // 如果有錯誤，拋出
    }
  }
  catch (error) {
    console.error('Error fetching teacher-student snapshots:', error)
  }
  return data
}, {
  watch: [locale],
})

const { data: lifeSnippetsMain, refresh: refreshLifeSnippetsMain } = useLazyAsyncData('life-snippets-main', async () => {
  const [err, result] = await to (useLifeSnippets.findLifeSnippets())
  if (err) {
    return Promise.reject(err)
  }
  return result
}, {
  watch: [locale],
})

useSeoMeta({
  title: '生活點滴',
  description: '生活點滴',
  keywords: '生活點滴',
  ogTitle: '生活點滴',
  ogDescription: '生活點滴',
})
</script>

<style scoped lang="sass">
</style>
