<template>
  <div
    class="w-full"
  >
    <base-wysiwyg-preview
      v-if="props.data"
      class="w-full"
      :html-code="props.data"
    />
    <div
      v-else
      class="bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem font-medium text-lg text-#666"
      :class="locale === 'zh' ? ['tracking-.1rem']
        : locale === 'en' ? ['tracking-.05rem']
          : []"
    >
      {{ t('notFound') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseWysiwygPreview from '../wysiwyg-preview/base-wysiwyg-preview.vue'

interface Props {
  data: string | null | undefined;
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { t, locale } = useI18n()
</script>

<style scoped lang="sass">
:deep()
  table
    max-width: 100%
</style>
