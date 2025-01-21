import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { academicLectureRecordContract } from '../contract/academic-lecture-record'

type RacademicLectureRecordRequest = ClientInferRequest<typeof academicLectureRecordContract>
export function useAcademicLectureRecordApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const academicLectureRecordApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(academicLectureRecordContract, clientHeader)
  })

  async function findList(params?: RacademicLectureRecordRequest['getAcademicLectureRecord']) {
    if (params) {
      const query = academicLectureRecordContract.getAcademicLectureRecord.query.parse(params.query)
      const result = await academicLectureRecordApi.value.getAcademicLectureRecord({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await academicLectureRecordApi.value.getAcademicLectureRecord()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findList,
  }
}
