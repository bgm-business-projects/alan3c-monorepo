import { initContract } from '@ts-rest/core'
import { getTraineeCategories } from './get-list.contract'

const c = initContract()

export const traineeCategoryContract = c.router({
  getTraineeCategories,
})
