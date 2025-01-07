import { computed } from 'vue'
import { scholarContract } from '../contract/scholar'

export function useScholarApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const scholarApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(scholarContract, clientHeader)
  })

  async function findList() {
    const result = await scholarApi.value.getScholar()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findList,
  }
}
