import { computed } from 'vue'
import { academicActivitiesContract } from '~/contract/personal-profile/academic-activities'
import { academicRecognitionContract } from '~/contract/personal-profile/academic-recognition'
import { coursesTaughtContract } from '~/contract/personal-profile/courses-taught'
import { curriculumVitaeContract } from '~/contract/personal-profile/curriculum-vitae'
import { resumeContract } from '../contract/personal-profile/resume'

export function usePersonalProfileApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const resumeApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(resumeContract, clientHeader)
  })

  async function findResume() {
    const result = await resumeApi.value.getResume()
    if (result.status === 200) {
      return result.body
    }
  }

  const curriculumVitaeApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(curriculumVitaeContract, clientHeader)
  })

  async function findCurriculumVitae() {
    const result = await curriculumVitaeApi.value.getCurriculumVitae()
    if (result.status === 200) {
      return result.body
    }
  }

  const academicActivitiesApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(academicActivitiesContract, clientHeader)
  })

  async function findAcademicActivities() {
    const result = await academicActivitiesApi.value.getAcademicActivities()
    if (result.status === 200) {
      return result.body
    }
  }

  const academicRecognitionApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(academicRecognitionContract, clientHeader)
  })

  async function findAcademicRecognition() {
    const result = await academicRecognitionApi.value.getAcademicRecognition()
    if (result.status === 200) {
      return result.body
    }
  }

  const coursesTaughtApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(coursesTaughtContract, clientHeader)
  })

  async function findCoursesTaught() {
    const result = await coursesTaughtApi.value.getCoursesTaught()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findResume,
    findCurriculumVitae,
    findAcademicActivities,
    findAcademicRecognition,
    findCoursesTaught,
  }
}
