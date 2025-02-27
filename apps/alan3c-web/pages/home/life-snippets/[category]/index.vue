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
            name: t('home.album'),
            route: {
              name: 'home-life-snippets-category',
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('home.album') }}
      </h1>
    </div>
    <div class="max-width relative flex flex-col items-center justify-center gap-2rem">
      <div class="hidden gap-1rem w-full max-width lg:!flex flex-wrap">
        <nuxt-link
          v-for="(item, index) in 6"
          :key="index"
          class="bg-[#f4f4f4] px-1rem py-.2rem rounded-.5rem hover:bg-accent duration-500"
          :class="{
            'bg-accent': getTranslation(index + 1) === route.params.category,
          }"
          :to="localePath({
            name: 'home-life-snippets-category',
            params: { category: getTranslation(index + 1) },
          })"
        >
          <h2 class="text-md font-medium leading-1.5rem tracking-.05rem whitespace-nowrap">
            {{ getTranslation(index + 1) }}
          </h2>
        </nuxt-link>
      </div>
      <div class="flex lg:hidden w-full">
        <q-select v-model="targetCategory" :options="options" outlined dense class="flex lg:hidden" />
      </div>
      <div class="w-full max-width">
        <template v-if="isLoading">
          <div class="relative w-full aspect-2/1">
            <q-inner-loading :showing="isLoading" />
          </div>
        </template>
        <template v-else>
          <div
            v-if="isTeacherStudentSnapshotsDeep(lifeSnippets?.target)"
            class="w-full flex gap-1rem"
          >
            <base-card
              v-for="(item, index) in lifeSnippets?.target?.data.teacherStudentSnapshots"
              :key="index"
              :target-id="item.teacherStudentSnapshots_id.id"
              :main-image="combineImageUrl(item.teacherStudentSnapshots_id.file.filename_disk)"
              :category="getTranslationByKey('teacherStudentSnapshots')"
              :name="item.teacherStudentSnapshots_id.translations.find(item => item.teacherStudentSnapshotsLanguages_code === locale)?.name ?? '無標題'"
              class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            />
          </div>
          <div
            v-if="isGrowthRecordDeep(lifeSnippets?.target)"
            class="w-full flex gap-1rem"
          >
            <base-card
              v-for="(item, index) in lifeSnippets?.target?.data.growthRecord"
              :key="index"
              :target-id="item.growthRecord_id.id"
              :main-image="combineImageUrl(item.growthRecord_id.file.filename_disk)"
              :category="getTranslationByKey('growthRecord')"
              :name="item.growthRecord_id.translations.find(item => item.growthRecordLanguages_code === locale)?.name ?? '無標題'"
              class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            />
          </div>
          <div
            v-if="isLeisureTimeDeep(lifeSnippets?.target)"
            class="w-full flex gap-1rem"
          >
            <base-card
              v-for="(item, index) in lifeSnippets?.target?.data.leisureTime"
              :key="index"
              :target-id="item.leisureTime_id.id"
              :main-image="combineImageUrl(item.leisureTime_id.file.filename_disk)"
              :category="getTranslationByKey('leisureTime')"
              :name="item.leisureTime_id.translations.find(item => item.leisureTimeLanguages_code === locale)?.name ?? '無標題'"
              class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            />
          </div>
          <div
            v-if="isAcademicLectureDeep(lifeSnippets?.target)"
            class="w-full flex gap-1rem"
          >
            <base-card
              v-for="(item, index) in lifeSnippets?.target?.data.academicLecture"
              :key="index"
              :target-id="item.academicLecture_id.id"
              :main-image="combineImageUrl(item.academicLecture_id.file.filename_disk)"
              :category="getTranslationByKey('academicLecture')"
              :name="item.academicLecture_id.translations.find(item => item.academicLectureLanguages_code === locale)?.name ?? '無標題'"
              class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            />
          </div>
          <div
            v-if="isPrimeOfLifeDeep(lifeSnippets?.target)"
            class="w-full flex gap-1rem"
          >
            <base-card
              v-for="(item, index) in lifeSnippets?.target?.data.primeOfLife"
              :key="index"
              :target-id="item.primeOfLife_id.id"
              :main-image="combineImageUrl(item.primeOfLife_id.file.filename_disk)"
              :category="getTranslationByKey('primeOfLife')"
              :name="item.primeOfLife_id.translations.find(item => item.primeOfLifeLanguages_code === locale)?.name ?? '無標題'"
              class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            />
            <!-- {{ lifeSnippets?.target?.data.primeOfLife[0].primeOfLife_id.translations.find(item => item.primeOfLifeLanguages_code === locale)?.name }} -->
          </div>
          <div
            v-if="isAdministrativeYearsDeep(lifeSnippets?.target)"
            class="w-full flex gap-1rem"
          >
            <base-card
              v-for="(item, index) in lifeSnippets?.target?.data.administrativeYears"
              :key="index"
              :target-id="item.administrativeYears_id.id"
              :main-image="combineImageUrl(item.administrativeYears_id.file.filename_disk)"
              :category="getTranslationByKey('administrativeYears')"
              :name="item.administrativeYears_id.translations.find(item => item.administrativeYearsLanguages_code === locale)?.name ?? '無標題'"
              class="w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LifeSnippets } from '~/contract/life-snippets/life-snippets.type'
import BaseBreadcrumbs from '~/components/base-breadcrumbs.vue'
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

const { locale, t } = useI18n()

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

const isLoading = ref(false)

const { data: lifeSnippets, refresh: refreshLifeSnippets } = useLazyAsyncData('life-snippets', async () => {
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
    throw categoryListErr
  }

  const routeCategory = decodeURIComponent(route.params.category as string).trim() // 取得路由參數

  const apiKey = getSnippetById(categoryList, routeCategory)

  if (!apiKey) {
    isLoading.value = false
    throw new Error('apiKey not found')
  }
  const apiMethod = apiMapping[apiKey as keyof ApiMapping]

  let result
  try {
    result = await apiMethod(true)
    isLoading.value = false
  }
  catch (error) {
    console.error('Error fetching snippets:', error)
    isLoading.value = false
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

function getTranslationByKey(key: keyof LifeSnippets) {
  const translations = lifeSnippets.value?.category?.[key]?.data.translations

  if (translations) {
    const dynamicKey = `${key}MainLanguages_code`
    return translations
      .filter((item) => hasLanguageCodeProperty(item, dynamicKey) && item[dynamicKey] === locale.value)
      ?.[0]
      ?.name
  }
}

const options = computed(() => {
  const list = []
  for (let i = 0; i <= 5; i++) {
    list.push(getTranslation(i + 1))
  }
  return list
})
const targetCategory = ref<string>(route.params.category as string)

const router = useRouter()

watch(targetCategory, (newValue) => {
  router.push(localePath({
    name: 'home-life-snippets-category',
    params: { category: targetCategory.value },
  }))
})
</script>
