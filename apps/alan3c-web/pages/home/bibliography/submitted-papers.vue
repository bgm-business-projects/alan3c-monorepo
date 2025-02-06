<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-1.5rem lg:py-3rem">
    <template v-if="bibliography">
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
            {
              name: t('bibliography.submittedPapers'),
              route: {
                name: 'home-bibliography-submitted-papers',
              },
            },
          ]"
        />
      </div>
      <div class="max-width flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          {{ t('bibliography.submittedPapers') }}
        </h1>
      </div>

      <div class="max-width flex flex-col gap-2rem">
        <div class="hidden lg:!flex gap-.5rem w-full flex">
          <div
            v-for="category in bibliography?.categories" :key="category.name"
            class="bg-[#f4f4f4] px-1rem py-.2rem rounded-.5rem"
            :class="checkActiveStyle(category.route.hash)"
          >
            <nuxt-link
              :to="localePath(category.route)"
            >
              <div class="whitespace-nowrap font-medium">
                {{ category.name }}
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="flex lg:hidden">
          <q-select v-model="targetCategory" :options="options" outlined dense class="flex lg:hidden" />
        </div>
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
            <div
              v-for="item in bibliography.data"
              :id="`year-${item.year}`"
              :key="item.id"
              class="flex flex-col gap-1rem w-full"
            >
              <h2 class="text-xl font-semibold">
                {{ item.year }}
              </h2>
              <q-separator />
              <base-wysiwyg-preview v-if="item.translations?.content" class="w-full" :html-code="item.translations.content" />
            </div>
          </template>
        </template>
        <template v-else>
          <div class="max-width flex items-center justify-center h-300px relative">
            <q-inner-loading :showing="isLoading" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { DialogChainObject } from 'quasar'
import type { SubmittedPapers } from '~/contract/bibliography/submitted-papers.type'
import BaseWysiwygPreview from '~/components/wysiwyg-preview/base-wysiwyg-preview.vue'
import BaseLoginDialog from '../../../components/base-login-dialog.vue'

const { locale, t } = useI18n()

const localePath = useLocalePath()

const $q = useQuasar()

const route = useRoute()
// const hash = computed(() => route.hash.replace('#', ''))

const authStore = useAuthStore()
const { submittedPapersToken } = storeToRefs(authStore)

const isLoading = ref(false)

const dialog = ref<DialogChainObject>()
const isClient = ref(false)

const { data: bibliography, refresh: refreshBibliography } = useLazyAsyncData('submittedPapers', async () => {
  isLoading.value = true
  if (import.meta.server || !isClient.value)
    return

  if (!submittedPapersToken.value) {
    const [err, result] = await to(openLoginDialog())
    if (result) {
      $q.notify({
        message: '登入成功',
        color: 'green',
        position: 'center',
      })
      dialog.value?.hide()
      isLoading.value = false
      return result
    }
  }
  else {
    const [getDataError, getDataResult] = await to(authStore.fetchSubmittedPapers())
    if (getDataError) {
      isLoading.value = false
      $q.notify({
        message: getDataError.message,
        color: 'red',
        position: 'center',
      })

      const [err, result] = await to(openLoginDialog())
      if (result) {
        $q.notify({
          message: '登入成功',
          color: 'green',
          position: 'center',
        })
        dialog.value?.hide()
        isLoading.value = false
        return result
      }
    }
    isLoading.value = false
    return getDataResult
  }

  // const [err, result] = await to (useBibliography.findSubmittedPapers({
  //   query: {},
  // }))
  // if (err) {
  //   isLoading.value = false
  //   return Promise.reject(err)
  // }
}, {
  transform: (data) => {
    if (!data)
      return
    return {
      categories: [
        // 原始帶有年份的資料
        ...data?.data.map((item) => {
          return {
            name: item.year,
            route: {
              name: 'home-bibliography-submitted-papers',
              hash: `#year-${item.year}`,
            },
          }
        }).filter((item) => item.name),
        // 未帶有年份的資料改為 Pending
        ...data?.data.map((item) => {
          if (!item.year) {
            return {
              name: 'Pending',
              route: {
                name: 'home-bibliography-submitted-papers',
                hash: `#year-Pending`,
              },
            }
          }
          else {
            return {
              name: item.year,
              route: {
                name: 'home-bibliography-submitted-papers',
                hash: `#year-${item.year}`,
              },
            }
          }
        }).filter((item) => item.name === 'Pending'),
      ],

      data: [
        ...data?.data.map((item) => {
          return {
            ...item,
            translations: item.translations.filter((translation) => translation.submittedPapersLanguages_code === locale.value)[0],
          }
        }).filter((item) => item.year),

        ...data?.data.map((item) => {
          if (!item.year) {
            return {
              ...item,
              year: 'Pending',
              translations: item.translations.filter((translation) => translation.submittedPapersLanguages_code === locale.value)[0],
            }
          }
          else {
            return {
              ...item,
              translations: item.translations.filter((translation) => translation.submittedPapersLanguages_code === locale.value)[0],
            }
          }
        }).filter((item) => item.year === 'Pending'),
      ],
    }
  },
  watch: [isClient, locale],
})

function openLoginDialog() {
  return new Promise<SubmittedPapers>((resolve, reject) => {
    dialog.value = $q.dialog({
      component: BaseLoginDialog,
      componentProps: {
        target: 'SubmittedPapers',
        onGetSubmittedPapersData(data: SubmittedPapers) {
          resolve(data)
        },
      },
    })
  })
}

const options = computed(() => {
  return bibliography.value?.categories?.map((item) => item.route.hash.split('#year-')[1])
})

const targetCategory = ref<string>()

const currentCategory = computed(() => route.hash.replace('#year-', ''))

onMounted(() => {
  isClient.value = true
  targetCategory.value = currentCategory.value.replace('#year-', '')
})

onBeforeUnmount(() => {
  if (!bibliography.value) {
    dialog.value?.hide()
  }
})

watch(currentCategory, (newValue) => {
  targetCategory.value = newValue
})

function checkActiveStyle(category: string) {
  if (targetCategory.value === category.replace('#year-', '')) {
    return 'bg-accent'
  }
  return ''
}

const router = useRouter()
watch(targetCategory, (newValue) => {
  if (targetCategory.value && bibliography.value?.categories) {
    const routeData = bibliography.value?.categories?.find((item) => item.route.hash.split('year-')[1] === targetCategory.value)?.route
    if (routeData) {
      router.push(localePath(routeData))
    }
  }
})

useSeoMeta({
  title: t('bibliography.submittedPapers'),
  description: t('bibliography.submittedPapers'),
  keywords: t('bibliography.submittedPapers'),
  ogTitle: t('bibliography.submittedPapers'),
  ogDescription: t('bibliography.submittedPapers'),
})
</script>

<style scoped lang="sass">
</style>
