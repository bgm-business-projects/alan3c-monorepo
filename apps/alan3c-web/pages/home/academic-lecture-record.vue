<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        學術演講
      </h1>
    </div>

    <div class="max-width custom-grid">
      <div class="text-lg font-medium">
        編號
      </div>
      <div class="text-lg font-medium">
        演講題目
      </div>
      <div class="text-lg font-medium">
        日期
      </div>
      <div class="text-lg font-medium">
        地點
      </div>
      <template
        v-for="(item, index) in academicLectureRecord?.data.transformedData"
        :key="index"
      >
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
    </div>

    <div class="w-full flex flex-col gap-1.5rem xl:hidden">
      <academic-lecture-record-mobile-card
        v-for="(item, index) in academicLectureRecord?.data.originalData?.data"
        :key="index"
        :index="index + 1"
        :data="item"
      />
    </div>

    <!-- <div class="max-width flex flex-col gap-1rem">
      <div class="flex py-.4rem font-medium tracking-.05rem">
        <div class="w-100px">
          編號
        </div>
        <div class="w-350px">
          演講題目
        </div>
        <div class="w-200px">
          日期
        </div>
        <div class="w-300px">
          地點
        </div>
      </div>
      <div class="flex flex-col gap-.8rem tracking-.02rem">
        <div
          v-for="(item, index) in academicLectureRecord?.data"
          :key="index"
          class="flex"
        >
          <div class="w-100px">
            <div>
              {{ Number(index) + 1 }}
            </div>
          </div>
          <div class="w-350px flex">
            <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
              {{ item.translations.name }}
            </div>
          </div>
          <div class="w-200px flex">
            <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
              {{ item.lectureDate }}
            </div>
          </div>
          <div class="w-300px flex">
            <div class="bg-accent px-1rem py-.2rem rounded-.4rem">
              {{ item.translations.location }}
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import AcademicLectureRecordMobileCard from '~/components/academic-lecture-record/academic-lecture-record-mobile-card.vue'
import { useAcademicLectureRecordApi } from '../../composables/use-academic-lecture-record-api'

const useAcademicLectureRecord = useAcademicLectureRecordApi()
const { locale } = useI18n()

const { data: academicLectureRecord, refresh: refreshAcademicLectureRecord } = useLazyAsyncData('academic-lecture-record', async () => {
  const [err, result] = await to (useAcademicLectureRecord.findList())
  if (err) {
    return Promise.reject(err)
  }
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
