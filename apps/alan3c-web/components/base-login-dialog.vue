<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin p-1rem">
      <q-form
        @submit="handleLogin"
      >
        <div class="flex flex-col gap-1.5rem p-.7rem">
          <q-input
            v-model="account"
            label="帳號"
            lazy-rules
            outlined
            dense
          />
          <q-input
            v-model="password"
            label="密碼"
            lazy-rules
            outlined
            dense
          />
        </div>
        <q-btn label="送出" type="submit" />
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
    account: account.value,
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
