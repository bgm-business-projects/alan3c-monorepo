<template>
  <div
    v-if="props.data"
    class="flex-1"
    v-html="props.data"
  />
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
</style>
