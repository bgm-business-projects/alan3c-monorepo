import { initContract } from '@ts-rest/core'
import { getTraineeList } from './get-list.contract'

const c = initContract()

export const traineeContract = c.router({
  getTraineeList,
})
