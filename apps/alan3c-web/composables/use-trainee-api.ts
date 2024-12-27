import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { traineeContract } from '../contract/trainee'

type TraineeRequest = ClientInferRequest<typeof traineeContract>

export function useTraineeApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const traineeApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(traineeContract, clientHeader)
  })

  async function findList(params: TraineeRequest['getTraineeList']) {
    const query = traineeContract.getTraineeList.query.parse(params.query)
    const result = await traineeApi.value.getTraineeList({ ...params, query })
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findList,
  }
}
