import { computed } from 'vue'
import { lifeSnippetsContract } from '../contract/life-snippets'

export function useLifeSnippetsApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const lifeSnippetsApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(lifeSnippetsContract, clientHeader)
  })

  async function findTeacherStudentSnapshots() {
    const result = await lifeSnippetsApi.value.getTeacherStudentSnapshots()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findTeacherStudentSnapshots,
  }
}
