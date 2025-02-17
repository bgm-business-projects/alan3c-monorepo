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
    <!-- (二) 近年內參與之學術活動 -->
    <div class="flex flex-col gap-1.5rem">
      <h2
        class="text-xl font-semibold"
      >
        {{ t('academicActivities.academicActivity') }}
      </h2>
      <div class="flex flex-col gap-1rem">
        <template v-if="props.data.academicActivity.data.length && props.data.academicActivity.data.length > 0">
          <q-list>
            <q-expansion-item
              v-for="(item, index) in props.data.academicActivity.data" :key="item.id"
              expand-separator
              :label="`${index + 1}. ${item.translations.find((item) => item.academicActivityLanguages_code === locale)?.text}`"
            >
              <q-card class="flex flex-col gap-.1rem">
                <q-card-section class="flex flex-col gap-1rem">
                  <div
                    v-for="content in item.itemList.slice().sort((a, b) => {
                      const dateA = a.academicActivityItem_id.sortDate ? new Date(a.academicActivityItem_id.sortDate).getTime() : Number.MAX_SAFE_INTEGER;
                      const dateB = b.academicActivityItem_id.sortDate ? new Date(b.academicActivityItem_id.sortDate).getTime() : Number.MAX_SAFE_INTEGER;
                      return dateB - dateA;
                    })"
                    :key="content.academicActivityItem_id.translations.find((item) => item.academicActivityItemLanguages_code === locale)?.id"
                    class="flex flex-nowrap items-start gap-.7rem"
                  >
                    <span class="text-7px pt-.3rem">
                      ■
                    </span>
                    <span>
                      {{ content.academicActivityItem_id.translations.find((item) => item.academicActivityItemLanguages_code === locale)?.text }}
                    </span>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>

          <!-- <div v-for="(item, index) in props.data.academicActivity.data" :key="item.id" class="flex flex-nowrap gap-.5rem">
            <span>{{ index + 1 }}.</span>
            <span class="whitespace-pre-line">
              {{ item.translations.find((item) => item.paperReviewerLanguages_code === locale)?.title }}
            </span>
          </div> -->
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
      <div class="font-medium text-base text-#333">
        {{ props.data.paperReviewerExtension.data.translations.find((item) => item.paperReviewerExtensionLanguages_code === locale)?.text }}
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
    <div class="flex flex-col gap-1.5rem">
      <h2
        class="text-xl font-semibold"
      >
        {{ t('academicActivities.societyDirector') }}
      </h2>
      <div class="flex flex-col gap-1rem">
        <template v-if="props.data.societyDirector.data.length && props.data.societyDirector.data.length > 0">
          <div v-for="(item, index) in props.data.societyDirector.data" :key="item.id" class="flex flex-nowrap gap-.5rem">
            <span>{{ index + 1 }}.</span>
            <span class="whitespace-pre-line">
              {{ item.translations.find((item) => item.societyDirectorLanguages_code === locale)?.title }}
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
        {{ t('academicActivities.consultantRole') }}
      </h2>
      <div class="flex flex-col gap-1rem">
        <template v-if="props.data.consultantRole.data.length && props.data.consultantRole.data.length > 0">
          <div v-for="(item, index) in props.data.consultantRole.data" :key="item.id" class="flex flex-nowrap gap-.5rem">
            <span>{{ index + 1 }}.</span>
            <span class="whitespace-pre-line">
              {{ item.translations.find((item) => item.consultantRoleLanguages_code === locale)?.title }}
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
        {{ t('academicActivities.academicGroup') }}
      </h2>
      <div class="flex flex-col gap-1rem">
        <template v-if="props.data.academicGroup.data.length && props.data.academicGroup.data.length > 0">
          <div v-for="(item, index) in props.data.academicGroup.data" :key="item.id" class="flex flex-nowrap gap-.5rem">
            <span>{{ index + 1 }}.</span>
            <span class="whitespace-pre-line">
              {{ item.translations.find((item) => item.academicGroupLanguages_code === locale)?.title }}
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

    <!-- (八) 出席國際學術會議 -->
    <div class="flex flex-col gap-1.5rem">
      <h2
        class="text-xl font-semibold"
      >
        {{ t('academicActivities.conferenceAttendee') }}
      </h2>
      <div class="flex flex-col gap-1rem">
        <template v-if="props.data.conferenceAttendee.data.length && props.data.conferenceAttendee.data.length > 0">
          <table>
            <tr>
              <th>編號</th>
              <th>會議名稱</th>
              <th>發表論文數</th>
              <th>地點</th>
              <th>時間</th>
            </tr>
            <tr v-for="(item, index) in props.data.conferenceAttendee.data" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.translations.find((item) => item.conferenceAttendeeLanguages_code === locale)?.conferenceName }}</td>
              <td>{{ item.publishedPapers }}</td>
              <td>{{ item.translations.find((item) => item.conferenceAttendeeLanguages_code === locale)?.location }}</td>
              <td>{{ dayjs(item.sortDate).format('YYYY.MM') }}</td>
            </tr>
          </table>
          <!-- <div v-for="(item, index) in props.data.conferenceAttendee.data" :key="item.id" class="flex flex-nowrap gap-.5rem">
            <span>{{ index + 1 }}.</span>
            <span class="whitespace-pre-line">
              {{ item.translations.find((item) => item.conferenceAttendeeLanguages_code === locale)?.conferenceName }}
            </span>
          </div> -->
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
import type { AcademicActivitiesData } from '~/contract/personal-profile/academic-activities/academic-activities.type'

interface Props {
  data: AcademicActivitiesData;
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { t, locale } = useI18n()

const dayjs = useDayjs()
</script>

<style scoped lang="sass">
table, td, th
  border: 1px solid #ddd
  text-align: left

table
  border-collapse: collapse
  width: 100%

th, td
  padding: 8px 15px

:deep() .q-item__label
  font-size: 16px !important
  font-weight: 700

// :deep() .q-list--bordered
//   border: none !important
</style>
