import { computed } from 'vue'
import { researchPlanContract } from '../contract/research-plan'

export function useResearchPlanApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const researchPlanApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(researchPlanContract, clientHeader)
  })

  async function findList() {
    const result = await researchPlanApi.value.getResearchPlan()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findList,
  }
}
