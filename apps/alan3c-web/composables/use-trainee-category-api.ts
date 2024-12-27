import { computed } from 'vue'
import { traineeCategoryContract } from '../contract/trainee-category'

export function useTraineeCategoryApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const traineeCategoryApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(traineeCategoryContract, clientHeader)
  })

  async function findList() {
    const result = await traineeCategoryApi.value.getTraineeCategories()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findList,
  }
}
