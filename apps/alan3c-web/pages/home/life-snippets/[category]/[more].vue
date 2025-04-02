<template>
  <div class="w-full flex flex-col gap-2rem lg:gap-3rem items-center layout-padding py-1.5rem lg:py-3rem">
    <div class="max-width flex">
      <base-breadcrumbs
        :bread-list="[
          {
            name: t('navbar.home'),
            route: {
              name: 'home',
            },
          },
          {
            name: t('home.album'),
            route: {
              name: 'home-life-snippets-category',
            },
          },
          {
            name: route.params.category as string,
            route: {
              name: 'home-life-snippets-category',
              params: {
                category: route.params.category as string,
              },
            },
          },
          {
            name: route.params.more as string,
            route: {
              name: 'home-life-snippets-category-more',
              params: {
                category: route.params.category as string,
              },
            },
          },
        ]"
      />
    </div>
    <div class="max-width w-full flex items-center justify-between gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('home.album') }}
      </h1>
      <div class="flex gap-1rem bg-accent px-1rem py-.3rem rounded-.4rem font-medium">
        <nuxt-link
          :to="localePath({
            name: 'home-life-snippets-category',
            params: { category: route.params.category },
          })"
        >
          {{ t('back') }} {{ route.params.category }}
        </nuxt-link>
      </div>
    </div>
    <div class="w-full relative flex flex-col items-center justify-center gap-2rem">
      <div v-if="isLoading" class="w-full">
        <div class="relative w-full aspect-2/1">
          <q-inner-loading :showing="isLoading" />
        </div>
      </div>
      <div v-else class="w-full max-width">
        <div
          v-if="isTeacherStudentSnapshotsMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.result.data[0].moreFileList"
            :key="index"
            class="aspect-4/3 overflow-hidden w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] relative bg-#f4f4f4 flex items-center justify-center"
          >
            <nuxt-img
              :src="combineImageUrl(item.directus_files_id.filename_disk)"
              class="max-w-full max-h-full object-contain w-full"
            />
          </div>
          <div
            v-if="lifeSnippetsMoreFile.result.data?.[0].moreFileList.length === 0"
            class="bg-#f4f4f4 w-full min-h-[calc(100dvh-517px)] rounded-1rem flex justify-center items-center text-lg font-medium text-#868686"
          >
            無更多圖片
          </div>
        </div>
        <div
          v-if="isGrowthRecordMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.result.data[0].moreFileList"
            :key="index"
            class="aspect-4/3 overflow-hidden w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] relative bg-#f4f4f4 flex items-center justify-center"
          >
            <nuxt-img
              :src="combineImageUrl(item.directus_files_id.filename_disk)"
              class="max-w-full max-h-full object-contain w-full"
            />
          </div>
          <div
            v-if="lifeSnippetsMoreFile.result.data?.[0].moreFileList.length === 0"
            class="bg-#f4f4f4 w-full min-h-[calc(100dvh-517px)] rounded-1rem flex justify-center items-center text-lg font-medium text-#868686"
          >
            無更多圖片
          </div>
        </div>

        <div
          v-if="isAcademicLectureMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.result.data[0].moreFileList"
            :key="index"
            class="aspect-4/3 overflow-hidden w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] relative bg-#f4f4f4 flex items-center justify-center"
          >
            <nuxt-img
              :src="combineImageUrl(item.directus_files_id.filename_disk)"
              class="max-w-full max-h-full object-contain w-full"
            />
          </div>
          <div
            v-if="lifeSnippetsMoreFile.result.data[0].moreFileList.length === 0"
            class="bg-#f4f4f4 w-full min-h-[calc(100dvh-517px)] rounded-1rem flex justify-center items-center text-lg font-medium text-#868686"
          >
            無更多圖片
          </div>
        </div>
        <div
          v-if="isAdministrativeYearsMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.result.data[0].moreFileList"
            :key="index"
            class="aspect-4/3 overflow-hidden w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] relative bg-#f4f4f4 flex items-center justify-center"
          >
            <nuxt-img
              :src="combineImageUrl(item.directus_files_id.filename_disk)"
              class="max-w-full max-h-full object-contain w-full"
            />
          </div>
          <div
            v-if="lifeSnippetsMoreFile.result.data[0].moreFileList.length === 0"
            class="bg-#f4f4f4 w-full min-h-[calc(100dvh-517px)] rounded-1rem flex justify-center items-center text-lg font-medium text-#868686"
          >
            無更多圖片
          </div>
        </div>
        <div
          v-if="isPrimeOfLifeMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.result.data[0].moreFileList"
            :key="index"
            class="aspect-4/3 overflow-hidden w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] relative bg-#f4f4f4 flex items-center justify-center"
          >
            <nuxt-img
              :src="combineImageUrl(item.directus_files_id.filename_disk)"
              class="max-w-full max-h-full object-contain w-full"
            />
          </div>
          <div
            v-if="lifeSnippetsMoreFile.result.data[0].moreFileList.length === 0"
            class="bg-#f4f4f4 w-full min-h-[calc(100dvh-517px)] rounded-1rem flex justify-center items-center text-lg font-medium text-#868686"
          >
            無更多圖片
          </div>
        </div>
        <div
          v-if="isLeisureTimeMoreFile(lifeSnippetsMoreFile)"
          class="flex gap-1rem w-full"
        >
          <div
            v-for="(item, index) in lifeSnippetsMoreFile.result.data[0].moreFileList"
            :key="index"
            class="aspect-4/3 overflow-hidden w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] relative bg-#f4f4f4 flex items-center justify-center"
          >
            <nuxt-img
              :src="combineImageUrl(item.directus_files_id.filename_disk)"
              class="max-w-full max-h-full object-contain w-full"
            />
          </div>
          <div
            v-if="lifeSnippetsMoreFile.result.data[0].moreFileList.length === 0"
            class="bg-#f4f4f4 w-full min-h-[calc(100dvh-517px)] rounded-1rem flex justify-center items-center text-lg font-medium text-#868686"
          >
            無更多圖片
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LifeSnippets } from '~/contract/life-snippets/life-snippets.type'
import { isEmpty } from 'lodash-es'
import { isAcademicLectureMoreFile } from '../../../../contract/life-snippets/academic-lecture/academic-lecture.type'
import { isAdministrativeYearsMoreFile } from '../../../../contract/life-snippets/administrative-years/administrative-years.type'
import { isGrowthRecordMoreFile } from '../../../../contract/life-snippets/growth-record/growth-record.type'
import { isLeisureTimeMoreFile } from '../../../../contract/life-snippets/leisure-time/leisure-time.type'
import { isPrimeOfLifeMoreFile } from '../../../../contract/life-snippets/prime-of-life/prime-of-life.type'
import { isTeacherStudentSnapshotsMoreFile } from '../../../../contract/life-snippets/teacher-student-snapshots/teacher-student-snapshots.type'
import { combineImageUrl } from '../../../../utils/combine-image-url'

const { locale, t } = useI18n()

const useLifeSnippets = useLifeSnippetsApi()

const localePath = useLocalePath()

const route = useRoute()

const isLoading = ref(false)

const { data: lifeSnippetsMoreFile, refresh: refreshTraineeCategories } = await useAsyncData(`life-snippets-${route.params.name}-${route.query.id}`, async () => {
  isLoading.value = true
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
    isLoading.value = false
    throw new Error(categoryListErr.message)
  }

  const key = Object.entries(categoryList).find(([key, value]) => {
    return value.data.translations.some((translation: any) => translation.name === route.params.category)
  })?.[1].data.key

  if (key === 'teacherStudentSnapshots') {
    const targetId = Number(route.query.id)
    const [err, result] = await to (useLifeSnippets.findTeacherStudentSnapshotsMoreFile(
      {
        query: {
          'filter[id][_eq]': targetId,
        },
      },
    ))
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return {
      key: 'teacherStudentSnapshots',
      result,
    }
  }

  if (key === 'growthRecord') {
    const targetId = Number(route.query.id)
    const [err, result] = await to (useLifeSnippets.findGrowthRecordMoreFile(
      {
        query: {
          'filter[id][_eq]': targetId,
        },
      },
    ))
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return {
      key: 'growthRecord',
      result,
    }
  }

  if (key === 'leisureTime') {
    const targetId = Number(route.query.id)
    const [err, result] = await to (useLifeSnippets.findLeisureTimeMoreFile(
      {
        query: {
          'filter[id][_eq]': targetId,
        },
      },
    ))
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return {
      key: 'leisureTime',
      result,
    }
  }

  if (key === 'academicLecture') {
    const targetId = Number(route.query.id)
    const [err, result] = await to (useLifeSnippets.findAcademicLectureMoreFile(
      {
        query: {
          'filter[id][_eq]': targetId,
        },
      },
    ))
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return {
      key: 'academicLecture',
      result,
    }
  }

  if (key === 'primeOfLife') {
    const targetId = Number(route.query.id)
    const [err, result] = await to (useLifeSnippets.findPrimeOfLifeMoreFile(
      {
        query: {
          'filter[id][_eq]': targetId,
        },
      },
    ))
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return {
      key: 'primeOfLife',
      result,
    }
  }

  if (key === 'administrativeYears') {
    const targetId = Number(route.query.id)
    const [err, result] = await to (useLifeSnippets.findAdministrativeYearsMoreFile(
      {
        query: {
          'filter[id][_eq]': targetId,
        },
      },
    ))

    isLoading.value = false
    return {
      key: 'administrativeYears',
      result,
    }
  }
}, {
  watch: [locale],
})

if (isEmpty(lifeSnippetsMoreFile.value) || !lifeSnippetsMoreFile.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Data Not Found',
  })
}
</script>
