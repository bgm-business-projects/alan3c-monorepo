<template>
  <div class="w-full flex flex-col gap-3rem items-center layout-padding py-3rem">
    <div class="max-width w-full flex items-center justify-between gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        生活點滴
      </h1>
      <div class="flex gap-1rem bg-accent px-1rem py-.3rem rounded-.4rem font-medium">
        <nuxt-link
          :to="localePath({
            name: 'home-life-snippets-category',
            params: { category: route.params.category },
          })"
        >
          返回 {{ route.params.category }}
        </nuxt-link>
      </div>
    </div>
    <div class="w-full relative flex flex-col items-center justify-center gap-2rem">
      <div class="w-full max-width">
        <div
          v-if="isTeacherStudentSnapshotsMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.data.teacherStudentSnapshots[0].teacherStudentSnapshots_id.moreFileList"
            :key="index"
            class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] aspect-4/3 overflow-hidden relative"
          >
            <nuxt-img :src="combineImageUrl(item.directus_files_id.filename_disk)" class="absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]" />
          </div>
        </div>
        <div
          v-if="isGrowthRecordMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.data.growthRecord[0].growthRecord_id.moreFileList"
            :key="index"
            class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] aspect-4/3 overflow-hidden relative"
          >
            <nuxt-img :src="combineImageUrl(item.directus_files_id.filename_disk)" class="absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]" />
          </div>
        </div>
        <div
          v-if="isAcademicLectureMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.data.academicLecture[0].academicLecture_id.moreFileList"
            :key="index"
            class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] aspect-4/3 overflow-hidden relative"
          >
            <nuxt-img :src="combineImageUrl(item.directus_files_id.filename_disk)" class="absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]" />
          </div>
        </div>
        <div
          v-if="isAdministrativeYearsMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.data.administrativeYears[0].administrativeYears_id.moreFileList"
            :key="index"
            class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] aspect-4/3 overflow-hidden relative"
          >
            <nuxt-img :src="combineImageUrl(item.directus_files_id.filename_disk)" class="absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]" />
          </div>
        </div>
        <div
          v-if="isAdministrativeYearsMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.data.administrativeYears[0].administrativeYears_id.moreFileList"
            :key="index"
            class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] aspect-4/3 overflow-hidden relative"
          >
            <nuxt-img :src="combineImageUrl(item.directus_files_id.filename_disk)" class="absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]" />
          </div>
        </div>
        <div
          v-if="isPrimeOfLifeMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.data.primeOfLifeDeep[0].primeOfLifeDeep_id.moreFileList"
            :key="index"
            class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] aspect-4/3 overflow-hidden relative"
          >
            <nuxt-img :src="combineImageUrl(item.directus_files_id.filename_disk)" class="absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]" />
          </div>
        </div>
        <div
          v-if="isLeisureTimeMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.data.leisureTime[0].leisureTime_id.moreFileList"
            :key="index"
            class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] aspect-4/3 overflow-hidden relative"
          >
            <nuxt-img :src="combineImageUrl(item.directus_files_id.filename_disk)" class="absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LifeSnippets } from '~/contract/life-snippets/life-snippets.type'
import { isAcademicLectureMoreFile } from '../../../../contract/life-snippets/academic-lecture/academic-lecture.type'
import { isAdministrativeYearsMoreFile } from '../../../../contract/life-snippets/administrative-years/administrative-years.type'
import { isGrowthRecordMoreFile } from '../../../../contract/life-snippets/growth-record/growth-record.type'
import { isLeisureTimeMoreFile } from '../../../../contract/life-snippets/leisure-time/leisure-time.type'
import { isPrimeOfLifeMoreFile } from '../../../../contract/life-snippets/prime-of-life/prime-of-life.type'
import { isTeacherStudentSnapshotsMoreFile } from '../../../../contract/life-snippets/teacher-student-snapshots/teacher-student-snapshots.type'
import { combineImageUrl } from '../../../../utils/combine-image-url'

const { locale } = useI18n()

const useLifeSnippets = useLifeSnippetsApi()

const localePath = useLocalePath()

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
    const targetId = Number(route.query.id)
    const [err, result] = await to (useLifeSnippets.findTeacherStudentSnapshotsMoreFile(
      {
        query: {
          'filter[teacherStudentSnapshots][teacherStudentSnapshots_id][id][_eq]': targetId,
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
