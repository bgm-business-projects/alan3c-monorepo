import { initContract } from '@ts-rest/core'
import { downloadTraineeFile } from './download-file.contract'
import { getTraineeList } from './get-list.contract'

const c = initContract()

export const traineeContract = c.router({
  getTraineeList,
  downloadTraineeFile,
})
