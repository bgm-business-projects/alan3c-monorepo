<template>
  <div class="flex">
    <div class="flex flex-nowrap">
      <div class="flex flex-nowrap">
        <span>{{ props.index }}.</span>
        <span class="w-5px" />
      </div>
      <div class="flex">
        <span>{{ props.data.author }}</span>
        <span>{{ props.data.publicationYear }}</span>
        <span>{{ props.data.title }}</span>
        <span>{{ props.data.source }}</span>
        <span>{{ props.data.volNoPg }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LocalJournalPapers } from '~/contract/bibliography/local-journal-papers.type'

const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { t } = useI18n()

const { locale } = useI18n()

interface Props {
  data: LocalJournalPapers['data'][number];
  index: number;
}
</script>

<style scoped lang="sass">
</style>
