<template>
  <div
    class="w-full flex flex-col gap-1rem"
  >
    <template v-if="props.data.length && props.data.length > 0">
      <div v-for="(item, index) in props.data" :key="item.id" class="flex flex-nowrap gap-.5rem">
        <span>{{ index + 1 }}.</span>
        <span>
          <base-combine-info :data="item" />
        </span>
      </div>
    </template>
    <div
      v-else
      class="bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem font-medium text-lg text-#666"
      :class="locale === 'zh' ? ['tracking-.1rem']
        : locale === 'en' ? ['tracking-.05rem']
          : []"
    >
      {{ t('notFound') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { JournalEditor } from '~/contract/personal-profile/academic-activities/journal-editor/journal-editor.type'
import BaseCombineInfo from '~/components/personal-profile/base-combine-info.vue'

interface Props {
  data: JournalEditor['data'];
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { t, locale } = useI18n()
</script>

<style scoped lang="sass">
</style>
