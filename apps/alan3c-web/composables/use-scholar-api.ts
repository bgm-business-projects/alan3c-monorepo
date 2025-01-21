import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { scholarContract } from '../contract/scholar'

type ScholarRequest = ClientInferRequest<typeof scholarContract>
export function useScholarApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const scholarApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(scholarContract, clientHeader)
  })

  async function findList(params?: ScholarRequest['getScholar']) {
    if (params) {
      const query = scholarContract.getScholar.query.parse(params.query)
      const result = await scholarApi.value.getScholar({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await scholarApi.value.getScholar()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findList,
  }
}
