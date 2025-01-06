import { computed } from 'vue'
import { researchFocusContract } from '../contract/research-focus'

export function useResearchFocusApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const researchFocusApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(researchFocusContract, clientHeader)
  })

  async function findOne() {
    const result = await researchFocusApi.value.getResearchFocus()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findOne,
  }
}
