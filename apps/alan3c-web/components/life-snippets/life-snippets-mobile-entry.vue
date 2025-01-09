<template>
  <div class="w-full flex items-center justify-center gap-2rem">
    <div class="flex flex-col justify-center items-center gap-10px w-full">
      <nuxt-img
        class="w-full"
        :src="combineImageUrl(lifeSnippetsMain?.data.mainImage.filename_disk)"
      />
      <h2 class="text-lg font-semibold">
        {{ lifeSnippetsMain?.data.translations.filter((item) => item.lifeSnippetsLanguages_code === locale)[0].name }}
      </h2>
    </div>
    <div
      class="max-width flex justify-center items-center gap-1rem"
    >
      <div
        v-for="(item, index) in 6"
        :key="index"
        class="w-[calc(50%-0.5rem)] aspect-1/1 duration-500"
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
</script>

<style scoped lang="sass">
</style>
