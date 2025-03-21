import type { ClientInferRequest } from '@ts-rest/core'
import type { InternationalJournalPapersCreateInput } from '~/contract/international-journal-papers/international-journal-papers.type'
import { computed } from 'vue'
import { commonContract } from '~/contract/common'
import { internationalJournalPapersContract } from '../contract/international-journal-papers'

type InternationalJournalPapersRequest = ClientInferRequest<typeof internationalJournalPapersContract>
export function useInternationalJournalPapersApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const internationalJournalPapersApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(internationalJournalPapersContract, clientHeader)
  })

  const commonApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(commonContract, clientHeader)
  })

  async function findList(params?: InternationalJournalPapersRequest['getInternationalJournalPapers']) {
    if (params) {
      const query = internationalJournalPapersContract.getInternationalJournalPapers.query.parse(params.query)
      const result = await internationalJournalPapersApi.value.getInternationalJournalPapers({
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
      const result = await internationalJournalPapersApi.value.getInternationalJournalPapers()
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

  async function uploadFile(file: File) {
    const folderId = '05e24814-d652-4933-aeb2-d4538e5218b2'
    const formData = new FormData()
    formData.append('folder', folderId) // 指定上傳的資料夾
    formData.append('file', file)

    const [err, result] = await to(internationalJournalPapersApi.value.uploadFile({
      body: formData,
    }))
    if (err) {
      throw new Error(err.message)
    }
    // console.log('result.body', result.body.data?.id)
    return result.body.data?.id
  }

  async function createData(data: Partial<InternationalJournalPapersCreateInput>) {
    if (data.file) {
      const [uploadFileErr, uploadFileResult] = await to(uploadFile(data.file))
      if (uploadFileErr) {
        throw new Error(uploadFileErr.message)
      }

      const inputData = {
        ...data,
        file: uploadFileResult as string | undefined,
      }

      const [err, result] = await to(internationalJournalPapersApi.value.createInternationalJournalPapers({
        body: inputData,
      }))
      if (err) {
        throw new Error(err.message)
      }
      return result
    }
    else {
      const inputData = {
        ...data,
        file: undefined,
      }
      const [err, result] = await to(internationalJournalPapersApi.value.createInternationalJournalPapers({
        body: inputData,
      }))
      if (err) {
        throw new Error(err.message)
      }
      return result
    }
  }

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
    createData,
    checkUser,
    // uploadFile,
  }
}
