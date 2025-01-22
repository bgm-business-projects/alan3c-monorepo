import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { futureSpeechContract } from '../contract/future-speech'

type FutureSpeechRequest = ClientInferRequest<typeof futureSpeechContract>
export function useFutureSpeechApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const futureSpeechApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(futureSpeechContract, clientHeader)
  })

  async function findList(params?: FutureSpeechRequest['getFutureSpeech']) {
    if (params) {
      const query = futureSpeechContract.getFutureSpeech.query.parse(params.query)
      const result = await futureSpeechApi.value.getFutureSpeech({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await futureSpeechApi.value.getFutureSpeech()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  async function findQuotes() {
    const result = await futureSpeechApi.value.getQuotes()
    if (result.status === 200) {
      return result.body
    }
  }

  async function findAcademicHonors() {
    const result = await futureSpeechApi.value.getAcademicHonors()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findList,
    findQuotes,
    findAcademicHonors,
  }
}
