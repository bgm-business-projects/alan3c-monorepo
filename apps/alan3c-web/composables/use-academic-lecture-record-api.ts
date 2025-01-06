import { computed } from 'vue'
import { academicLectureRecordContract } from '../contract/academic-lecture-record'

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

  async function findList() {
    const result = await academicLectureRecordApi.value.getAcademicLectureRecord()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findList,
  }
}
