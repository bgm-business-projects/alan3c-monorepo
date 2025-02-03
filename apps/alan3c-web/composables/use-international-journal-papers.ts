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
      if (result.status === 401) {
        throw new Error('Token 過期，請重新登入')
      }
      if (result.status === 403) {
        throw new Error('無權限')
      }
    }
    else {
      const result = await internationalJournalPapersApi.value.getInternationalJournalPapers()
      if (result.status === 200) {
        return result.body
      }
      if (result.status === 401) {
        throw new Error('Token 過期，請重新登入')
      }
      if (result.status === 403) {
        throw new Error('無權限')
      }
    }
  }

  // async function createData(data: ) {

  // }

  return {
    findList,
  }
}
