import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { academicActivityContract } from '~/contract/personal-profile/academic-activities/academic-activity'

type AcademicActivityRequest = ClientInferRequest<typeof academicActivityContract>
export function useAcademicActivityApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const academicActivityApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(academicActivityContract, clientHeader)
  })

  async function findAcademicActivity(params?: AcademicActivityRequest['getAcademicActivity']) {
    if (params) {
      const query = academicActivityContract.getAcademicActivity.query.parse(params.query)
      const result = await academicActivityApi.value.getAcademicActivity({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await academicActivityApi.value.getAcademicActivity()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findAcademicActivity,
  }
}
