<template>
  <div class="w-full max-w-600px relative aspect-1/1 flex items-center justify-center">
    <div ref="circle" class="max-width absolute border-primary border-2px border-dashed border-opacity-40 aspect-1/1 rounded-full circle-animation flex justify-center items-center">
      <div
        v-for="(rotation, index) in divRotations"
        :key="index"
        class="absolute w-130px aspect-1/1 rotate-back-circle duration-500"
        :style="{ ...positionOnCircle(index + 1), transform: `rotate(${rotation}deg)` }"
      >
        <nuxt-link
          :to="localePath({
            name: 'home-life-snippets-category',
            params: { category: getTranslation(index + 1) },
          })"
          class="w-full flex flex-col items-center flex-nowrap gap-10px"
        >
          <div class="w-full aspect-1/1 bg-#f4f4f4 relative overflow-hidden">
            <nuxt-img
              v-if="getImage(index + 1)"
              :src="getImage(index + 1)"
              class="min-w-full hover:min-w-120% absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%] duration-500"
            />
          </div>
          <h2 class="text-lg font-medium">
            {{ getTranslation(index + 1) }}
          </h2>
        </nuxt-link>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center gap-10px">
      <div class="w-200px bg-#f4f4f4">
        <nuxt-img
          class="w-full"
          :src="combineImageUrl(lifeSnippetsMain?.data.mainImage.filename_disk)"
        />
      </div>
      <h2 class="text-lg font-semibold">
        {{ lifeSnippetsMain?.data.translations.filter((item) => item.lifeSnippetsLanguages_code === locale)[0].name }}
      </h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LifeSnippetsMain } from '~/contract/life-snippets/life-snippets-main/life-snippets-main.type'
import type { LifeSnippets } from '~/contract/life-snippets/life-snippets.type'

import { combineImageUrl } from '../../utils/combine-image-url'

interface Props {
  lifeSnippetsMain: LifeSnippetsMain | null | undefined;
  lifeSnippets: LifeSnippets | null;
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { locale } = useI18n()
const localePath = useLocalePath()
const circle = ref<HTMLDivElement | null>(null)

const { width, height } = useElementSize(circle)

const isReady = ref(false)

watch(width, (newWidth) => {
  if (newWidth > 0) {
    isReady.value = true
  }
}, {
  immediate: true,
})

function positionOnCircle(index: number) {
  if (!isReady.value) {
    return ''
  }
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
  const snippets = props.lifeSnippets as LifeSnippets | null
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
  const translations = props.lifeSnippets?.[key]?.data.translations

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
