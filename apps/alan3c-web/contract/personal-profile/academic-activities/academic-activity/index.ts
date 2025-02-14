import { initContract } from '@ts-rest/core'
import { getAcademicActivity } from './get-list.contract'

const c = initContract()

export const academicActivityContract = c.router({
  getAcademicActivity,
})
