import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { lecturePptContract } from '../contract/lecture-ppt'

type LecturePptRequest = ClientInferRequest<typeof lecturePptContract>

export function useLecturePptApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const lecturePptApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(lecturePptContract, clientHeader)
  })

  async function findList(params?: LecturePptRequest['getLecturePpt']) {
    if (params) {
      const query = lecturePptContract.getLecturePpt.query.parse(params.query)
      const result = await lecturePptApi.value.getLecturePpt({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await lecturePptApi.value.getLecturePpt()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  async function addDownloadCount(params: LecturePptRequest['addLecturePptDownloadCount']['params']) {
    const result = await lecturePptApi.value.addLecturePptDownloadCount({
      params,
    })
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findList,
    addDownloadCount,
  }
}
