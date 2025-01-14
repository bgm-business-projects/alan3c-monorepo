<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-1.5rem lg:py-3rem">
    <div class="flex max-width">
      <base-breadcrumbs
        :bread-list="[
          {
            name: t('navbar.home'),
            route: {
              name: 'home',
            },
          },
          {
            name: t('home.scholarlyTalks'),
            route: {
              name: 'home-academic-lecture-record',
            },
          },
        ]"
      />
    </div>
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        {{ t('home.scholarlyTalks') }}
      </h1>
    </div>

    <div class="max-width custom-grid">
      <div class="text-lg font-medium">
        {{ t('scholarlyTalks.grantNumber') }}
      </div>
      <div class="text-lg font-medium">
        {{ t('scholarlyTalks.projectTitle') }}
      </div>
      <div class="text-lg font-medium">
        {{ t('scholarlyTalks.date') }}
      </div>
      <div class="text-lg font-medium">
        {{ t('scholarlyTalks.location') }}
      </div>
      <template v-if="!isLoading">
        <template
          v-for="(item, index) in academicLectureRecord?.data.transformedData"
          :key="index"
        >
          <template v-if="item.translations.name && item.translations.location">
            <div class="flex">
              <div>
                {{ Number(index) + 1 }}
              </div>
            </div>
            <div class="flex">
              <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
                {{ item.translations.name }}
              </div>
            </div>
            <div class="flex">
              <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
                {{ item.lectureDate }}
              </div>
            </div>
            <div class="flex">
              <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
                {{ item.translations.location }}
              </div>
            </div>
          </template>
        </template>
      </template>
    </div>
    <template v-if="isLoading">
      <div class="max-width flex items-center justify-center h-300px relative">
        <q-inner-loading :showing="isLoading" />
      </div>
    </template>
    <template v-else>
      <template
        v-if="!academicLectureRecord?.data.transformedData || !academicLectureRecord?.data.transformedData?.every(item => item.translations.name && item.translations.location)"
      >
        <div
          class="max-width bg-#f4f4f4 flex justify-center py-10rem rounded-.5rem font-medium text-lg text-#666"
          :class="locale === 'zh' ? ['tracking-.1rem']
            : locale === 'en' ? ['tracking-.05rem']
              : []"
        >
          {{ t('notFound') }}
        </div>
      </template>
      <div class="w-full flex flex-col gap-1.5rem xl:hidden">
        <academic-lecture-record-mobile-card
          v-for="(item, index) in academicLectureRecord?.data.originalData?.data"
          :key="index"
          :index="index + 1"
          :data="item"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import AcademicLectureRecordMobileCard from '~/components/academic-lecture-record/academic-lecture-record-mobile-card.vue'
import { useAcademicLectureRecordApi } from '../../composables/use-academic-lecture-record-api'

const useAcademicLectureRecord = useAcademicLectureRecordApi()
const { locale, t } = useI18n()

const isLoading = ref(false)
const { data: academicLectureRecord, refresh: refreshAcademicLectureRecord } = useLazyAsyncData('academic-lecture-record', async () => {
  isLoading.value = true
  const [err, result] = await to (useAcademicLectureRecord.findList())
  if (err) {
    isLoading.value = false
    return Promise.reject(err)
  }
  isLoading.value = false
  return result
}, {
  transform: (data) => {
    const result = data?.data.map((item) => {
      return {
        ...item,
        translations: item.translations.filter((item) => item.academicLectureRecordLanguages_code === locale.value)[0],
      }
    })
    return {
      data: {
        transformedData: result,
        originalData: data,
      },
    }
  },
  watch: [locale],
})

useSeoMeta({
  title: '學術演講',
  description: '學術演講',
  keywords: '學術演講',
  ogTitle: '學術演講',
  ogDescription: '學術演講',
})
</script>

<style scoped lang="sass">
.custom-grid
  display: grid
  align-items: center
  grid-template-columns: auto 1fr auto 1fr
  gap: 1rem 2.5rem
  align-items: start

@media (max-width: 1279px)
  .custom-grid
    display: none
</style>
