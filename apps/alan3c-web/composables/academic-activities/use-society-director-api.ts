import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { societyDirectorContract } from '~/contract/personal-profile/academic-activities/society-director'

type SocietyDirectorRequest = ClientInferRequest<typeof societyDirectorContract>
export function useSocietyDirectorApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const societyDirectorApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(societyDirectorContract, clientHeader)
  })

  async function findSocietyDirector(params?: SocietyDirectorRequest['getSocietyDirector']) {
    if (params) {
      const query = societyDirectorContract.getSocietyDirector.query.parse(params.query)
      const result = await societyDirectorApi.value.getSocietyDirector({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await societyDirectorApi.value.getSocietyDirector()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findSocietyDirector,
  }
}
