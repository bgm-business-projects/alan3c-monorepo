import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { bibliographyContract } from '../contract/bibliography'

type BibliographyRequest = ClientInferRequest<typeof bibliographyContract>

export function useBibliographyApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const bibliographyApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(bibliographyContract, clientHeader)
  })

  async function findOne(params: BibliographyRequest['getBibliography']) {
    const query = bibliographyContract.getBibliography.query.parse(params.query)
    const result = await bibliographyApi.value.getBibliography({
      ...params,
      query,
    })
    if (result.status === 200) {
      return result.body
    }
  }

  async function findAuthoredBooks(params: BibliographyRequest['getAuthoredBooks']) {
    const query = bibliographyContract.getAuthoredBooks.query.parse(params.query)
    const result = await bibliographyApi.value.getAuthoredBooks({
      ...params,
      query,
    })
    if (result.status === 200) {
      return result.body
    }
  }

  async function findSubmittedPapers(params: BibliographyRequest['getSubmittedPapers']) {
    const query = bibliographyContract.getSubmittedPapers.query.parse(params.query)
    const result = await bibliographyApi.value.getSubmittedPapers({
      ...params,
      query,
    })
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findOne,
    findAuthoredBooks,
    findSubmittedPapers,
  }
}
