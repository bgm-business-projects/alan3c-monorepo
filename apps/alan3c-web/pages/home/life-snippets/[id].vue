<template>
  <div class="w-full flex flex-col gap-3rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        生活點滴
      </h1>
    </div>
    <div class="w-full relative flex flex-col items-center justify-center gap-2rem">
      <div class="flex gap-1rem">
        <nuxt-link
          v-for="(item, index) in 6"
          :key="index"
          class="bg-[#f4f4f4] px-1rem py-.2rem rounded-.5rem"
          :to="localePath({ name: 'home-life-snippets-id', params: { id: getTranslation(index + 1) } })"
        >
          <h2 class="text-md font-medium leading-1.5rem tracking-.05rem">
            {{ getTranslation(index + 1) }}
          </h2>
        </nuxt-link>
      </div>
      {{ lifeSnippets?.target?.data }}
      <!-- <div v-for="item in lifeSnippets?.target?.data.teacherStudentSnapshots">
        {{ item }}
      </div> -->
      <!-- <div v-if="lifeSnippets?.target?.data" class="flex">
        {{ transformToUnifiedFormat(lifeSnippets?.target?.data) }}
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LifeSnippets } from '~/contract/life-snippets/life-snippets.type'

interface ApiMapping {
  teacherStudentSnapshots: () => ReturnType<typeof useLifeSnippets.findTeacherStudentSnapshots>;
  growthRecord: () => ReturnType<typeof useLifeSnippets.findGrowthRecord>;
  leisureTime: () => ReturnType<typeof useLifeSnippets.findLeisureTime>;
  academicLecture: () => ReturnType<typeof useLifeSnippets.findAcademicLecture>;
  primeOfLife: () => ReturnType<typeof useLifeSnippets.findPrimeOfLife>;
  administrativeYears: () => ReturnType<typeof useLifeSnippets.findAdministrativeYears>;
}

const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const useLifeSnippets = useLifeSnippetsApi()

const apiMapping: ApiMapping = {
  teacherStudentSnapshots: useLifeSnippets.findTeacherStudentSnapshots,
  growthRecord: useLifeSnippets.findGrowthRecord,
  leisureTime: useLifeSnippets.findLeisureTime,
  academicLecture: useLifeSnippets.findAcademicLecture,
  primeOfLife: useLifeSnippets.findPrimeOfLife,
  administrativeYears: useLifeSnippets.findAdministrativeYears,
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
    result = await apiMethod()
    console.log('result', result)
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

interface UnifiedFormat {
  id: number;
  key: string;
  name: string;
  translations: { language: string; name: string }[];
  mainImage: {
    id: string;
    url: string;
    title: string;
    type: string;
    dimensions: { width: number; height: number };
  };
  subItems: {
    id: number;
    name: string | null;
    translations: { language: string; name: string }[];
    file: {
      id: string;
      url: string;
      title: string;
      type: string;
      dimensions: { width: number; height: number };
    } | null;
  }[];
}

function transformToUnifiedFormat(input: any): UnifiedFormat {
  const extractTranslations = (
    translations: any[],
    key: string,
  ): { language: string; name: string }[] => {
    return translations.map((t: any) => ({
      language: t[`${key}Languages_code`],
      name: t.name,
    }))
  }

  const extractImage = (image: any): {
    id: string;
    url: string;
    title: string;
    type: string;
    dimensions: { width: number; height: number };
  } => {
    return {
      id: image.id,
      url: image.storage === 'gcs' ? `/storage/${image.filename_disk}` : image.filename_disk,
      title: image.title,
      type: image.type,
      dimensions: { width: image.width, height: image.height },
    }
  }

  const extractSubItems = (
    items: any[],
    key: string,
  ): {
    id: number;
    name: string | null;
    translations: { language: string; name: string }[];
    file: {
      id: string;
      url: string;
      title: string;
      type: string;
      dimensions: { width: number; height: number };
    } | null;
  }[] => {
    return items.map((item: any) => {
      const file = item[`${key}_id`]?.file
      return {
        id: item.id,
        name: item[`${key}_id`]?.name || null,
        translations: extractTranslations(item[`${key}_id`]?.translations || [], key),
        file: file
          ? {
              id: file.id,
              url: file.storage === 'gcs' ? `/storage/${file.filename_disk}` : file.filename_disk,
              title: file.title,
              type: file.type,
              dimensions: { width: file.width, height: file.height },
            }
          : null,
      }
    })
  }

  const key = input.key
  const mainKey = key.charAt(0).toLowerCase() + key.slice(1)

  return {
    id: input.id,
    key: input.key,
    name: input.translations.find((t: any) => t[`${mainKey}MainLanguages_code`] === 'zh')?.name || '',
    translations: extractTranslations(input.translations, `${mainKey}Main`),
    mainImage: extractImage(input.mainImage),
    subItems: extractSubItems(input[mainKey], mainKey),
  }
}
</script>
