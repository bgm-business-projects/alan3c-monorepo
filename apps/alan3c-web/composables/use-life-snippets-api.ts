import { computed } from 'vue'
import { lifeSnippetsContract } from '../contract/life-snippets'

export function useLifeSnippetsApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const lifeSnippetsApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(lifeSnippetsContract, clientHeader)
  })

  async function findTeacherStudentSnapshots() {
    const result = await lifeSnippetsApi.value.getTeacherStudentSnapshots()
    if (result.status === 200) {
      return result.body
    }
  }

  async function findGrowthRecord() {
    const result = await lifeSnippetsApi.value.getGrowthRecord()
    if (result.status === 200) {
      return result.body
    }
  }

  async function findLeisureTime() {
    const result = await lifeSnippetsApi.value.getLeisureTime()
    if (result.status === 200) {
      return result.body
    }
  }

  async function findAcademicLecture() {
    const result = await lifeSnippetsApi.value.getAcademicLecture()
    if (result.status === 200) {
      return result.body
    }
  }

  async function findPrimeOfLife() {
    const result = await lifeSnippetsApi.value.getPrimeOfLife()
    if (result.status === 200) {
      return result.body
    }
  }

  async function findAdministrativeYears() {
    const result = await lifeSnippetsApi.value.getAdministrativeYears()
    if (result.status === 200) {
      return result.body
    }
  }

  async function findLifeSnippets() {
    const result = await lifeSnippetsApi.value.getLifeSnippets()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findTeacherStudentSnapshots,
    findGrowthRecord,
    findLeisureTime,
    findAcademicLecture,
    findPrimeOfLife,
    findAdministrativeYears,
    findLifeSnippets,
  }
}
