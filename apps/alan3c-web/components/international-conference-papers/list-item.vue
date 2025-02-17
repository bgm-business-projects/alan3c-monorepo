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
        <span>{{ dayjs(props.data.date).format('MMM YYYY') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InternationalConferencePapers } from '~/contract/bibliography/international-conference-papers.type'

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
  data: InternationalConferencePapers['data'][number];
  index: number;
}
</script>

<style scoped lang="sass">
</style>
