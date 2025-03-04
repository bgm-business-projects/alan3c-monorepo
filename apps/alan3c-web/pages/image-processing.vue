<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding">
    <template v-if="imageProcessing">
      <div class="max-width flex flex-col gap-1.5rem pt-1.5rem lg:pt-3rem">
        <div class="w-full flex flex-col gap-2rem">
          <h1 class="text-2xl font-bold text-primary">
            {{ t('navbar.imageProcessingSeminar') }}
          </h1>
        </div>
        <div v-if="!isCreatorLoggedIn" class="flex flex-col gap-1rem py-1rem px-1.5rem border-solid border-1px border-gray-300 rounded-.5rem mb-.5rem">
          <q-inner-loading :showing="isLoginLoading" label="Please wait..." />
          <div class="text-md font-medium tracking-.08rem">
            上傳資料資格身份
          </div>
          <q-form @submit="loginCreatorAccount()">
            <div class="flex items-center gap-1.5rem">
              <div class="flex gap-1.2rem">
                <div class="flex items-center gap-.5rem">
                  <div>帳號</div>
                  <q-input
                    v-model="account"
                    lazy-rules
                    outlined
                    dense
                  />
                </div>
                <div class="flex items-center gap-.5rem">
                  <div>密碼</div>
                  <q-input
                    v-model="password"
                    lazy-rules
                    outlined
                    dense
                    type="password"
                  />
                </div>
              </div>
              <div class="flex justify-end">
                <q-btn class="rounded-.5rem" label="登入" type="submit" outline />
              </div>
            </div>
          </q-form>
        </div>
        <div v-else>
          <div class="flex gap-1rem">
            <q-btn label="上傳檔案" outline class="rounded-.5rem" @click="uploadData()" />
            <q-btn label="登出" outline class="rounded-.5rem" @click="logout()" />
          </div>
        </div>
        <div class="flex">
          <q-input v-model="keyword" outlined :placeholder="t('search')" dense @keyup.enter="refreshImageProcessing()">
            <template #prepend>
              <q-icon name="search" class="text-16px" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="max-width custom-grid">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px text-lg font-medium">
            {{ t('imageProcessingSeminar.date') }}
          </div>
        </div>
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px text-lg font-medium">
            {{ t('imageProcessingSeminar.titleOfPaper') }}
          </div>
        </div>
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px text-lg font-medium">
            {{ t('imageProcessingSeminar.journalOfPaper') }}
          </div>
        </div>
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px text-lg font-medium">
            {{ t('imageProcessingSeminar.authorOfThePaper') }}
          </div>
        </div>
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px text-lg font-medium">
            {{ t('imageProcessingSeminar.reporter') }}
          </div>
        </div>
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px text-lg font-medium">
            {{ t('imageProcessingSeminar.file') }}
          </div>
        </div>
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px text-lg font-medium">
            {{ t('imageProcessingSeminar.video') }}
          </div>
        </div>
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px text-lg font-medium">
            {{ t('imageProcessingSeminar.downloads') }}
          </div>
        </div>
        <template v-if="!isLoading">
          <template v-if="imageProcessing?.data.length && imageProcessing?.data.length > 0">
            <template
              v-for="item in imageProcessing?.data"
              :key="item.id"
            >
              <div>
                {{ item.reportDate }}
              </div>
              <div>
                {{ item.thesisTitle }}
              </div>
              <div>
                {{ item.academicJournal }}
              </div>
              <div>
                {{ item.paperAuthor }}
              </div>
              <div>
                {{ item.reporter }}
              </div>
              <div class="underline cursor-pointer" @click="addDownloadCount('imageProcessing', item.id.toString())">
                {{ item.file?.title }}
              </div>
              <div class="underline cursor-pointer" @click="openVideoDialog(combineImageUrl(item.video?.filename_disk))">
                {{ item.video?.title }}
              </div>
              <div>
                {{ item.downloadCount }}
              </div>
            </template>
          </template>
        </template>
      </div>
      <template v-if="isLoading">
        <div class="max-width flex items-center justify-center h-300px relative">
          <q-inner-loading :showing="isLoading" />
        </div>
      </template>
      <template v-else>
        <template v-if="!imageProcessing?.data.length || imageProcessing?.data.length === 0">
          <div
            class="max-width bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem font-medium text-lg text-#666"
            :class="locale === 'zh' ? ['tracking-.1rem']
              : locale === 'en' ? ['tracking-.05rem']
                : []"
          >
            {{ t('notFound') }}
          </div>
        </template>
        <div class="w-full flex flex-col gap-1.5rem xl:hidden">
          <image-processing-mobile-card
            v-for="item in imageProcessing?.data"
            :key="item.id"
            :data="item"
          />
        </div>
      </template>

      <div class="flex justify-center pt-3rem">
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
  </div>
</template>

<script setup lang="ts">
import type { DialogChainObject } from 'quasar'
import type { ImageProcessing } from '~/contract/image-processing/image-processing.type'
import BaseVideoDialog from '~/components/base-video-dialog.vue'
import ImageProcessingMobileCard from '~/components/image-processing/image-processing-mobile-card.vue'
import BaseLoginDialog from '../components/base-login-dialog.vue'
import CreateDataDialog from '../components/image-processing/create-data-dialog.vue'
import { combineImageUrl } from '../utils/combine-image-url'

const account = ref('')
const password = ref('')

const { locale, t } = useI18n()

const keyword = ref('')

const dialog = ref<DialogChainObject>()
const $q = useQuasar()
const useImageProcessing = useImageProcessingApi()

const isLoading = ref(false)

const isLoginLoading = ref(false)

const isClient = ref(false)

const limit = ref(15)
const currentPage = ref(1)
const offset = computed(() => (currentPage.value - 1) * limit.value)

const authStore = useAuthStore()
const { imageProcessingToken, imageProcessingCreatorToken } = storeToRefs(authStore)

const { data: imageProcessing, refresh: refreshImageProcessing } = useLazyAsyncData('image-processing', async () => {
  isLoading.value = true
  if (import.meta.server || !isClient.value)
    return

  if (!imageProcessingToken.value) {
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
    const [getDataError, getDataResult] = await to (authStore.fetchImageProcessing(limit.value, offset.value, keyword.value ? keyword.value : undefined))
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
  // const [err, result] = await to (useImageProcessing.findList({
  //   query: {
  //     'filter[thesisTitle][_icontains]': keyword.value ? keyword.value : undefined,
  //     'limit': `${limit.value}`,
  //     'offset': `${offset.value}`,
  //   },
  // }))
  // if (err) {
  //   isLoading.value = false
  //   return Promise.reject(err)
  // }
  // isLoading.value = false
  // return result
}, {
  watch: [locale, currentPage, isClient],
})

const listMeta = computed(() => {
  if (imageProcessing.value?.meta.filter_count && typeof Number.parseInt(imageProcessing.value?.meta.filter_count) === 'number') {
    if (Number.parseInt(imageProcessing.value?.meta.filter_count) / limit.value < 1) {
      return 1
    }
    return Math.ceil(Number.parseInt(imageProcessing.value?.meta.filter_count) / limit.value)
  }
  return undefined
})

async function addDownloadCount(collection: string, id: string) {
  const [err, result] = await to (useImageProcessing.addDownloadCount({
    collection,
    id,
  }))
  if (err) {
    throw new Error(err.message)
  }
  if (result?.downloadFileId) {
    // console.log('result?.downloadFileId', result?.downloadFileId)
    downloadFile(result?.downloadFileId)
  }
}

const config = useRuntimeConfig()

function downloadFile(fileId: string) {
  const fileUrl = `${config.public.apiBaseCSRUrl}/assets/${fileId}`
  // 建立一個隱藏的 a 標籤，觸發下載
  const a = document.createElement('a')
  a.href = `${fileUrl}?download`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
};

useSeoMeta({
  title: '圖像處理 Seminar',
  description: '圖像處理 Seminar',
  keywords: '圖像處理 Seminar',
  ogTitle: '圖像處理 Seminar',
  ogDescription: '圖像處理 Seminar',
})

function openVideoDialog(src: string) {
  $q.dialog({
    component: BaseVideoDialog,
    componentProps: {
      src,
    },
  })
}

const isCreatorLoggedIn = ref(false)

onMounted(async () => {
  isClient.value = true

  if (imageProcessingCreatorToken.value) {
    const [checkError, checkResult] = await to(authStore.checkImageProcessingCreatorUser(imageProcessingCreatorToken))
    if (checkError) {
      authStore.logoutImageProcessingCreator()
      isCreatorLoggedIn.value = false
      return
    }
    isCreatorLoggedIn.value = true
  }
})

onBeforeUnmount(() => {
  if (!imageProcessing.value) {
    dialog.value?.hide()
  }
})

function openLoginDialog() {
  return new Promise<ImageProcessing>((resolve, reject) => {
    dialog.value = $q.dialog({
      component: BaseLoginDialog,
      componentProps: {
        target: 'ImageProcessing',
        onGetImageProcessing(data: ImageProcessing) {
          resolve(data)
        },
      },
    })
  })
}

function openCreateDialog() {
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

async function uploadData() {
  const [err, result] = await to(openCreateDialog())
  if (err) {
    $q.notify({
      message: '新增失敗，請重新嘗試',
      color: 'red',
      position: 'center',
    })
  }
  $q.notify({
    message: '新增成功',
    color: 'green',
    position: 'center',
  })
  dialog.value?.hide()
}

async function loginCreatorAccount() {
  isLoginLoading.value = true
  const [err, result] = await to(authStore.loginImageProcessingCreator(`${account.value}@gmail.com`, password.value))
  if (err) {
    isLoginLoading.value = false
    throw new Error(err.message)
  }
  isLoginLoading.value = false
  isCreatorLoggedIn.value = true
}

function logout() {
  authStore.logoutImageProcessingCreator()
  isCreatorLoggedIn.value = false
}
</script>

<style scoped lang="sass">
.q-field--outlined
  :deep() .q-field__control
    border-radius: .6rem

.custom-grid
  display: grid
  align-items: center
  grid-template-columns: auto 1fr 1fr 1fr 1fr 1fr 1fr auto
  gap: 1rem 2.5rem
  align-items: start

@media (max-width: 1279px)
  .custom-grid
    display: none
</style>
