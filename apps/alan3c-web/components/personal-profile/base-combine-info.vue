<template>
  <div
    class="w-full"
  >
    <div v-if="transferData">
      <span class="whitespace-pre-line">{{ transferData?.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { JournalEditor } from '~/contract/personal-profile/academic-activities/journal-editor/journal-editor.type'

interface Props {
  data: JournalEditor['data'][number];
}

const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { t, locale } = useI18n()

const transferData = computed(() => {
  return props.data.translations.find((item) => item.journalEditorLanguages_code === locale.value)
})
</script>

<style scoped lang="sass">
:deep()
  table
    max-width: 100%
</style>
