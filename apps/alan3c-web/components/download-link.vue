<template>
  <div class="flex gap-2rem w-full">
    <div class="flex items-center">
      <a
        :href="downloadHref"
        class="bg-accent rounded-.5rem"
      >
        下載檔案
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { locale } = useI18n()

interface Props {
  id: string;
}
const config = useRuntimeConfig()
const downloadHref = computed(() => `${config.public.apiBaseCSRUrl}/assets/${props.id}?download`)
</script>

<style scoped lang="sass">
</style>
