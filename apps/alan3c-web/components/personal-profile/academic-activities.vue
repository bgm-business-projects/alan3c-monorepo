<template>
  <div
    class="w-full flex flex-col gap-4rem"
  >
    <div class="flex flex-col gap-1.5rem">
      <h2
        class="text-xl font-semibold"
      >
        {{ t('academicActivities.journalEditor') }}
      </h2>
      <div class="flex flex-col gap-1rem">
        <template v-if="props.data.journalEditor.data.length && props.data.journalEditor.data.length > 0">
          <div v-for="(item, index) in props.data.journalEditor.data" :key="item.id" class="flex flex-nowrap gap-.5rem">
            <span>{{ index + 1 }}.</span>
            <span class="whitespace-pre-line">
              {{ item.translations.find((item) => item.journalEditorLanguages_code === locale)?.title }}
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
    </div>
    <div class="flex flex-col gap-1.5rem">
      <h2
        class="text-xl font-semibold"
      >
        {{ t('academicActivities.paperReviewer') }}
      </h2>
      <div class="flex flex-col gap-1rem">
        <template v-if="props.data.paperReviewer.data.length && props.data.paperReviewer.data.length > 0">
          <div v-for="(item, index) in props.data.paperReviewer.data" :key="item.id" class="flex flex-nowrap gap-.5rem">
            <span>{{ index + 1 }}.</span>
            <span class="whitespace-pre-line">
              {{ item.translations.find((item) => item.paperReviewerLanguages_code === locale)?.title }}
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
    </div>
    <div class="flex flex-col gap-1.5rem">
      <h2
        class="text-xl font-semibold"
      >
        {{ t('academicActivities.committeeMember') }}
      </h2>
      <div class="flex flex-col gap-1rem">
        <template v-if="props.data.committeeMember.data.length && props.data.committeeMember.data.length > 0">
          <div v-for="(item, index) in props.data.committeeMember.data" :key="item.id" class="flex flex-nowrap gap-.5rem">
            <span>{{ index + 1 }}.</span>
            <span class="whitespace-pre-line">
              {{ item.translations.find((item) => item.committeeMemberLanguages_code === locale)?.title }}
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommitteeMember } from '~/contract/personal-profile/academic-activities/committee-member/committee-member.type'
import type { JournalEditor } from '~/contract/personal-profile/academic-activities/journal-editor/journal-editor.type'
import type { PaperReviewer } from '~/contract/personal-profile/academic-activities/paper-reviewer/paper-reviewer.type'

interface Props {
  data: {
    journalEditor: JournalEditor;
    paperReviewer: PaperReviewer;
    committeeMember: CommitteeMember;
  };
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
