import { initContract } from '@ts-rest/core'
import { getPatentApplication } from './get-single.contract'

const c = initContract()

export const patentApplicationContract = c.router({
  getPatentApplication,
})
