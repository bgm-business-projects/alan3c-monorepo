<template>
  <div class="flex w-full border rounded-.5rem overflow-hidden">
    <div class="bg-[#fdfdfd] flex flex-col w-full p-1rem gap-1.3rem">
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('lecturePPT.numberValue') }}
          </div>
        </div>
        <div class="text-#767676">
          {{ Number(index) + offset + 1 }}
        </div>
      </div>
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('lecturePPT.date') }}
          </div>
        </div>
        <div class="text-#767676">
          {{ props.data.uploadDate }}
        </div>
      </div>
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('lecturePPT.title') }}
          </div>
        </div>
        <div class="text-#767676 underline" @click="addDownloadCount('lecturePPT', props.data.id.toString())">
          {{ props.data.lectureTitle }}
        </div>
      </div>
      <div class="flex flex-col gap-.1rem">
        <div class="flex items-center gap-.5rem">
          <div class="w-6px h-6px bg-primary rounded-full" />
          <div class="tracking-1px font-medium">
            {{ t('lecturePPT.downloads') }}
          </div>
        </div>
        <div class="text-#767676">
          {{ props.data.downloadCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LecturePpt } from '~/contract/lecture-ppt/lecture-ppt.type'

interface Props {
  data: LecturePpt['data'][number];
  index: number;
  offset: number;
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const useLecturePpt = useLecturePptApi()
async function addDownloadCount(collection: string, id: string) {
  const [err, result] = await to (useLecturePpt.addDownloadCount({
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
</script>

<style scoped lang="sass">
.custom-grid
  display: grid
  align-items: center
  grid-template-columns: repeat(3, auto)
  gap: .4rem 1rem
</style>
