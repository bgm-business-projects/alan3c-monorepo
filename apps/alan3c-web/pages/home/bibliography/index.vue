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
            <nuxt-link
              :to="localePath({
                name: 'home-bibliography-international-journal-papers',
              })"
              class="border bg-#FDFDFD rounded-.5rem px-1rem lg:px-2rem py-1rem tracking-.1rem flex lg:items-center gap-1rem flex-col lg:flex-row items-start"
            >
              <div class="flex-1 font-semibold text-lg">
                {{ t('bibliography.internationalJournalPapers') }}
              </div>
              <div class="flex items-center gap-.4rem font-semibold border-solid border-black border-1px px-1rem py-.3rem rounded-.5rem">
                <div>{{ t('moreInfo') }}</div>
                <q-icon name="img:/arrow.svg" />
              </div>
            </nuxt-link>
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
    </template>
  </div>
</template>

<script setup lang="ts">
import type { DialogChainObject } from 'quasar'
import type { BibliographyData } from '~/contract/bibliography/bibliography.type'
import BaseLoginDialog from '../../../components/base-login-dialog.vue'

const { locale, t } = useI18n()

// const useBibliography = useBibliographyApi()

const localePath = useLocalePath()

const $q = useQuasar()

const authStore = useAuthStore()
const { bibliographyToken } = storeToRefs(authStore)

const isLoading = ref(false)
const dialog = ref<DialogChainObject>()

const isClient = ref(false)

const { data: bibliography, refresh: refreshBibliography } = useLazyAsyncData('bibliography', async () => {
  isLoading.value = true
  if (import.meta.server || !isClient.value)
    return

  if (!bibliographyToken.value) {
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
    const [getDataError, getDataResult] = await to(authStore.fetchBibliography())
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
}, {
  transform: (data) => {
    if (!data?.data)
      return
    return {
      normal: Object.entries(data?.data).filter((item) => !item.find((item) => item === 'id' || item === 'authoredBooks' || item === 'internationalJournalPapers')),
    }
  },
  watch: [isClient],
})

onMounted(() => {
  isClient.value = true
})

onBeforeUnmount(() => {
  if (!bibliography.value) {
    dialog.value?.hide()
  }
})

function openLoginDialog() {
  return new Promise<BibliographyData>((resolve, reject) => {
    dialog.value = $q.dialog({
      component: BaseLoginDialog,
      componentProps: {
        target: 'Bibliography',
        onGetBibliographyData(data: BibliographyData) {
          resolve(data)
        },
      },
    })
  })
}

useSeoMeta({
  title: '著作目錄',
  description: '著作目錄',
  keywords: '著作目錄',
  ogTitle: '著作目錄',
  ogDescription: '著作目錄',
})

// onUnmounted(() => {
//   dialog.value?.hide()
// })
// onMounted(async () => {
//   if (bibliographyToken.value) {
//     try {
//       await refreshBibliography()
//     }
//     catch (error) {
//       const credentials = await openLoginDialog()
//       await authStore.loginBibliography(credentials.account, credentials.password)
//     }
//   }
//   else {
//     const credentials = await openLoginDialog()
//     authStore.loginBibliography(credentials.account, credentials.password)
//   }
// })
</script>

<style scoped lang="sass">
</style>
