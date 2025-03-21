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
            name: t('home.theCollectedWorksOfChinChen'),
            route: {
              name: 'home-compilation',
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('home.theCollectedWorksOfChinChen') }}
      </h1>
    </div>
    <div class="max-width flex flex-col gap-1rem">
      <template v-if="!isLoading">
        <template v-if="!compilation?.transformedData || compilation?.transformedData.length === 0">
          <div
            class="max-width bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem font-medium text-lg text-#666"
            :class="locale === 'zh' ? ['tracking-.1rem']
              : locale === 'en' ? ['tracking-.05rem']
                : []"
          >
            {{ t('notFound') }}
          </div>
        </template>
        <template v-else>
          <template
            v-for="item in compilation?.transformedData"
            :key="item.id"
          >
            <nuxt-link
              v-if="item.translations?.title"
              :to="localePath({
                name: 'home-compilation-id',
                params: {
                  id: item.translations?.title,
                },
                query: {
                  id: item.translations.compilation_id,
                },
              })"
              class="border bg-#FDFDFD rounded-.5rem px-1rem lg:px-2rem py-1rem tracking-.1rem flex lg:items-center gap-1rem flex-col lg:flex-row items-start"
            >
              <div class="flex-1 font-semibold text-lg">
                {{ item.translations.title }}
              </div>
              <div class="flex items-center gap-.4rem font-semibold border-solid border-black border-1px px-1rem py-.3rem rounded-.5rem">
                <div>{{ t('moreInfo') }}</div>
                <q-icon name="img:/arrow.svg" />
              </div>
            </nuxt-link>
          </template>
          <div class="flex justify-center pt-3rem">
            <q-pagination
              v-if="listMeta"
              v-model="currentPage"
              color="primary"
              :max="listMeta"
              :max-pages="6"
              flat
              direction-links
            />
          </div>
        </template>
      </template>
      <template v-else>
        <div class="max-width flex items-center justify-center h-300px relative">
          <q-inner-loading :showing="isLoading" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()

const localePath = useLocalePath()

const useCompilation = useCompilationApi()

const isLoading = ref(false)

const limit = ref(15)
const currentPage = ref(1)
const offset = computed(() => (currentPage.value - 1) * limit.value)

const { data: compilation, refresh: refreshCompilation } = useLazyAsyncData('compilation', async () => {
  isLoading.value = true
  const [err, result] = await to (useCompilation.findList({
    query: {
      limit: `${limit.value}`,
      offset: `${offset.value}`,
    },
  }))
  if (err) {
    isLoading.value = false
    return Promise.reject(err)
  }
  isLoading.value = false
  return result
}, {
  transform: (data) => {
    const result = data?.data.map((item) => {
      return {
        ...item,
        translations: item.translations.filter((item) => item.compilationLanguages_code === locale.value)[0],
      }
    })
    return {
      transformedData: result,
      originalData: data,
    }
  },
  watch: [locale, currentPage],
})

const listMeta = computed(() => {
  if (compilation.value?.originalData?.meta.filter_count && typeof Number.parseInt(compilation.value?.originalData.meta.filter_count) === 'number') {
    if (Number.parseInt(compilation.value?.originalData.meta.filter_count) / limit.value < 1) {
      return 1
    }
  }
  return undefined
})

useSeoMeta({
  title: '真誠文集',
  description: '真誠文集',
  keywords: '真誠文集',
  ogTitle: '真誠文集',
  ogDescription: '真誠文集',
})
</script>

<style scoped lang="sass">
</style>
