<template>
  <div class="flex">
    <div class="flex flex-nowrap">
      <div class="flex flex-nowrap">
        <span>{{ props.index }}.</span>
        <span class="w-5px" />
      </div>
      <div>
        <span v-if="props.data.author">
          {{ props.data.author }}
        </span>
        <span v-if="props.data.publicationYear">
          ,({{ props.data.publicationYear }})
        </span>
        <span v-if="props.data.title ">
          : "{{ props.data.title }}"
        </span>
        <span v-if="props.data.publicationSource" class="text-italic">
          {{ props.data.publicationSource }}
        </span>
        <span v-if="props.data.volNoPg">
          , {{ props.data.volNoPg }}
        </span>
        .
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookChapters } from '../../contract/bibliography/book-chapters/book-chapters.type'

const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { t } = useI18n()

const { locale } = useI18n()

interface Props {
  data: BookChapters['data'][number];
  index: number;
}
</script>

<style scoped lang="sass">
</style>
