<template>
  <div class="w-full flex flex-col gap-8rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        生活點滴
      </h1>
    </div>
    <div class="w-full max-w-600px relative aspect-1/1 flex items-center justify-center">
      <div class="flex gap-1rem">
        <div
          v-for="item in lifeSnippets"
          :key="item.category"
          class="bg-[#f4f4f4] px-1rem py-.2rem rounded-.5rem bg-accent"
        >
          {{ item.data?.translations }}
        </div>
        <!-- <div
          v-for="category in lifeSnippets" :key="category.id"
          class="bg-[#f4f4f4] px-1rem py-.2rem rounded-.5rem"
          :class="{
            'bg-accent': category.translations.name === currentCategory,
          }"
        >
          <nuxt-link
            :to="localePath({ name: 'home-life-snippets-id', params: { id: getTranslation(index + 1) } })"
          >
            <div class="whitespace-nowrap">
              {{ category.translations.name }}
            </div>
          </nuxt-link>
          <div />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LifeSnippets } from '~/contract/life-snippets/life-snippets.type'

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
        if (res?.data) {
          data.teacherStudentSnapshots = res
        }
      }),
      useLifeSnippets.findGrowthRecord().then((res) => {
        if (res?.data) {
          data.growthRecord = res
        }
      }),
      useLifeSnippets.findLeisureTime().then((res) => {
        if (res?.data) {
          data.leisureTime = res
        }
      }),
      useLifeSnippets.findAcademicLecture().then((res) => {
        if (res?.data) {
          data.academicLecture = res
        }
      }),
      useLifeSnippets.findPrimeOfLife().then((res) => {
        if (res?.data) {
          data.primeOfLife = res
        }
      }),
      useLifeSnippets.findAdministrativeYears().then((res) => {
        if (res?.data) {
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
  transform: (data) => {
    return convertObjectToArray(data)
  },
  watch: [locale],
})

// function isActive(translation: LifeSnippets['']) {

// }

function convertObjectToArray<T extends Record<string, any>>(data: T) {
  const result: Array<{ category: string } & Partial<T[keyof T]>> = []

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const item = data[key] as Partial<T[keyof T]>
      result.push({
        category: key, // 額外的屬性
        ...item, // 展開原始資料
      })
    }
  }

  return result
}
</script>
