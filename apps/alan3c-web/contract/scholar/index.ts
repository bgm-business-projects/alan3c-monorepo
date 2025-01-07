import { initContract } from '@ts-rest/core'
import { getScholar } from './get-list.contract'

const c = initContract()

export const scholarContract = c.router({
  getScholar,
})
