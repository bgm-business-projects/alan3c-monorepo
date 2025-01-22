<template>
  <div class="w-full">
    <base-wysiwyg-preview
      v-if="props.content"
      class="w-full"
      :html-code="props.content"
    />
    <div v-else>
      notFound
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseWysiwygPreview from '../wysiwyg-preview/base-wysiwyg-preview.vue'

interface Props {
  content?: string;
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()
</script>

<style scoped>
</style>
