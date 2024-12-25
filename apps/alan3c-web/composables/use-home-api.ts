import { computed } from 'vue'
import { homeContract } from '../contract/home'

export function useHomeApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const homeApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(homeContract, clientHeader)
  })

  async function findOne() {
    const result = await homeApi.value.getHome()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findOne,
  }
}
