<template>
  <div class="flex w-full border rounded-.5rem relative">
    <div class="bg-[#f4f4f4] flex justify-center py-.4rem px-1rem font-medium w-full">
      {{ transformedData.translations?.name }}
    </div>
    <div class="py-.6rem px-1rem">
      <div class="custom-grid">
        <div>
          {{ t('researchPlan.timePeriod') }}
        </div>
        <div class="border-r-1px border-solid border-#DBDBDB h-13px" />
        <div>
          {{ transformedData?.startDate }} - {{ transformedData?.endDate }}
        </div>
        <div>
          {{ t('researchPlan.sponsor') }}
        </div>
        <div class="border-r-1px border-solid border-#DBDBDB h-13px" />
        <div>
          {{ transformedData.translations?.sponsor }}
        </div>
        <div>
          {{ t('researchPlan.grantNumber') }}
        </div>
        <div class="border-r-1px border-solid border-#DBDBDB h-13px" />
        <div>
          {{ transformedData?.referenceNumber }}
        </div>
      </div>
    </div>
    <div class="absolute left-0 top-0 bg-accent border translate-x-[-40%] translate-y-[-40%] px-.5rem pt-.1rem pb-.2rem rounded-.3rem">
      {{ props.index }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResearchPlan } from '~/contract/research-plan/research-plan.type'

interface Props {
  data: ResearchPlan['data'][number];
  index: number;
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
    translations: props.data.translations.filter((item) => item.researchPlanLanguages_code === locale.value)[0],
  }
})

const { t } = useI18n()
</script>

<style scoped lang="sass">
.custom-grid
  display: grid
  align-items: center
  grid-template-columns: repeat(3, auto)
  gap: .4rem 1rem
</style>
