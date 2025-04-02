<template>
  <nuxt-link
    class="flex flex-col items-center gap-1.3rem"
    :to="localePath({
      name: 'home-life-snippets-category-more',
      params: {
        category: props.category,
        more: props.name,
      },
      query: {
        id: props.targetId,
      },
    })"
  >
    <div class="flex items-center justify-center relative w-full bg-#f4f4f4">
      <nuxt-img v-if="props.mainImage" :src="props.mainImage" class="min-w-full min-h-full object-contain" />
    </div>
    <div v-if="props.name" class="bg-accent px-.5rem py-.5rem rounded-.7rem">
      <div class="border-warning border-dashed border-1px w-full py-.2rem px-.8rem rounded-.5rem">
        {{ props.name }}
      </div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
interface Props {
  mainImage?: string;
  category?: string;
  name?: string;
  targetId: number;
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const localePath = useLocalePath()
</script>

<style scoped lang="sass">
</style>
