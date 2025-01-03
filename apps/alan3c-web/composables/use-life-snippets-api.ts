import type { ClientInferRequest } from '@ts-rest/core'
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

  type TeacherStudentSnapshotsMoreFileRequest = ClientInferRequest<typeof lifeSnippetsContract['getTeacherStudentSnapshotsMoreFile']>
  async function findTeacherStudentSnapshotsMoreFile(params: TeacherStudentSnapshotsMoreFileRequest) {
    const query = lifeSnippetsContract.getTeacherStudentSnapshotsMoreFile.query.parse(params.query)
    const result = await lifeSnippetsApi.value.getTeacherStudentSnapshotsMoreFile({
      ...params,
      query,
    })
    if (result.status === 200) {
      return result.body
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

  type GrowthRecordMoreFileRequest = ClientInferRequest<typeof lifeSnippetsContract['getGrowthRecordMoreFile']>
  async function findGrowthRecordMoreFile(params: GrowthRecordMoreFileRequest) {
    const query = lifeSnippetsContract.getGrowthRecordMoreFile.query.parse(params.query)
    const result = await lifeSnippetsApi.value.getGrowthRecordMoreFile({
      ...params,
      query,
    })
    if (result.status === 200) {
      return result.body
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

  type LeisureTimeMoreFileRequest = ClientInferRequest<typeof lifeSnippetsContract['getLeisureTimeMoreFile']>
  async function findLeisureTimeMoreFile(params: LeisureTimeMoreFileRequest) {
    const query = lifeSnippetsContract.getLeisureTimeMoreFile.query.parse(params.query)
    const result = await lifeSnippetsApi.value.getLeisureTimeMoreFile({
      ...params,
      query,
    })
    if (result.status === 200) {
      return result.body
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

  type AcademicLectureMoreFileRequest = ClientInferRequest<typeof lifeSnippetsContract['getAcademicLectureMoreFile']>
  async function findAcademicLectureMoreFile(params: AcademicLectureMoreFileRequest) {
    const query = lifeSnippetsContract.getAcademicLectureMoreFile.query.parse(params.query)
    const result = await lifeSnippetsApi.value.getAcademicLectureMoreFile({
      ...params,
      query,
    })
    if (result.status === 200) {
      return result.body
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

  type PrimeOfLifeMoreFileRequest = ClientInferRequest<typeof lifeSnippetsContract['getPrimeOfLifeMoreFile']>
  async function findPrimeOfLifeMoreFile(params: PrimeOfLifeMoreFileRequest) {
    const query = lifeSnippetsContract.getPrimeOfLifeMoreFile.query.parse(params.query)
    const result = await lifeSnippetsApi.value.getPrimeOfLifeMoreFile({
      ...params,
      query,
    })
    if (result.status === 200) {
      return result.body
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

  type AdministrativeYearsMoreFileRequest = ClientInferRequest<typeof lifeSnippetsContract['getAdministrativeYearsMoreFile']>
  async function findAdministrativeYearsMoreFile(params: AdministrativeYearsMoreFileRequest) {
    const query = lifeSnippetsContract.getAdministrativeYearsMoreFile.query.parse(params.query)
    const result = await lifeSnippetsApi.value.getAdministrativeYearsMoreFile({
      ...params,
      query,
    })
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
    findTeacherStudentSnapshotsMoreFile,
    findGrowthRecord,
    findGrowthRecordMoreFile,
    findLeisureTime,
    findLeisureTimeMoreFile,
    findAcademicLecture,
    findAcademicLectureMoreFile,
    findPrimeOfLife,
    findPrimeOfLifeMoreFile,
    findAdministrativeYears,
    findAdministrativeYearsMoreFile,
    findLifeSnippets,
  }
}
