<template>
  <div class="w-full flex flex-col gap-2rem lg:gap-3rem items-center layout-padding py-1.5rem lg:py-3rem">
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
            name: t('navbar.trainee'),
            route: {
              name: 'trainee',
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('navbar.trainee') }}
      </h1>
      <div class="lg:!flex gap-1rem hidden">
        <div
          v-for="category in traineeCategories" :key="category.id"
          class="bg-[#f4f4f4] px-1rem py-.2rem rounded-.5rem hover:bg-accent duration-500 flex items-center"
          :class="{
            'bg-accent': category.translations?.name === currentCategory,
          }"
        >
          <nuxt-link
            :to="localePath({
              name: 'trainee',
              query: {
                category: category.translations?.name,
              },
            })"
          >
            <div class="whitespace-nowrap">
              {{ category.translations?.name }}
            </div>
          </nuxt-link>
          <div />
        </div>
      </div>
      <div class="flex w-full gap-1rem justify-between">
        <q-select v-model="targetCategory" :options="options" outlined dense class="flex lg:hidden" />
        <q-input v-model="keyword" outlined :placeholder="t('search')" dense class="w-10rem" @keyup.enter="refreshTrainee()">
          <template #prepend>
            <q-icon name="search" class="text-16px" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="max-width">
      <template v-if="!isLoading">
        <template v-if="trainee?.transformedData && trainee.transformedData.length > 0">
          <div class="w-full flex flex-col gap-3rem">
            <list-card v-for="item in trainee.transformedData" :key="item.id" :data="item" />
          </div>
          <div class="flex justify-center pt-5rem">
            <q-pagination
              v-if="listMeta"
              v-model="currentPage"
              color="primary"
              :max="listMeta"
              flat
              direction-links
            />
          </div>
        </template>
        <template v-else>
          <div
            class="max-width bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem font-medium text-lg text-#666"
            :class="locale === 'zh' ? ['tracking-.1rem']
              : locale === 'en' ? ['tracking-.05rem']
                : []"
          >
            {{ t('notFound') }}
          </div>
        </template>
      </template>
      <template v-else>
        <div class="relative w-full h-300px">
          <q-inner-loading :showing="isLoading" />
        </div>
      </template>
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
    return item.translations?.name
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

const limit = ref(15)
const currentPage = ref(1)
const offset = computed(() => (currentPage.value - 1) * limit.value)

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
      'filter[_and][0][translations][name][_icontains]': keyword.value ? keyword.value : undefined,
      'limit': `${limit.value}`,
      'offset': `${offset.value}`,
    },
  }))
  if (err) {
    return Promise.reject(err)
  }
  isLoading.value = false
  return result
}, {
  transform: (data) => {
    return {
      transformedData: data?.data.map((item) => {
        return {
          ...item,
          translations: item.translations.filter((item) => item.traineeLanguages_code === locale.value)[0],
        }
      }),
      originalData: data,
    }
  },
  watch: [locale, currentCategory, currentPage],
})

const listMeta = computed(() => {
  if (trainee.value?.originalData?.meta.filter_count && typeof Number.parseInt(trainee.value?.originalData.meta.filter_count) === 'number') {
    if (Number.parseInt(trainee.value?.originalData.meta.filter_count) / limit.value < 1) {
      return 1
    }
    return Math.ceil(Number.parseInt(trainee.value?.originalData.meta.filter_count) / limit.value)
  }
  return undefined
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
