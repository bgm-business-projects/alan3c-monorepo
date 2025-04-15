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
          {
            name: t('bibliography.guestEditorial'),
            route: {
              name: 'home-bibliography-guest-editorial',
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('bibliography.guestEditorial') }}
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
          <div class="w-full flex flex-col gap-2rem items-start">
            <div v-for="(item, index) in bibliography.data" :key="index" :data="item" :index="index + 1">
              <div class="flex flex-nowrap gap-.2rem">
                <div class="flex flex-nowrap">
                  <span>{{ index + 1 }}.</span>
                </div>
                <div v-if="item.title" class="flex">
                  <span>{{ item.title }}</span>
                </div>
              </div>
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
  </div>
</template>

<script setup lang="ts">
import type { DialogChainObject } from 'quasar'
import type { GuestEditorial } from '../../../contract/bibliography/guest-editorial/guest-editorial.type'
import BaseLoginDialog from '../../../components/base-login-dialog.vue'

const { locale, t } = useI18n()

const authStore = useAuthStore()
const { bibliographyToken } = storeToRefs(authStore)

const isLoading = ref(false)
const dialog = ref<DialogChainObject>()

const isClient = ref(false)

const $q = useQuasar()

const { data: bibliography, refresh: refreshBibliography } = useLazyAsyncData('bibliography-guest-editorial', async () => {
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
    const [getDataError, getDataResult] = await to(authStore.fetchGuestEditorial())
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
  return new Promise<GuestEditorial>((resolve, reject) => {
    dialog.value = $q.dialog({
      component: BaseLoginDialog,
      componentProps: {
        target: 'Bibliography',
        onGetBibliographyData(data: GuestEditorial) {
          resolve(data)
        },
      },
    })
  })
}

useSeoMeta({
  title: t('bibliography.guestEditorial'),
  description: t('bibliography.guestEditorial'),
  keywords: t('bibliography.guestEditorial'),
  ogTitle: t('bibliography.guestEditorial'),
  ogDescription: t('bibliography.guestEditorial'),
})
</script>

<style scoped lang="sass">
</style>
