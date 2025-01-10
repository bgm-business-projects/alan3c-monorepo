<template>
  <div class="border rounded-.5rem flex flex-col items-center relative">
    <div class="bg-#f4f4f4 w-full flex justify-center py-.4rem px-1rem text-md font-medium rounded-t-.5rem overflow-hidden">
      {{ transformedData.translations.name }}
    </div>
    <div class="flex flex-col items-center p-1rem gap-.5rem text-#666666 rounded-b-.5rem">
      <div class="flex gap-.5rem items-center">
        <q-icon name="date_range" />
        {{ transformedData.lectureDate }}
      </div>
      <div class="flex gap-.5rem items-center flex-nowrap">
        <q-icon name="location_on" />
        {{ transformedData.translations.location }}
      </div>
    </div>
    <div class="absolute left-0 top-0 bg-accent border translate-x-[-40%] translate-y-[-40%] px-.5rem pt-.1rem pb-.2rem rounded-.3rem">
      {{ props.index }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AcademicLectureRecord } from '~/contract/academic-lecture-record/academic-lecture-record.type'

interface Props {
  index: number;
  data: AcademicLectureRecord['data'][number];
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
    translations: props.data.translations.filter((item) => item.academicLectureRecordLanguages_code === locale.value)[0],
  }
})
</script>

<style scoped lang="sass">
</style>
