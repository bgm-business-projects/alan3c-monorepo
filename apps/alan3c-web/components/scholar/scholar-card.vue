<template>
  <div
    class="flex gap-1rem flex-col lg:flex-row flex-nowrap card w-full"
  >
    <div class="w-full lg:w-10rem aspect-3/4 border overflow-hidden relative">
      <nuxt-img
        :src="combineImageUrl(props.data.mainImage.filename_disk)"
        class="w-full absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%]"
      />
    </div>
    <div class="py-1rem px-1rem lg:px-1.5rem border bg-[#fdfdfd] flex-1 flex flex-col gap-1rem justify-center rounded-.7rem">
      <div class="flex w-full gap-1rem lg:flex-row flex-col">
        <div class="flex flex-col flex-1 items-start gap-1rem">
          <div class="font-semibold text-lg">
            {{ transformedData.translations?.name }}
          </div>
          <div class="flex flex-col gap-.6rem items-start">
            <div class="bg-accent px-1rem py-.2rem rounded-.5rem font-medium">
              來自 | {{ transformedData.translations?.comeFrom }}
            </div>
            <div class="bg-accent px-1rem py-.2rem rounded-.5rem font-medium">
              專長 | {{ transformedData.translations?.expertise }}
            </div>
          </div>
        </div>
        <div class="font-medium">
          期間：{{ transformedData.startAt }} 至 {{ transformedData.endAt }}
        </div>
      </div>
      <q-separator class="mt-.5rem" />
      <div class="font-medium">
        E-Mail | {{ transformedData.email }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ScholarData } from '~/contract/scholar/scholar.type'
import { combineImageUrl } from '../../utils/combine-image-url'

interface Props {
  data: ScholarData['data'][number];
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { locale } = useI18n()

const transformedData = computed(() => {
  return {
    ...props.data,
    translations: props.data.translations.find((item) => item.scholarLanguages_code === locale.value),
  }
})
</script>

<style lang="sass" scoped>
.card
  border: solid 1px #E1E1E1
  border-radius: .8rem
  overflow: hidden
  padding: .6rem
</style>
