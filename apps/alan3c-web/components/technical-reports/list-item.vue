<template>
  <div class="flex">
    <div class="flex flex-nowrap gap-.1rem">
      <div class="flex flex-nowrap">
        <span>{{ props.index }}.</span>
      </div>
      <div class="flex">
        <span v-if="props.data.author">{{ props.data.author }}</span>
        <span v-if="props.data.publicationYear" class="block mx-.3rem">( {{ props.data.publicationYear }} ) :</span>
        <span v-if="props.data.title">{{ props.data.title }}</span>
        <span v-if="props.data.date">，{{ dayjs(props.data.date).format('MMMM YYYY') }}</span>
        <span v-if="props.data.numPages">，{{ props.data.numPages }}.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TechnicalReports } from '~/contract/bibliography/technical-reports.type'

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
  data: TechnicalReports['data'][number];
  index: number;
}
</script>

<style scoped lang="sass">
</style>
