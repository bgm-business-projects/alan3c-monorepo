import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { referenceDocumentContract } from '../contract/reference-document'

type ReferenceDocumentRequest = ClientInferRequest<typeof referenceDocumentContract>

export function useReferenceDocumentApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const referenceDocumentApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(referenceDocumentContract, clientHeader)
  })

  async function findList(params?: ReferenceDocumentRequest['getReferenceDocument']) {
    if (params) {
      const query = referenceDocumentContract.getReferenceDocument.query.parse(params.query)
      const result = await referenceDocumentApi.value.getReferenceDocument({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await referenceDocumentApi.value.getReferenceDocument()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  async function addDownloadCount(params: ReferenceDocumentRequest['addReferenceDocumentDownloadCount']['params']) {
    const result = await referenceDocumentApi.value.addReferenceDocumentDownloadCount({
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
