import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { imageProcessingContract } from '../contract/image-processing'

type ImageProcessingRequest = ClientInferRequest<typeof imageProcessingContract>

export function useImageProcessingApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const imageProcessingApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(imageProcessingContract, clientHeader)
  })

  async function findList() {
    const result = await imageProcessingApi.value.getImageProcessing()
    if (result.status === 200) {
      return result.body
    }
  }

  async function addDownloadCount(params: ImageProcessingRequest['addImageProcessingDownloadCount']['params']) {
    const [err, result] = await to(imageProcessingApi.value.addImageProcessingDownloadCount({
      params,
    }))
    if (err) {
      throw new Error(err.message)
    }
    console.log('result', result)
  }

  return {
    findList,
    addDownloadCount,
  }
}
