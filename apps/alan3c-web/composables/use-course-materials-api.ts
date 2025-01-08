import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { courseMaterialsContract } from '../contract/course-materials'

type CourseMaterialsRequest = ClientInferRequest<typeof courseMaterialsContract>

export function useCourseMaterialsApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const courseMaterialsApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(courseMaterialsContract, clientHeader)
  })

  async function findList(params?: CourseMaterialsRequest['getCourseMaterials']) {
    if (params) {
      const query = courseMaterialsContract.getCourseMaterials.query.parse(params.query)
      const result = await courseMaterialsApi.value.getCourseMaterials({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await courseMaterialsApi.value.getCourseMaterials()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  async function addDownloadCount(params: CourseMaterialsRequest['addCourseMaterialsDownloadCount']['params']) {
    const result = await courseMaterialsApi.value.addCourseMaterialsDownloadCount({
      params,
    })
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findList,
    addDownloadCount,
  }
}
