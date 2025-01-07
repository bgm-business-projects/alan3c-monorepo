import { initContract } from '@ts-rest/core'
import { getProceedingsList } from './get-list.contract'
import { getProceedings } from './get-single.contract'

const c = initContract()

export const proceedingsContract = c.router({
  getProceedingsList,
  getProceedings,
})
