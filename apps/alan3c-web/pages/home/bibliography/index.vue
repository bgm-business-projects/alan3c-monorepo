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
            name: t('home.bibliography'),
            route: {
              name: 'home-bibliography',
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('home.bibliography') }}
      </h1>
    </div>
    <div class="max-width flex flex-col gap-1rem">
      <template v-if="!isLoading">
        <template v-if="!bibliography">
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
          <div v-for="item, index in bibliography.normal" :key="index">
            <nuxt-link
              :to="localePath({
                name: 'home-bibliography-id',
                params: {
                  id: item[0],
                },
              })"
              class="border bg-#FDFDFD rounded-.5rem px-1rem lg:px-2rem py-1rem tracking-.1rem flex lg:items-center gap-1rem flex-col lg:flex-row items-start"
            >
              <div class="flex-1 font-semibold text-lg">
                {{ t(`bibliography.${item[0]}`) }}
              </div>
              <div class="flex items-center gap-.4rem font-semibold border-solid border-black border-1px px-1rem py-.3rem rounded-.5rem">
                <div>{{ t('moreInfo') }}</div>
                <q-icon name="img:/arrow.svg" />
              </div>
            </nuxt-link>
          </div>
          <nuxt-link
            :to="localePath({
              name: 'home-bibliography-authored-books',
            })"
            class="border bg-#FDFDFD rounded-.5rem px-1rem lg:px-2rem py-1rem tracking-.1rem flex lg:items-center gap-1rem flex-col lg:flex-row items-start"
          >
            <div class="flex-1 font-semibold text-lg">
              {{ t('bibliography.authoredBooks') }}
            </div>
            <div class="flex items-center gap-.4rem font-semibold border-solid border-black border-1px px-1rem py-.3rem rounded-.5rem">
              <div>{{ t('moreInfo') }}</div>
              <q-icon name="img:/arrow.svg" />
            </div>
          </nuxt-link>
          <nuxt-link
            :to="localePath({
              name: 'home-bibliography-submitted-papers',
            })"
            class="border bg-#FDFDFD rounded-.5rem px-1rem lg:px-2rem py-1rem tracking-.1rem flex lg:items-center gap-1rem flex-col lg:flex-row items-start"
          >
            <div class="flex-1 font-semibold text-lg">
              {{ t('bibliography.submittedPapers') }}
            </div>
            <div class="flex items-center gap-.4rem font-semibold border-solid border-black border-1px px-1rem py-.3rem rounded-.5rem">
              <div>{{ t('moreInfo') }}</div>
              <q-icon name="img:/arrow.svg" />
            </div>
          </nuxt-link>
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

const useBibliography = useBibliographyApi()

const localePath = useLocalePath()

const isLoading = ref(false)

const { data: bibliography, refresh: refreshBibliography } = useLazyAsyncData('bibliography', async () => {
  isLoading.value = true
  const [err, result] = await to (useBibliography.findOne({
    query: {},
  }))
  if (err) {
    isLoading.value = false
    return Promise.reject(err)
  }
  isLoading.value = false
  return result
}, {
  transform: (data) => {
    if (!data?.data)
      return
    return {
      normal: Object.entries(data?.data).filter((item) => !item.find((item) => item === 'id' || item === 'authoredBooks')),
    }
  },
  watch: [locale],
})

useSeoMeta({
  title: '著作目錄',
  description: '著作目錄',
  keywords: '著作目錄',
  ogTitle: '著作目錄',
  ogDescription: '著作目錄',
})
</script>

<style scoped lang="sass">
</style>
