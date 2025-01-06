import { computed } from 'vue'
import { curriculumVitaeDataContract } from '../contract/curriculum-vitae-data'

export function useCurriculumVitaeDataApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const curriculumVitaeDataApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(curriculumVitaeDataContract, clientHeader)
  })

  async function findList() {
    const result = await curriculumVitaeDataApi.value.getCurriculumVitaeData()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findList,
  }
}
