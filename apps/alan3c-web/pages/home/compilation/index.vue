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
        <template
          v-for="item in compilation?.data"
          :key="item.id"
        >
          <nuxt-link
            v-if="item.translations?.title"
            :to="localePath({
              name: 'home-compilation-id',
              params: {
                id: item.translations?.title,
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
        <template v-if="!compilation?.data || !compilation?.data.every(item => item.translations?.title)">
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

const { data: compilation, refresh: refreshCompilation } = useLazyAsyncData('compilation', async () => {
  isLoading.value = true
  const [err, result] = await to (useCompilation.findList())
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
      data: result,
    }
  },
  watch: [locale],
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
