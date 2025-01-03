<template>
  <div class="w-full flex flex-col gap-3rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        生活點滴
      </h1>
    </div>
    <div class="w-full relative flex flex-col items-center justify-center gap-2rem">
      <div class="flex gap-1rem w-full max-width">
        <nuxt-link>
          返回
        </nuxt-link>
      </div>
      <div class="w-full max-width">
        {{ lifeSnippetsMoreFile }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LifeSnippets } from '~/contract/life-snippets/life-snippets.type'

const { locale } = useI18n()

const useLifeSnippets = useLifeSnippetsApi()

const route = useRoute()

const { data: lifeSnippetsMoreFile, refresh: refreshTraineeCategories } = useLazyAsyncData('life-snippets-more-file', async () => {
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

  const key = Object.entries(categoryList).find(([key, value]) => {
    return value.data.translations.some((translation: any) => translation.name === route.params.category)
  })?.[1].data.key

  if (key === 'teacherStudentSnapshots') {
    const [err, result] = await to (useLifeSnippets.findTeacherStudentSnapshotsMoreFile(
      {
        query: {
          'filter[teacherStudentSnapshots][teacherStudentSnapshots_id][id][_eq]': 1,
        },
      },
    ))
    if (err) {
      return Promise.reject(err)
    }
    return result
  }

  if (key === 'growthRecord') {
    const [err, result] = await to (useLifeSnippets.findGrowthRecordMoreFile(
      {
        query: {
          'filter[growthRecord][growthRecord_id][id][_eq]': 1,
        },
      },
    ))
    if (err) {
      return Promise.reject(err)
    }
    return result
  }

  if (key === 'leisureTime') {
    const [err, result] = await to (useLifeSnippets.findLeisureTimeMoreFile(
      {
        query: {
          'filter[leisureTime][leisureTime_id][id][_eq]': 1,
        },
      },
    ))
    if (err) {
      return Promise.reject(err)
    }
    return result
  }

  if (key === 'academicLecture') {
    const [err, result] = await to (useLifeSnippets.findAcademicLectureMoreFile(
      {
        query: {
          'filter[academicLecture][academicLecture_id][id][_eq]': 1,
        },
      },
    ))
    if (err) {
      return Promise.reject(err)
    }
    return result
  }

  if (key === 'primeOfLife') {
    const [err, result] = await to (useLifeSnippets.findPrimeOfLifeMoreFile(
      {
        query: {
          'filter[primeOfLife][primeOfLife_id][id][_eq]': 1,
        },
      },
    ))
    if (err) {
      return Promise.reject(err)
    }
    return result
  }

  if (key === 'administrativeYears') {
    const [err, result] = await to (useLifeSnippets.findAdministrativeYearsMoreFile(
      {
        query: {
          'filter[administrativeYears][administrativeYears_id][id][_eq]': 1,
        },
      },
    ))
    if (err) {
      return Promise.reject(err)
    }
    return result
  }
}, {
  watch: [locale],
})
</script>
