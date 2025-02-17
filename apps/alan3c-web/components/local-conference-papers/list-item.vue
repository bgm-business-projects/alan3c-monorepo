<template>
  <div class="flex">
    <div class="flex flex-nowrap">
      <div class="flex flex-nowrap">
        <span>{{ props.index }}.</span>
        <span class="w-5px" />
      </div>
      <div class="flex">
        <span>{{ props.data.author }}</span>
        <span>{{ props.data.publicationYear }}</span>
        <span>{{ props.data.title }}</span>
        <span>{{ props.data.publicationConference }}</span>
        <span>{{ props.data.location }}</span>
        <span>{{ dayjs(props.data.date).format('MMM. YYYY') }}</span>
        <span>{{ props.data.numPages }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LocalConferencePapers } from '~/contract/bibliography/local-conference-papers.type'

const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const dayjs = useDayjs()
dayjs.locale('en')

const { t } = useI18n()

const { locale } = useI18n()

interface Props {
  data: LocalConferencePapers['data'][number];
  index: number;
}
</script>

<style scoped lang="sass">
</style>
