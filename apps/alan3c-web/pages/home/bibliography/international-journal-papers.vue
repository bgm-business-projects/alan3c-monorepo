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
              name: t('bibliography.internationalJournalPapers'),
              route: {
                name: 'home-bibliography-international-journal-papers',
              },
            },
          ]"
        />
      </div>
      <div class="max-width flex flex-col items-start gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          {{ t('bibliography.internationalJournalPapers') }}
        </h1>
        <q-btn outline dense label="新增資料" class="border-primary px-1.5rem" @click="openCreatorDialog" />
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
            <div class="w-full flex flex-col gap-2rem items-start">
              <div v-for="item, index in bibliography.data" :key="item.id">
                <span class="mr-.2rem">
                  <a v-if="item.file?.filename_disk" :href="combineImageUrl(item.file?.filename_disk)" target="_blank" class="underline text-primary">
                    {{ index + 1 }}
                  </a>
                  <span v-else>
                    {{ index + 1 }}
                  </span>
                  <span>.</span>
                </span>
                <span v-if="item.author">
                  {{ item.author }}
                </span>
                <span v-if="item.year">
                  , ({{ item.year }})
                </span>
                <span v-if="item.titleOfThePaper">
                  : "{{ item.titleOfThePaper }}"
                </span>
                <span v-if="item.journalName" class="text-italic">
                  {{ item.journalName }}
                </span>
                <span v-if="item.vol">
                  , Vol. {{ item.vol }}
                </span>
                <span v-if="item.no">
                  , No. {{ item.no }}
                </span>
                <span v-if="item.month">
                  , {{ item.month }}
                </span>
                <span v-if="item.year">
                  . {{ item.year }}
                </span>
                <span v-if="item.pp">
                  , pp. {{ item.pp }}
                </span>
                <span v-if="transferStatus(item.status)">
                  (
                  {{ transferStatus(item.status) }}
                  {{ item.statusDate }}
                  )
                </span>
                .
              </div>
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
import type { InternationalJournalPapers } from '~/contract/international-journal-papers/international-journal-papers.type'
import CreateDataDialog from '~/components/international-journal-papers/create-data-dialog.vue'
import BaseLoginDialog from '../../../components/base-login-dialog.vue'
import { combineImageUrl } from '../../../utils/combine-image-url'

const { locale, t } = useI18n()

// const useInternationalJournalPapers = useInternationalJournalPapersApi()

const authStore = useAuthStore()
const { bibliographyToken, internationalJournalPapersCreatorToken } = storeToRefs(authStore)

const dialog = ref<DialogChainObject>()
const $q = useQuasar()
const isLoading = ref(false)

const isClient = ref(false)

const { data: bibliography, refresh: refreshBibliography } = useLazyAsyncData('international-journal-papers', async () => {
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
      refreshBibliography()
      return result
    }
  }
  else {
    const [getDataError, getDataResult] = await to (authStore.fetchInternationalJournalPapers())
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
  return new Promise<InternationalJournalPapers>((resolve, reject) => {
    dialog.value = $q.dialog({
      component: BaseLoginDialog,
      componentProps: {
        target: 'InternationalJournalPapers',
        onGetInternationalJournalPapers(data: InternationalJournalPapers) {
          resolve(data)
        },
      },
    })
  })
}

function openLoginInternationalJournalPapersCreatorDialog() {
  return new Promise<any>((resolve, reject) => {
    dialog.value = $q.dialog({
      component: BaseLoginDialog,
      componentProps: {
        target: 'InternationalJournalPapersCreator',
        onLoginInternationalJournalPapersCreator(data: any) {
          resolve(data)
        },
      },
    })
  })
}

function openCreateInternationalJournalPapersDialog() {
  return new Promise<any>((resolve, reject) => {
    dialog.value = $q.dialog({
      component: CreateDataDialog,
      componentProps: {
        onCreateData(data: any) {
          resolve(data)
        },
      },
    })
  })
}

async function openCreatorDialog() {
  // 當沒有登入過建立資料身份
  if (!internationalJournalPapersCreatorToken.value) {
    // 登入建立資料身份
    const [loginErr, loginResult] = await to(openLoginInternationalJournalPapersCreatorDialog())
    if (loginErr) {
      throw new Error(loginErr.message)
    }
    dialog.value?.hide()

    const [creatorError, creatorResult] = await to(openCreateInternationalJournalPapersDialog())
    if (creatorError) {
      throw new Error(creatorError.message)
    }
    $q.notify({
      message: '新增成功',
      color: 'green',
      position: 'center',
    })
    dialog.value?.hide()
  }
  else {
    const [checkError, checkResult] = await to(authStore.checkInternationalJournalPapersUser(internationalJournalPapersCreatorToken))
    if (checkError) {
      authStore.logoutInternationalJournalPapersCreator()
      dialog.value?.hide()
      $q.notify({
        message: '請重新登入',
        color: 'red',
        position: 'center',
      })
      openCreatorDialog()
      return
    }
    const [creatorError, creatorResult] = await to(openCreateInternationalJournalPapersDialog())
    if (creatorError) {
      throw new Error(creatorError.message)
    }
    $q.notify({
      message: '新增成功',
      color: 'green',
      position: 'center',
    })
    dialog.value?.hide()
  }
}

function transferStatus(status: 'onlyAccepted' | 'publication' | null) {
  if (status === 'publication') {
    return 'Publication'
  }
  if (status === 'onlyAccepted') {
    return 'Accepted'
  }
}

useSeoMeta({
  title: t('bibliography.internationalJournalPapers'),
  description: t('bibliography.internationalJournalPapers'),
  keywords: t('bibliography.internationalJournalPapers'),
  ogTitle: t('bibliography.internationalJournalPapers'),
  ogDescription: t('bibliography.internationalJournalPapers'),
})
</script>

<style scoped lang="sass">
</style>
