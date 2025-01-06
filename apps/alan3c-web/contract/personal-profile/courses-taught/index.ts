import { initContract } from '@ts-rest/core'
import { getCoursesTaught } from './get-single.contract'

const c = initContract()

export const coursesTaughtContract = c.router({
  getCoursesTaught,
})
