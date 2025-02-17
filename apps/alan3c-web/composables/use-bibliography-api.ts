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

  const submittedPapersApi = computed(() => {
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
    if (result.status === 401) {
      throw new Error('Token 過期，請重新登入')
    }
    if (result.status === 403) {
      throw new Error('無權限')
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
    if (result.status === 401) {
      throw new Error('Token 過期，請重新登入')
    }
    if (result.status === 403) {
      throw new Error('無權限')
    }
  }

  async function findSubmittedPapers(params: BibliographyRequest['getSubmittedPapers']) {
    const query = bibliographyContract.getSubmittedPapers.query.parse(params.query)
    const result = await submittedPapersApi.value.getSubmittedPapers({
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

  async function findBookChapters(params: BibliographyRequest['getBookChapters']) {
    const query = bibliographyContract.getBookChapters.query.parse(params.query)
    const result = await bibliographyApi.value.getBookChapters({
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

  async function findLocalJournalPapers(params: BibliographyRequest['getLocalJournalPapers']) {
    const query = bibliographyContract.getLocalJournalPapers.query.parse(params.query)
    const result = await bibliographyApi.value.getLocalJournalPapers({
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

  async function findInternationalConferencePapers(params: BibliographyRequest['getInternationalConferencePapers']) {
    const query = bibliographyContract.getLocalJournalPapers.query.parse(params.query)
    const result = await bibliographyApi.value.getInternationalConferencePapers({
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

  async function findLocalConferencePapers(params: BibliographyRequest['getLocalConferencePapers']) {
    const query = bibliographyContract.getLocalConferencePapers.query.parse(params.query)
    const result = await bibliographyApi.value.getLocalConferencePapers({
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

  async function findGuestEditorial(params: BibliographyRequest['getGuestEditorial']) {
    const query = bibliographyContract.getGuestEditorial.query.parse(params.query)
    const result = await bibliographyApi.value.getGuestEditorial({
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

  async function findDomesticMagazineArticles(params: BibliographyRequest['getDomesticMagazineArticles']) {
    const query = bibliographyContract.getDomesticMagazineArticles.query.parse(params.query)
    const result = await bibliographyApi.value.getDomesticMagazineArticles({
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

  async function findTechnicalReports(params: BibliographyRequest['getTechnicalReports']) {
    const query = bibliographyContract.getTechnicalReports.query.parse(params.query)
    const result = await bibliographyApi.value.getTechnicalReports({
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

  return {
    findOne,
    findAuthoredBooks,
    findSubmittedPapers,
    findBookChapters,
    findLocalJournalPapers,
    findInternationalConferencePapers,
    findLocalConferencePapers,
    findGuestEditorial,
    findDomesticMagazineArticles,
    findTechnicalReports,
  }
}
