<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin !rounded-.8rem">
      <q-form
        @submit="createInternationalJournalPapers(transferData)"
      >
        <div class="flex flex-col gap-1rem">
          <div class="text-lg font-medium bg-primary py-.8rem px-1.5rem text-white">
            International Journal 上傳系統
          </div>
          <div class="grid grid-cols-[auto_1fr] items-center gap-1rem px-1.5rem pt-.5rem pb-.5rem">
            <div>作者</div>
            <q-input v-model="data.author" outlined dense />
            <div>論文標題</div>
            <q-input v-model="data.titleOfThePaper" outlined dense />
            <div>期刊名稱</div>
            <q-input v-model="data.journalName" outlined dense />
            <div>Vol.</div>
            <q-input v-model="data.vol" outlined dense />
            <div>No.</div>
            <q-input v-model="data.no" outlined dense />
            <div>pp.</div>
            <q-input v-model="data.pp" outlined dense />
            <div>年</div>
            <q-input v-model="data.year" outlined dense placeholder="( YYYY )" />
            <div>月</div>
            <q-input v-model="data.month" outlined dense placeholder="( MM )" />
            <div>日</div>
            <q-input v-model="data.day" outlined dense placeholder="( DD )" />
            <div>檔案</div>
            <q-file v-model="data.file" outlined label="檔案" dense />
            <div>狀態</div>
            <q-select v-model="status" outlined :options="options" dense />
          </div>
          <div class="p-1.5rem pt-0 flex justify-end">
            <q-btn label="送出" type="submit" outline />
          </div>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { InternationalJournalPapersCreateInput } from '~/contract/international-journal-papers/international-journal-papers.type'
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

interface Props {
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits([
  ...useDialogPluginComponent.emits,
  'create-data',
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const autStore = useAuthStore()
const { internationalJournalPapersCreatorToken } = storeToRefs(autStore)
const useInternationalJournalPapers = useInternationalJournalPapersApi(internationalJournalPapersCreatorToken)

const data = ref<Partial<InternationalJournalPapersCreateInput>>({
  author: '',
  titleOfThePaper: '',
  journalName: '',
  vol: '',
  no: '',
  pp: '',
  year: undefined,
  month: '',
  day: '',
  file: undefined,
})

const status = ref()

const options = [{
  value: 'publication',
  label: '出刊',
}, {
  value: 'onlyAccepted',
  label: '僅接受',
}]

const transferData = computed(() => {
  return {
    ...data.value,
    status: status.value?.value,
  }
})

// async function uploadFile(file: File) {
//   const [error, result] = await to(useInternationalJournalPapers.uploadFile(file))
//   if (error) {
//     throw new Error(error.message)
//   }
//   return result
//   // emit('upload-file', result)
// }

async function createInternationalJournalPapers(data: Partial<InternationalJournalPapersCreateInput>) {
  const [createDataErr, createDataResult] = await to(useInternationalJournalPapers.createData(data))
  if (createDataErr) {
    throw new Error(createDataErr.message)
  }
  emit('create-data', createDataResult)
  return createDataResult
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
