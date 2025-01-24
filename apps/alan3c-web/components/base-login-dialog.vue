<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin p-1rem">
      <q-form
        @submit="handleLogin"
      >
        <div class="flex flex-col gap-1rem p-.7rem">
          <div class="text-lg font-medium">
            此頁面需驗證身份
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

const emit = defineEmits([
  ...useDialogPluginComponent.emits,
  'submit-credentials',
])

const account = ref<string>('')
const password = ref<string>('')

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

// 處理登入
async function handleLogin() {
  emit('submit-credentials', {
    account: `${account.value}@gmail.com`,
    password: password.value,
  })
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
