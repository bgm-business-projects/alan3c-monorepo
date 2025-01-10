<template>
  <div class="w-full flex flex-col gap-3rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('navbar.trainee') }}
      </h1>
      <div class="lg:!flex gap-1rem hidden">
        <div
          v-for="category in traineeCategories" :key="category.id"
          class="bg-[#f4f4f4] px-1rem py-.2rem rounded-.5rem hover:bg-accent duration-500 flex items-center"
          :class="{
            'bg-accent': category.translations.name === currentCategory,
          }"
        >
          <nuxt-link
            :to="localePath({
              name: 'trainee',
              query: {
                category: category.translations.name,
              },
            })"
          >
            <div class="whitespace-nowrap">
              {{ category.translations.name }}
            </div>
          </nuxt-link>
          <div />
        </div>
      </div>
      <div class="flex w-full gap-1rem justify-between">
        <q-select v-model="targetCategory" :options="options" outlined dense class="flex lg:hidden" />
        <q-input v-model="keyword" outlined placeholder="搜尋" dense class="w-10rem">
          <template #prepend>
            <q-icon name="search" class="text-16px" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="max-width">
      <list-card v-for="item in trainee" :key="item.id" :data="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ListCard from '../components/trainee/list-card.vue'

const localePath = useLocalePath()

const keyword = ref('')

const { locale, t } = useI18n()

const useTraineeCategory = useTraineeCategoryApi()
const { data: traineeCategories, refresh: refreshTraineeCategories } = useLazyAsyncData('trainee-category', async () => {
  const [err, result] = await to (useTraineeCategory.findList())
  if (err) {
    return Promise.reject(err)
  }
  return result
}, {
  transform: (data) => {
    return data?.data.map((item) => {
      return {
        ...item,
        translations: item.translations.filter((item) => item.traineeCategoryLanguages_code === locale.value)[0],
      }
    })
  },
  watch: [locale],
})

const options = computed(() => {
  if (!traineeCategories.value)
    return undefined
  return traineeCategories.value.map((item) => {
    return item.translations.name
  })
})

const isLoading = ref(false)

const route = useRoute()
const router = useRouter()
const targetCategory = ref<string>(route.query.category as string)

watch(targetCategory, (newValue) => {
  router.push(localePath({
    name: 'trainee',
    query: {
      category: newValue,
    },
  }))
})

const currentCategory = computed(() => {
  return route.query.category
})

const useTrainee = useTraineeApi()

const { data: trainee, refresh: refreshTrainee } = useLazyAsyncData('trainee', async () => {
  isLoading.value = true
  let category: string | undefined

  if (Array.isArray(currentCategory.value)) {
    category = currentCategory.value[0] ?? undefined // 如果是数组，取第一个元素，並確保它是 string | undefined
  }
  else {
    category = currentCategory.value ?? undefined // 確保 category 是 string | undefined，過濾掉 null
  }

  const [err, result] = await to (useTrainee.findList({
    query: {
      'filter[_and][0][traineeCategory][translations][name][_eq]': category,
    },
  }))
  if (err) {
    return Promise.reject(err)
  }
  isLoading.value = false
  return result
}, {
  transform: (data) => {
    return data?.data.map((item) => {
      return {
        ...item,
        translations: item.translations.filter((item) => item.traineeLanguages_code === locale.value)[0],
      }
    })
  },
  watch: [locale, currentCategory],
})

useSeoMeta({
  title: '我的徒弟',
  description: '我的徒弟',
  keywords: '我的徒弟',
  ogTitle: '我的徒弟',
  ogDescription: '我的徒弟',
})
</script>

<style scoped lang="sass">
.q-field--outlined
  :deep() .q-field__control
    border-radius: .6rem
</style>
