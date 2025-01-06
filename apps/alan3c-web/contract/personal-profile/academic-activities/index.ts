import { initContract } from '@ts-rest/core'
import { getAcademicActivities } from './get-single.contract'

const c = initContract()

export const academicActivitiesContract = c.router({
  getAcademicActivities,
})
