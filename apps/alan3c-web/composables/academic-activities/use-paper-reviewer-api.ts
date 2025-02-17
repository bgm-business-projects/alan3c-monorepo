import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { paperReviewerContract } from '~/contract/personal-profile/academic-activities/paper-reviewer'

type PaperReviewerRequest = ClientInferRequest<typeof paperReviewerContract>

export function usePaperReviewerApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const paperReviewerApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(paperReviewerContract, clientHeader)
  })

  async function findPaperReviewer(params?: PaperReviewerRequest['getPaperReviewer']) {
    if (params) {
      const query = paperReviewerContract.getPaperReviewer.query.parse(params.query)
      const result = await paperReviewerApi.value.getPaperReviewer({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await paperReviewerApi.value.getPaperReviewer()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  async function findPaperReviewerExtension(params?: PaperReviewerRequest['getPaperReviewerExtension']) {
    if (params) {
      const query = paperReviewerContract.getPaperReviewerExtension.query.parse(params.query)
      const result = await paperReviewerApi.value.getPaperReviewerExtension({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await paperReviewerApi.value.getPaperReviewerExtension()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findPaperReviewer,
    findPaperReviewerExtension,
  }
}
