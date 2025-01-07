import { computed } from 'vue'
import { imageProcessingContract } from '../contract/image-processing'

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

  return {
    findList,
  }
}
