import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { compilationContract } from '../contract/compilation'

type CompilationRequest = ClientInferRequest<typeof compilationContract>

export function useCompilationApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const compilationApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(compilationContract, clientHeader)
  })

  async function findList() {
    const result = await compilationApi.value.getCompilationList()
    if (result.status === 200) {
      return result.body
    }
  }

  async function findOne(params: CompilationRequest['getCompilation']) {
    const query = compilationContract.getCompilation.query.parse(params.query)
    const result = await compilationApi.value.getCompilation({
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
