import { initContract } from '@ts-rest/core'
import { getAcademicGroup } from './get-list.contract'

const c = initContract()

export const academicGroupContract = c.router({
  getAcademicGroup,
})
