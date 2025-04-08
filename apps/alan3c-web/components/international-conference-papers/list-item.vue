<template>
  <div class="flex">
    <div class="flex flex-nowrap">
      <div class="flex flex-nowrap">
        <span>{{ props.index }}.</span>
        <span class="w-5px" />
      </div>
      <div>
        <span v-if="props.data.author">
          {{ props.data.author }}
        </span>
        <span v-if="props.data.publicationYear">, ({{ props.data.publicationYear }})</span>
        <span v-if="props.data.title">: "{{ props.data.title }},"</span>
        <span v-if="props.data.publicationConference">{{ props.data.publicationConference }}</span>
        <span v-if="props.data.location ">, {{ props.data.location }}</span>
        <span v-if="props.data.date">, {{ dayjs(props.data.date).format('MMM YYYY') }}</span>
        <span v-if="props.data.numPages">, {{ props.data.numPages }}</span>
        .
        <!-- <span v-if="props.data.author">{{ props.data.author }}</span>
        <span v-if="props.data.publicationYear">, ({{ props.data.publicationYear }})</span>
        <span v-if="props.data.title">: "{{ props.data.title }},"</span>
        <span v-if="props.data.publicationConference">{{ props.data.publicationConference }}</span>
        <span v-if="props.data.location ">, {{ props.data.location }}</span>
        <span v-if="props.data.date">, {{ dayjs(props.data.date).format('MMM YYYY') }}</span>
        <span v-if="props.data.numPages">, {{ props.data.numPages }}.</span> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InternationalConferencePapers } from '../../contract/bibliography/international-conference-papers/international-conference-papers.type'

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
