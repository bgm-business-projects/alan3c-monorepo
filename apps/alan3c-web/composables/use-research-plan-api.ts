import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { researchPlanContract } from '../contract/research-plan'

type ResearchPlanRequest = ClientInferRequest<typeof researchPlanContract>
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

  async function findList(params?: ResearchPlanRequest['getResearchPlan']) {
    if (params) {
      const query = researchPlanContract.getResearchPlan.query.parse(params.query)
      const result = await researchPlanApi.value.getResearchPlan({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await researchPlanApi.value.getResearchPlan()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findList,
  }
}
