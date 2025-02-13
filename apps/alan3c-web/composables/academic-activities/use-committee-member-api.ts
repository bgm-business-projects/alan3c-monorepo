import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { committeeMemberContract } from '~/contract/personal-profile/academic-activities/committee-member'

type CommitteeMemberRequest = ClientInferRequest<typeof committeeMemberContract>
export function useCommitteeMemberApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const committeeMemberApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(committeeMemberContract, clientHeader)
  })

  async function findCommitteeMember(params?: CommitteeMemberRequest['getCommitteeMember']) {
    if (params) {
      const query = committeeMemberContract.getCommitteeMember.query.parse(params.query)
      const result = await committeeMemberApi.value.getCommitteeMember({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await committeeMemberApi.value.getCommitteeMember()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findCommitteeMember,
  }
}
