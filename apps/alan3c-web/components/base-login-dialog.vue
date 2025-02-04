<template>
  <q-dialog
    ref="dialogRef"
    :persistent="props.target !== 'InternationalJournalPapersCreator'"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin p-1rem">
      <q-form
        @submit="loginAndGetData(props.target)"
      >
        <div class="flex flex-col gap-1rem p-.7rem">
          <div class="text-lg font-medium">
            <template v-if="props.target === 'InternationalJournalPapersCreator'">
              新增資料需驗證身份
            </template>
            <template v-else>
              此頁面需驗證身份
            </template>
          </div>
          <div class="text-#666">
            請輸入帳號密碼
          </div>
          <q-input
            v-model="account"
            label="帳號"
            lazy-rules
            outlined
          />
          <q-input
            v-model="password"
            label="密碼"
            lazy-rules
            outlined
          />
        </div>
        <div class="p-.7rem">
          <q-btn label="送出" type="submit" outline />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

interface Props {
  target: 'Bibliography' | 'SubmittedPapers' | 'InternationalJournalPapers' | 'InternationalJournalPapersCreator';
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits([
  ...useDialogPluginComponent.emits,
  'get-bibliography-data',
  'get-submitted-papers-data',
  'get-international-journal-papers',
  'login-international-journal-papers-creator',
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

// 處理登入
const account = ref<string>('')
const password = ref<string>('')

const $q = useQuasar()
const authStore = useAuthStore()

async function loginAndGetData(target: 'Bibliography' | 'SubmittedPapers' | 'InternationalJournalPapers' | 'InternationalJournalPapersCreator') {
  if (props.target === 'Bibliography') {
    const [loginError, loginResult] = await to(authStore.loginBibliography(`${account.value}@gmail.com`, password.value))
    if (loginError) {
      $q.notify({
        message: loginError.message,
        position: 'center',
        color: 'red',
      })
    }
    const [getDataError, getDataResult] = await to(authStore.fetchBibliography())
    if (getDataError) {
      throw getDataError
    }
    emit('get-bibliography-data', getDataResult)
    return getDataResult
  }

  else if (props.target === 'SubmittedPapers') {
    const [loginError, loginResult] = await to(authStore.loginSubmittedPapers(`${account.value}@yahoo.com.tw`, password.value))
    if (loginError) {
      $q.notify({
        message: loginError.message,
        position: 'center',
        color: 'red',
      })
    }
    const [getDataError, getDataResult] = await to(authStore.fetchSubmittedPapers())

    if (getDataError) {
      throw getDataError
    }
    emit('get-submitted-papers-data', getDataResult)
    return getDataResult
  }

  else if (props.target === 'InternationalJournalPapers') {
    const [loginError, loginResult] = await to(authStore.loginBibliography(`${account.value}@gmail.com`, password.value))
    if (loginError) {
      $q.notify({
        message: loginError.message,
        position: 'center',
        color: 'red',
      })
    }
    const [getDataError, getDataResult] = await to(authStore.fetchInternationalJournalPapers())

    if (getDataError) {
      throw getDataError
    }
    emit('get-international-journal-papers', getDataResult)
    return getDataResult
  }

  else if (props.target === 'InternationalJournalPapersCreator') {
    const [loginError, loginResult] = await to(authStore.loginInternationalJournalPapersCreator(`${account.value}@gmail.com`, password.value))
    if (loginError) {
      $q.notify({
        message: loginError.message,
        position: 'center',
        color: 'red',
      })
      throw new Error(loginError.message)
    }
    emit('login-international-journal-papers-creator', loginResult)
  }
}
</script>

<style lang="sass">
.q-dialog__inner--minimized
  padding: 0px 5%
.q-dialog__inner--minimized > div
  max-width: 80rem !important
.q-dialog__backdrop
  background-color: rgba(0, 0, 0, .5)
</style>
