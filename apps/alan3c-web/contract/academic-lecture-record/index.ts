import { initContract } from '@ts-rest/core'
import { getAcademicLectureRecord } from './get-list.contract'

const c = initContract()

export const academicLectureRecordContract = c.router({
  getAcademicLectureRecord,
})
