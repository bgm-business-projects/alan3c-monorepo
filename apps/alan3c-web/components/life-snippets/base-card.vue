<template>
  <div class="flex flex-col items-center gap-1.3rem w-25%">
    <div class="aspect-4/3 overflow-hidden flex items-center justify-center relative w-full">
      <nuxt-img v-if="props.mainImage" :src="props.mainImage" class="min-w-full min-h-full object-cover absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]" />
    </div>
    <div v-if="props.name" class="bg-accent px-.5rem py-.5rem rounded-.7rem">
      <div class="border-warning border-dashed border-1px w-full py-.2rem px-1.3rem rounded-.5rem">
        {{ props.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  mainImage?: string;
  name?: string;
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()
</script>

<style scoped lang="sass">
</style>
