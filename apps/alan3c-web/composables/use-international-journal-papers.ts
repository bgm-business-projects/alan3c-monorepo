import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { internationalJournalPapersContract } from '../contract/international-journal-papers'

type InternationalJournalPapersRequest = ClientInferRequest<typeof internationalJournalPapersContract>
export function useInternationalJournalPapersApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const internationalJournalPapersApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(internationalJournalPapersContract, clientHeader)
  })

  async function findList(params?: InternationalJournalPapersRequest['getInternationalJournalPapers']) {
    if (params) {
      const query = internationalJournalPapersContract.getInternationalJournalPapers.query.parse(params.query)
      const result = await internationalJournalPapersApi.value.getInternationalJournalPapers({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await internationalJournalPapersApi.value.getInternationalJournalPapers()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findList,
  }
}
