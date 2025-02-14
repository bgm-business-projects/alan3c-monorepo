import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { consultantRoleContract } from '~/contract/personal-profile/academic-activities/consultant-role'

type ConsultantRoleRequest = ClientInferRequest<typeof consultantRoleContract>
export function useConsultantRoleApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const consultantRoleApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(consultantRoleContract, clientHeader)
  })

  async function findConsultantRole(params?: ConsultantRoleRequest['getConsultantRole']) {
    if (params) {
      const query = consultantRoleContract.getConsultantRole.query.parse(params.query)
      const result = await consultantRoleApi.value.getConsultantRole({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await consultantRoleApi.value.getConsultantRole()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findConsultantRole,
  }
}
