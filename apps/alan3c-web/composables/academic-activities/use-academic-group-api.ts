import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { academicGroupContract } from '~/contract/personal-profile/academic-activities/academic-group'

type AcademicGroupRequest = ClientInferRequest<typeof academicGroupContract>
export function useAcademicGroupApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const academicGroupApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(academicGroupContract, clientHeader)
  })

  async function findAcademicGroup(params?: AcademicGroupRequest['getAcademicGroup']) {
    if (params) {
      const query = academicGroupContract.getAcademicGroup.query.parse(params.query)
      const result = await academicGroupApi.value.getAcademicGroup({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await academicGroupApi.value.getAcademicGroup()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findAcademicGroup,
  }
}
