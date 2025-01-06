import { initContract } from '@ts-rest/core'
import { getResume } from './get-single.contract'

const c = initContract()

export const resumeContract = c.router({
  getResume,
})
