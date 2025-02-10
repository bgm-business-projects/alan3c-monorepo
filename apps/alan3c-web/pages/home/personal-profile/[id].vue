<template>
  <div class="flex-1 flex flex-col items-center gap-3rem max-w-full">
    <div class="w-full flex flex-col lg:flex-row gap-3rem">
      <div class="flex flex-col gap-5rem flex-1 w-full relative">
        <div v-if="isLoading" class="w-full h-300px">
          <q-inner-loading :showing="isLoading" />
        </div>
        <base-info
          v-else
          :data="personalProfile?.translations?.content"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInfo from '~/components/personal-profile/base-info.vue'
import { usePersonalProfileApi } from '~/composables/use-personal-profile'
import { isAcademicActivities } from '~/contract/personal-profile/academic-activities/academic-activities.type'
import { isAcademicRecognition } from '~/contract/personal-profile/academic-recognition/academic-recognition.type'
import { isCoursesTaught } from '~/contract/personal-profile/courses-taught/courses-taught.type'
import { isCurriculumVitae } from '~/contract/personal-profile/curriculum-vitae/curriculum-vitae.type'
import { isPatentApplication } from '~/contract/personal-profile/patent-application/patent-application.type'
import { isResume } from '~/contract/personal-profile/resume/resume.type'
import { isServicesToPractitionersCommunity } from '~/contract/personal-profile/services-to-practitioners-community/services-to-practitioners-community.type'

const route = useRoute()
const { locale } = useI18n()

const usePersonalProfile = usePersonalProfileApi()

const isLoading = ref(false)

const { data: personalProfile, refresh: refreshPersonalProfile } = useLazyAsyncData('personal-profile', async () => {
  isLoading.value = true
  if (route.params.id === 'resume') {
    const [err, result] = await to (usePersonalProfile.findResume())
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return result
  }

  if (route.params.id === 'curriculumVitae') {
    const [err, result] = await to (usePersonalProfile.findCurriculumVitae())
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return result
  }

  if (route.params.id === 'academicActivities') {
    const [err, result] = await to (usePersonalProfile.findAcademicActivities())
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return result
  }

  if (route.params.id === 'academicRecognition') {
    const [err, result] = await to (usePersonalProfile.findAcademicRecognition())
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return result
  }

  if (route.params.id === 'coursesTaught') {
    const [err, result] = await to (usePersonalProfile.findCoursesTaught())
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return result
  }

  if (route.params.id === 'patentApplication') {
    const [err, result] = await to (usePersonalProfile.findPatentApplication())
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return result
  }

  if (route.params.id === 'servicesToPractitionersCommunity') {
    const [err, result] = await to (usePersonalProfile.findServicesToPractitionersCommunity())
    console.log('result', isServicesToPractitionersCommunity(result))
    if (err) {
      isLoading.value = false
      return Promise.reject(err)
    }
    isLoading.value = false
    return result
  }
}, {
  transform: (data) => {
    if (isResume(data)) {
      return {
        ...data?.data,
        translations: data?.data.translations.filter((item) => item.resumeLanguages_code === locale.value)[0],
      }
    }
    if (isCurriculumVitae(data)) {
      return {
        ...data?.data,
        translations: data?.data.translations.filter((item) => item.curriculumVitaeLanguages_code === locale.value)[0],
      }
    }
    if (isAcademicActivities(data)) {
      return {
        ...data?.data,
        translations: data?.data.translations.filter((item) => item.academicActivitiesLanguages_code === locale.value)[0],
      }
    }
    if (isAcademicRecognition(data)) {
      return {
        ...data?.data,
        translations: data?.data.translations.filter((item) => item.academicRecognitionLanguages_code === locale.value)[0],
      }
    }
    if (isCoursesTaught(data)) {
      return {
        ...data?.data,
        translations: data?.data.translations.filter((item) => item.coursesTaughtLanguages_code === locale.value)[0],
      }
    }
    if (isPatentApplication(data)) {
      return {
        ...data?.data,
        translations: data?.data.translations.filter((item) => item.patentApplicationLanguages_code === locale.value)[0],
      }
    }
    if (isServicesToPractitionersCommunity(data)) {
      return {
        ...data?.data,
        translations: data?.data.translations.filter((item) => item.servicesToPractitionersCommunityLanguages_code === locale.value)[0],
      }
    }
  },
  watch: [locale],
})

useSeoMeta({
  title: '個人資料',
  description: '個人資料',
  keywords: '個人資料',
  ogTitle: '個人資料',
  ogDescription: '個人資料',
})

definePageMeta({
  layout: 'home-personal-profile',
})
</script>

<style scoped lang="sass">
</style>
