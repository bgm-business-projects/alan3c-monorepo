import type { ClientInferRequest } from '@ts-rest/core'
import type { ArtificialIntelligenceCreateInput } from '~/contract/artificial-intelligence/artificial-intelligence.type'
import { computed } from 'vue'
import { commonContract } from '~/contract/common'
import { artificialIntelligenceContract } from '../contract/artificial-intelligence'

type ArtificialIntelligenceRequest = ClientInferRequest<typeof artificialIntelligenceContract>

export function useArtificialIntelligenceApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const artificialIntelligenceApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(artificialIntelligenceContract, clientHeader)
  })

  async function findList(params?: ArtificialIntelligenceRequest['getArtificialIntelligence']) {
    if (params) {
      const query = artificialIntelligenceContract.getArtificialIntelligence.query.parse(params.query)
      const result = await artificialIntelligenceApi.value.getArtificialIntelligence({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
      if (result.status === 401) {
        throw new Error('Token 過期，請重新登入')
      }
      if (result.status === 403) {
        throw new Error('無權限')
      }
    }
    else {
      const result = await artificialIntelligenceApi.value.getArtificialIntelligence()
      if (result.status === 200) {
        return result.body
      }
      if (result.status === 401) {
        throw new Error('Token 過期，請重新登入')
      }
      if (result.status === 403) {
        throw new Error('無權限')
      }
    }
  }

  async function addDownloadCount(params: ArtificialIntelligenceRequest['addArtificialIntelligenceDownloadCount']['params']) {
    const result = await artificialIntelligenceApi.value.addArtificialIntelligenceDownloadCount({
      params,
    })
    if (result.status === 200) {
      return result.body
    }
  }

  async function uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const [err, result] = await to(artificialIntelligenceApi.value.uploadFile({
      body: formData,
    }))
    if (err) {
      throw new Error(err.message)
    }
    // console.log('result.body', result.body.data?.id)
    return result.body.data?.id
  }

  async function createData(data: Partial<ArtificialIntelligenceCreateInput>) {
    let file
    let video
    if (data.file) {
      const [uploadFileErr, uploadFileResult] = await to(uploadFile(data.file))
      if (uploadFileErr) {
        throw new Error(uploadFileErr.message)
      }
      file = uploadFileResult
    }
    if (data.video) {
      const [uploadVideoErr, uploadVideoResult] = await to(uploadFile(data.video))
      if (uploadVideoErr) {
        throw new Error(uploadVideoErr.message)
      }
      video = uploadVideoResult
    }

    const inputData = {
      ...data,
      file: file ?? undefined,
      video: video ?? undefined,
      reportDate: data.reportDate === '' ? undefined : data.reportDate,
    }

    const [err, result] = await to(artificialIntelligenceApi.value.createArtificialIntelligence({
      body: inputData,
    }))
    if (err) {
      throw new Error(err.message)
    }
    return result
  }

  const commonApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(commonContract, clientHeader)
  })

  async function checkUser() {
    const [err, result] = await to(commonApi.value.checkDirectusUser())
    if (err) {
      throw new Error(err.message)
    }
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findList,
    addDownloadCount,
    checkUser,
    createData,
  }
}
