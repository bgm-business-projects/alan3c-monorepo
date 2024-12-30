import { initContract } from '@ts-rest/core'
import { getAcademicLecture } from './academic-lecture/get-academic-lecture.contract'
import { getAdministrativeYears } from './administrative-years/get-administrative-years.contract'
import { getGrowthRecord } from './growth-record/get-growth-record.contract'
import { getLeisureTime } from './leisure-time/get-leisure-time.contract'
import { getLifeSnippets } from './life-snippets-main/get-life-snippets.contract'
import { getPrimeOfLife } from './prime-of-life/get-prime-of-life.contract'
import { getTeacherStudentSnapshots } from './teacher-student-snapshots/get-teacher-student-snapshots.contract'

const c = initContract()

export const lifeSnippetsContract = c.router({
  getTeacherStudentSnapshots,
  getGrowthRecord,
  getLeisureTime,
  getAcademicLecture,
  getPrimeOfLife,
  getAdministrativeYears,
  getLifeSnippets,
})
