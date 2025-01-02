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

  async function findTeacherStudentSnapshots(deep: boolean = false) {
    if (deep) {
      const result = await lifeSnippetsApi.value.getTeacherStudentSnapshotsDeep()
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await lifeSnippetsApi.value.getTeacherStudentSnapshots()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  async function findGrowthRecord(deep: boolean = false) {
    if (deep) {
      const result = await lifeSnippetsApi.value.getGrowthRecordDeep()
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await lifeSnippetsApi.value.getGrowthRecord()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  async function findLeisureTime(deep: boolean = false) {
    if (deep) {
      const result = await lifeSnippetsApi.value.getLeisureTimeDeep()
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await lifeSnippetsApi.value.getLeisureTime()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  async function findAcademicLecture(deep: boolean = false) {
    if (deep) {
      const result = await lifeSnippetsApi.value.getAcademicLectureDeep()
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await lifeSnippetsApi.value.getAcademicLecture()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  async function findPrimeOfLife(deep: boolean = false) {
    if (deep) {
      const result = await lifeSnippetsApi.value.getPrimeOfLifeDeep()
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await lifeSnippetsApi.value.getPrimeOfLife()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  async function findAdministrativeYears(deep: boolean = false) {
    if (deep) {
      const result = await lifeSnippetsApi.value.getAdministrativeYearsDeep()
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await lifeSnippetsApi.value.getAdministrativeYears()
      if (result.status === 200) {
        return result.body
      }
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
