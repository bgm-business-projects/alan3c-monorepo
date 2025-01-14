<template>
  <div class="flex gap-2rem w-full flex-col lg:flex-row">
    <div class="w-150px aspect-3/4 overflow-hidden flex justify-center items-center">
      <nuxt-img class="min-w-full min-h-full object-cover" :src="combineImageUrl(props.data.mainImage.filename_disk)" />
    </div>
    <div class="flex flex-col justify-center gap-.5rem flex-1">
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
    <div class="flex flex-col justify-center gap-.5rem flex-1">
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
    <div class="flex items-center">
      <a
        v-if="props.data.file?.id"
        :href="downloadHref"
        :style="writingModeStyle"
        class="bg-accent rounded-.5rem text-direction"
        :class="
          locale === 'zh' ? ['tracking-.5rem', 'pt-1.1rem', 'pb-.7rem', 'px-.4rem']
          : locale === 'en' ? ['tracking-.05rem', 'py-.3rem', 'px-1rem']
            : []"
      >
        {{ t('download') }}
      </a>
      <div v-else class="w-30px h-30px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { TraineeList } from '../../contract/trainee/trainee.type'
import type { NormalizeTranslations } from '../../contract/utils/translation.type'
import { combineImageUrl } from '../../utils/combine-image-url'

const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { t } = useI18n()

const { locale } = useI18n()

interface Props {
  data: NormalizeTranslations<TraineeList['data'][number]>;
}

const config = useRuntimeConfig()
const downloadHref = computed(() => `${config.public.apiBaseUrl}/assets/${props.data.file?.id}?download`)

const writingModeStyle = computed(() => {
  if (locale.value === 'zh') {
    return {
      writingMode: 'vertical-lr' as CSSProperties['writingMode'],
    }
  }
  if (locale.value === 'en') {
    return {
      writingMode: 'horizontal-tb' as CSSProperties['writingMode'],
    }
  }
  return {
    writingMode: 'horizontal-tb' as CSSProperties['writingMode'],
  }
})

// const useTrainee = useTraineeApi()

// async function download() {
//   const [err, result] = await to (useTrainee.downloadFile(props.data.file.id))
//   if (err) {
//     return Promise.reject(err)
//   }
//   console.log('file', result)
//   return result
// }
</script>

<style scoped lang="sass">
@media (max-width: 1024px)
  .text-direction
    writing-mode: horizontal-tb !important
    padding: 6px 15px !important
    letter-spacing: 3px
</style>
