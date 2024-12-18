<template>
  <div class="w-full h-full">
    <q-inner-loading
      v-if="isLoading"
      :showing="isLoading"
      :color="props.color"
      class="w-full h-full"
    />
    <nuxt-img
      :src="props.src"
      :alt="props.alt"
      format="webp"
      class="object-cover min-h-full min-w-full"
    />
  </div>
</template>
<script lang="ts" setup>
import { useImage } from '@vueuse/core'

interface Props {
  src: string;
  alt?: string;
  color?: string; 
}
const props = withDefaults(defineProps<Props>(), {
  color: 'black'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
const { isLoading } = useImage({ src: props.src })

</script>