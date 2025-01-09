<template>
  <div
    class="w-full"
  >
    <div
      v-if="props.data"
      class="w-full"
      v-html="props.data"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: string | null | undefined;
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()
</script>

<style scoped lang="sass">
:deep()
  table
    max-width: 100%
</style>
