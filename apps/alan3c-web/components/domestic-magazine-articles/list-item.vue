<template>
  <div class="flex">
    <div class="flex flex-nowrap">
      <div class="flex flex-nowrap">
        <span>{{ props.index }}.</span>
        <span class="w-5px" />
      </div>
      <div class="flex">
        <span>{{ props.data.author }}</span>
        <span class="block mr-.5rem">( {{ props.data.publicationYear }} ) : </span>
        <span>"{{ props.data.title }}"</span>
        <span>，{{ props.data.publicationSource }}</span>
        <span>，{{ props.data.volNoPg }}</span>
        <span>，{{ dayjs(props.data.date).format('YYYY年M月') }}</span>
        <span>，{{ props.data.numPages }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DomesticMagazineArticles } from '~/contract/bibliography/domestic-magazine-articles.type'

const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const dayjs = useDayjs()
dayjs.locale('zh')

const { t } = useI18n()

const { locale } = useI18n()

interface Props {
  data: DomesticMagazineArticles['data'][number];
  index: number;
}
</script>

<style scoped lang="sass">
</style>
