import { initContract } from '@ts-rest/core'
import { getAcademicLectureRecord } from './get-single.contract'

const c = initContract()

export const academicLectureRecordContract = c.router({
  getAcademicLectureRecord,
})
