<template>
  <div class="flex w-full border rounded-.5rem overflow-hidden">
    <div class="bg-[#fdfdfd] flex flex-col w-full p-1rem gap-1.3rem">
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('artificialIntelligenceSeminar.date') }}
          </div>
        </div>
        <div class="text-#767676">
          {{ props.data.reportDate }}
        </div>
      </div>
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('artificialIntelligenceSeminar.titleOfPaper') }}
          </div>
        </div>
        <div class="text-#767676">
          {{ props.data.thesisTitle }}
        </div>
      </div>
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('artificialIntelligenceSeminar.journalOfPaper') }}
          </div>
        </div>
        <div class="text-#767676">
          {{ props.data.academicJournal }}
        </div>
      </div>
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('artificialIntelligenceSeminar.authorOfThePaper') }}
          </div>
        </div>
        <div class="text-#767676">
          {{ props.data.paperAuthor }}
        </div>
      </div>
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('artificialIntelligenceSeminar.reporter') }}
          </div>
        </div>
        <div class="text-#767676">
          {{ props.data.reporter }}
        </div>
      </div>
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('imageProcessingSeminar.file') }}
          </div>
        </div>
        <div class="text-#767676 underline cursor-pointer" @click="addDownloadCount('artificialIntelligence', props.data.id.toString())">
          {{ t('downloadFile') }}
        </div>
      </div>
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('imageProcessingSeminar.video') }}
          </div>
        </div>
        <div class="text-#767676 underline cursor-pointer" @click="openVideoDialog(combineImageUrl(props.data.video?.filename_disk))">
          {{ t('downloadVideo') }}
        </div>
      </div>
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('artificialIntelligenceSeminar.downloads') }}
          </div>
        </div>
        <div class="text-#767676">
          {{ props.data.downloadCount ?? 0 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArtificialIntelligence } from '~/contract/artificial-intelligence/artificial-intelligence.type'
import BaseVideoDialog from '~/components/base-video-dialog.vue'
import { combineImageUrl } from '../../utils/combine-image-url'

interface Props {
  data: ArtificialIntelligence['data'][number];
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const useArtificialIntelligence = useArtificialIntelligenceApi()

async function addDownloadCount(collection: string, id: string) {
  const [err, result] = await to (useArtificialIntelligence.addDownloadCount({
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

const { t } = useI18n()

const $q = useQuasar()
function openVideoDialog(src: string) {
  $q.dialog({
    component: BaseVideoDialog,
    componentProps: {
      src,
    },
  })
}
</script>

<style scoped lang="sass">
.custom-grid
  display: grid
  align-items: center
  grid-template-columns: repeat(3, auto)
  gap: .4rem 1rem
</style>
