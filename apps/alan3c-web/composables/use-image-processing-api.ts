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

  async function findList(params?: ImageProcessingRequest['getImageProcessing']) {
    if (params) {
      const query = imageProcessingContract.getImageProcessing.query.parse(params.query)
      const result = await imageProcessingApi.value.getImageProcessing({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await imageProcessingApi.value.getImageProcessing()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  async function addDownloadCount(params: ImageProcessingRequest['addImageProcessingDownloadCount']['params']) {
    const result = await imageProcessingApi.value.addImageProcessingDownloadCount({
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
