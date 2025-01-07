import { initContract } from '@ts-rest/core'
import { getImageProcessing } from './get-list.contract'

const c = initContract()

export const imageProcessingContract = c.router({
  getImageProcessing,
})
