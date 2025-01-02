<template>
  <div class="w-full flex flex-col gap-3rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        生活點滴
      </h1>
    </div>
    <div class="w-full relative flex flex-col items-center justify-center gap-2rem">
      <div class="flex gap-1rem w-full max-width">
        <nuxt-link
          v-for="(item, index) in 6"
          :key="index"
          class="bg-[#f4f4f4] px-1rem py-.2rem rounded-.5rem"
          :class="{
            'bg-accent': getTranslation(index + 1) === route.params.id,
          }"
          :to="localePath({ name: 'home-life-snippets-id', params: { id: getTranslation(index + 1) } })"
        >
          <h2 class="text-md font-medium leading-1.5rem tracking-.05rem">
            {{ getTranslation(index + 1) }}
          </h2>
        </nuxt-link>
      </div>
      <div class="w-full max-width">
        <div
          v-if="isTeacherStudentSnapshotsDeep(lifeSnippets?.target)"
          class="w-full flex"
        >
          <base-card
            v-for="(item, index) in lifeSnippets?.target?.data.teacherStudentSnapshots" :key="index"
            :main-image="combineImageUrl(item.teacherStudentSnapshots_id.file.filename_disk)"
            :name="item.teacherStudentSnapshots_id.translations.find(item => item.teacherStudentSnapshotsLanguages_code === locale)?.name"
          />
        </div>
        <div
          v-if="isGrowthRecordDeep(lifeSnippets?.target)"
          class="w-full flex"
        >
          <base-card
            v-for="(item, index) in lifeSnippets?.target?.data.growthRecord" :key="index"
            :main-image="combineImageUrl(item.growthRecord_id.file.filename_disk)"
            :name="item.growthRecord_id.translations.find(item => item.growthRecordLanguages_code === locale)?.name"
          />
        </div>
        <div
          v-if="isLeisureTimeDeep(lifeSnippets?.target)"
          class="w-full flex"
        >
          <base-card
            v-for="(item, index) in lifeSnippets?.target?.data.leisureTime" :key="index"
            :main-image="combineImageUrl(item.leisureTime_id.file.filename_disk)"
            :name="item.leisureTime_id.translations.find(item => item.leisureTimeLanguages_code === locale)?.name"
          />
        </div>
        <div
          v-if="isAcademicLectureDeep(lifeSnippets?.target)"
          class="w-full flex"
        >
          <base-card
            v-for="(item, index) in lifeSnippets?.target?.data.academicLecture" :key="index"
            :main-image="combineImageUrl(item.academicLecture_id.file.filename_disk)"
            :name="item.academicLecture_id.translations.find(item => item.academicLectureLanguages_code === locale)?.name"
          />
        </div>
        <div
          v-if="isPrimeOfLifeDeep(lifeSnippets?.target)"
          class="w-full flex"
        >
          <base-card
            v-for="(item, index) in lifeSnippets?.target?.data.primeOfLife" :key="index"
            :main-image="combineImageUrl(item.primeOfLife_id.file.filename_disk)"
            :name="item.primeOfLife_id.translations.find(item => item.primeOfLifeLanguages_code === locale)?.name"
          />
        </div>
        <div
          v-if="isAdministrativeYearsDeep(lifeSnippets?.target)"
          class="w-full flex"
        >
          <base-card
            v-for="(item, index) in lifeSnippets?.target?.data.administrativeYears" :key="index"
            :main-image="combineImageUrl(item.administrativeYears_id.file.filename_disk)"
            :name="item.administrativeYears_id.translations.find(item => item.administrativeYearsLanguages_code === locale)?.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LifeSnippets } from '~/contract/life-snippets/life-snippets.type'
import BaseCard from '~/components/life-snippets/base-card.vue'
import { isAcademicLectureDeep } from '~/contract/life-snippets/academic-lecture/academic-lecture.type'
import { isAdministrativeYearsDeep } from '~/contract/life-snippets/administrative-years/administrative-years.type'
import { isGrowthRecordDeep } from '~/contract/life-snippets/growth-record/growth-record.type'
import { isLeisureTimeDeep } from '~/contract/life-snippets/leisure-time/leisure-time.type'
import { isPrimeOfLifeDeep } from '~/contract/life-snippets/prime-of-life/prime-of-life.type'
import { isTeacherStudentSnapshotsDeep } from '~/contract/life-snippets/teacher-student-snapshots/teacher-student-snapshots.type'
import { combineImageUrl } from '../../../../utils/combine-image-url'

interface ApiMapping {
  teacherStudentSnapshots: (deep: boolean) => ReturnType<typeof useLifeSnippets.findTeacherStudentSnapshots>;
  growthRecord: (deep: boolean) => ReturnType<typeof useLifeSnippets.findGrowthRecord>;
  leisureTime: (deep: boolean) => ReturnType<typeof useLifeSnippets.findLeisureTime>;
  academicLecture: (deep: boolean) => ReturnType<typeof useLifeSnippets.findAcademicLecture>;
  primeOfLife: (deep: boolean) => ReturnType<typeof useLifeSnippets.findPrimeOfLife>;
  administrativeYears: (deep: boolean) => ReturnType<typeof useLifeSnippets.findAdministrativeYears>;
}

const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const useLifeSnippets = useLifeSnippetsApi()

const apiMapping: ApiMapping = {
  teacherStudentSnapshots: (deep) => useLifeSnippets.findTeacherStudentSnapshots(deep),
  growthRecord: (deep) => useLifeSnippets.findGrowthRecord(deep),
  leisureTime: (deep) => useLifeSnippets.findLeisureTime(deep),
  academicLecture: (deep) => useLifeSnippets.findAcademicLecture(deep),
  primeOfLife: (deep) => useLifeSnippets.findPrimeOfLife(deep),
  administrativeYears: (deep) => useLifeSnippets.findAdministrativeYears(deep),
}

function getSnippetById(data: LifeSnippets, id: string): string | null {
  // 遍歷資料的所有主分類
  for (const [key, value] of Object.entries(data)) {
    const translations = value?.data?.translations
    if (translations) {
      // 檢查 translations 是否有匹配的名稱
      const match = translations.find((translation: any) => translation.name === id)
      if (match) {
        // 返回對應的分類資料
        return value?.data.key
      }
    }
  }
  return null // 若沒有匹配則返回 null
}

const { data: lifeSnippets, refresh: refreshLifeSnippets } = useLazyAsyncData('life-snippets', async () => {
  const categoryList: LifeSnippets = {
    teacherStudentSnapshots: undefined,
    growthRecord: undefined,
    leisureTime: undefined,
    academicLecture: undefined,
    primeOfLife: undefined,
    administrativeYears: undefined,
  }

  const [categoryListErr] = await to(Promise.all([
    useLifeSnippets.findTeacherStudentSnapshots().then((res) => {
      if (res?.data) {
        categoryList.teacherStudentSnapshots = res
      }
    }),
    useLifeSnippets.findGrowthRecord().then((res) => {
      if (res?.data) {
        categoryList.growthRecord = res
      }
    }),
    useLifeSnippets.findLeisureTime().then((res) => {
      if (res?.data) {
        categoryList.leisureTime = res
      }
    }),
    useLifeSnippets.findAcademicLecture().then((res) => {
      if (res?.data) {
        categoryList.academicLecture = res
      }
    }),
    useLifeSnippets.findPrimeOfLife().then((res) => {
      if (res?.data) {
        categoryList.primeOfLife = res
      }
    }),
    useLifeSnippets.findAdministrativeYears().then((res) => {
      if (res?.data) {
        categoryList.administrativeYears = res
      }
    }),
  ]))

  if (categoryListErr) {
    throw categoryListErr
  }

  const routeId = decodeURIComponent(route.params.id as string).trim() // 取得路由參數

  const apiKey = getSnippetById(categoryList, routeId)

  if (!apiKey) {
    throw new Error('apiKey not found')
  }
  const apiMethod = apiMapping[apiKey as keyof ApiMapping]

  let result
  try {
    result = await apiMethod(true)
  }
  catch (error) {
    console.error('Error fetching snippets:', error)
    throw error
  }

  return {
    category: categoryList,
    target: result,
  }
}, {
  watch: [locale, route],
})

function hasLanguageCodeProperty(
  item: any,
  key: string,
): item is { [key: string]: string } {
  return key in item
}

function getTranslation(index: number) {
  const keys = [
    'teacherStudentSnapshots',
    'growthRecord',
    'academicLecture',
    'administrativeYears',
    'primeOfLife',
    'leisureTime',
  ] as const // 確保鍵為字面量類型

  const key = keys[index - 1]
  const translations = lifeSnippets.value?.category?.[key]?.data.translations

  if (translations) {
    const dynamicKey = `${key}MainLanguages_code`
    return translations
      .filter((item) => hasLanguageCodeProperty(item, dynamicKey) && item[dynamicKey] === locale.value)
      ?.[0]
      ?.name
  }

  return null
}
</script>
