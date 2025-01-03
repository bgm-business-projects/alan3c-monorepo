<template>
  <div class="w-full flex flex-col gap-8rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        生活點滴
      </h1>
    </div>
    <div class="w-full max-w-600px relative aspect-1/1 flex items-center justify-center">
      <div ref="circle" class="max-width absolute border-primary border-2px border-solid border-opacity-40  w-full aspect-1/1 rounded-full circle-animation">
        <div
          v-for="(rotation, index) in divRotations"
          :key="index"
          class="absolute w-130px aspect-1/1 rotate-back-circle"
          :style="{ ...positionOnCircle(index + 1), transform: `rotate(${rotation}deg)` }"
        >
          <nuxt-link
            :to="localePath({
              name: 'home-life-snippets-category',
              params: { category: getTranslation(index + 1) },
            })"
            class="w-full flex flex-col items-center flex-nowrap gap-10px"
          >
            <nuxt-img
              v-if="getImage(index + 1)"
              :src="getImage(index + 1)"
              class="w-full"
            />
            <h2 class="text-lg font-semibold">
              {{ getTranslation(index + 1) }}
            </h2>
          </nuxt-link>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center gap-10px">
        <nuxt-img
          class="w-200px"
          :src="combineImageUrl(lifeSnippetsMain?.data.mainImage.filename_disk)"
        />
        <h2 class="text-lg font-semibold">
          {{ lifeSnippetsMain?.data.translations.filter((item) => item.lifeSnippetsLanguages_code === locale)[0].name }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LifeSnippets } from '~/contract/life-snippets/life-snippets.type'
import { combineImageUrl } from '../../../utils/combine-image-url'

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

const circle = ref<HTMLDivElement | null>(null)

const { width, height } = useElementSize(circle)

function positionOnCircle(index: number) {
  const angleStep = (2 * Math.PI) / 6
  const angle = index * angleStep

  const x = width.value / 2 + width.value / 2 * Math.cos(angle) - 65 // X 坐標 (偏移 25 像素居中)
  const y = height.value / 2 + height.value / 2 * Math.sin(angle) - 65 // Y 坐標 (偏移 25 像素居中)
  return {
    left: `${x}px`,
    top: `${y}px`,
  }
}

function getImage(index: number) {
  const keys = [
    'teacherStudentSnapshots',
    'growthRecord',
    'academicLecture',
    'administrativeYears',
    'primeOfLife',
    'leisureTime',
  ] as const
  const key = keys[index - 1]
  const snippets = lifeSnippets.value as LifeSnippets | null
  if (snippets && snippets[key]) {
    return combineImageUrl(snippets[key].data.mainImage.filename_disk)
  }
  return undefined
}

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
  const translations = lifeSnippets.value?.[key]?.data.translations

  if (translations) {
    const dynamicKey = `${key}MainLanguages_code`
    return translations
      .filter((item) => hasLanguageCodeProperty(item, dynamicKey) && item[dynamicKey] === locale.value)
      ?.[0]
      ?.name
  }

  return null
}

const circleRotation = ref(0)

const divRotations = computed(() => {
  const angleStep = 360 / 6 // 每個 div 的角度間隔
  return Array.from({ length: 6 }, (_, index) => {
    const elementAngle = angleStep * index // 每個 div 的原始角度
    const adjustment = circleRotation.value % 360 // 外層圓當前旋轉角度
    return adjustment - elementAngle // 計算反轉角度
  })
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
.circle-animation
  animation: rotateCircle 200s linear infinite

.rotate-back-circle
  animation: rotateBackCircle 200s linear infinite

@keyframes rotateCircle
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

@keyframes rotateBackCircle
  from
    transform: rotate(0deg)
  to
    transform: rotate(-360deg)
</style>
