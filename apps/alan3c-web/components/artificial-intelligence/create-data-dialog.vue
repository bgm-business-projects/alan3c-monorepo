<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin !rounded-.8rem">
      <q-form
        @submit="createArtificialIntelligence(data)"
      >
        <div class="flex flex-col gap-1rem">
          <div class="text-lg font-medium bg-primary py-.8rem px-1.5rem text-white">
            Seminar上傳系統
          </div>
          <div class="grid grid-cols-[auto_1fr] items-center gap-1rem px-1.5rem pt-.5rem pb-.5rem">
            <div>報告日期</div>
            <q-input v-model="data.reportDate" outlined dense :rule="[(val: string) => val || '此為必填欄位']">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="data.reportDate" minimal mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="關閉" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-input>
            <div>論文標題</div>
            <q-input v-model="data.thesisTitle" outlined dense :rule="[(val: string) => val || '此為必填欄位']" />
            <div>論文期刊</div>
            <q-input v-model="data.academicJournal" outlined dense :rule="[(val: string) => val || '此為必填欄位']" />
            <div>論文作者</div>
            <q-input v-model="data.paperAuthor" outlined dense />
            <div>報告者</div>
            <q-input v-model="data.reporter" outlined dense />
            <div>檔案</div>
            <q-file v-model="data.file" outlined label="檔案" dense />
            <div>影片</div>
            <q-file v-model="data.video" outlined label="影片" dense />
          </div>
          <div class="p-1.5rem pt-0 flex justify-end gap-1rem ">
            <q-btn v-close-popup label="取消" flat class="rounded-.5rem" />
            <q-btn label="確認送出" type="submit" outline class="rounded-.5rem" />
          </div>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
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
const { artificialIntelligenceCreatorToken } = storeToRefs(autStore)
const useArtificialIntelligence = useArtificialIntelligenceApi(artificialIntelligenceCreatorToken)

const data = ref({
  reportDate: '',
  thesisTitle: '',
  academicJournal: '',
  paperAuthor: '',
  reporter: '',
  file: undefined,
  video: undefined,
})

async function createArtificialIntelligence(inputData: typeof data.value) {
  const [createDataErr, createDataResult] = await to(useArtificialIntelligence.createData(inputData))
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
