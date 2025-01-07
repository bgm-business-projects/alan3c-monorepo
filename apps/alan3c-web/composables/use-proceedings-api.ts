import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { proceedingsContract } from '../contract/proceedings'

type proceedingsRequest = ClientInferRequest<typeof proceedingsContract>

export function useProceedingsApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const proceedingsApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(proceedingsContract, clientHeader)
  })

  async function findList() {
    const result = await proceedingsApi.value.getProceedingsList()
    if (result.status === 200) {
      return result.body
    }
  }

  async function findOne(params: proceedingsRequest['getProceedings']) {
    const query = proceedingsContract.getProceedings.query.parse(params.query)
    const result = await proceedingsApi.value.getProceedings({
      ...params,
      query,
    })
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findList,
    findOne,
  }
}
