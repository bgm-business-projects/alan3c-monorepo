import { initContract } from '@ts-rest/core'
import { checkDirectusUser } from './check-user.contract'
import { uploadFile } from './upload-file.contract'

const c = initContract()

export const commonContract = c.router({
  checkDirectusUser,
  uploadFile,
})
