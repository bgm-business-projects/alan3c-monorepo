<template>
  <div class="flex gap-2rem w-full">
    <div class="w-150px aspect-3/4 overflow-hidden flex justify-center items-center">
      <nuxt-img class="min-w-full min-h-full object-cover" :src="combineImageUrl(props.data.mainImage.filename_disk)" />
    </div>
    <div class="flex flex-col justify-center gap-.5rem">
      <h3 class="font-bold text-lg">
        {{ props.data.translations.name }}
      </h3>
      <p>
        {{ props.data.translations.topic }}
      </p>
      <p>
        {{ props.data.translations.graduation }}
      </p>
    </div>
    <div class="flex flex-col justify-center gap-.5rem">
      <h3 class="font-bold text-lg">
        {{ props.data.translations.title }}
      </h3>
      <p>
        E-Mail : {{ props.data.email }}
      </p>
      <p>
        Web : {{ props.data.web }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TraineeList } from '~/contract/trainee/trainee.type'
import type { NormalizeTranslations } from '~/contract/utils/translation.type'
import { combineImageUrl } from '../../utils/combine-image-url'

interface Props {
  data: NormalizeTranslations<TraineeList['data'][number]>;
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()
</script>

<style scoped lang="sass">
</style>
