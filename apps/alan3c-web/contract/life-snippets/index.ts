import { initContract } from '@ts-rest/core'
import { getAcademicLecture, getAcademicLectureDeep } from './academic-lecture/get-academic-lecture.contract'
import { getAdministrativeYears, getAdministrativeYearsDeep } from './administrative-years/get-administrative-years.contract'
import { getGrowthRecord, getGrowthRecordDeep } from './growth-record/get-growth-record.contract'
import { getLeisureTime, getLeisureTimeDeep } from './leisure-time/get-leisure-time.contract'
import { getLifeSnippets } from './life-snippets-main/get-life-snippets.contract'
import { getPrimeOfLife, getPrimeOfLifeDeep } from './prime-of-life/get-prime-of-life.contract'
import { getTeacherStudentSnapshots, getTeacherStudentSnapshotsDeep } from './teacher-student-snapshots/get-teacher-student-snapshots.contract'

const c = initContract()

export const lifeSnippetsContract = c.router({
  getTeacherStudentSnapshots,
  getTeacherStudentSnapshotsDeep,
  getGrowthRecord,
  getGrowthRecordDeep,
  getLeisureTime,
  getLeisureTimeDeep,
  getAcademicLecture,
  getAcademicLectureDeep,
  getPrimeOfLife,
  getPrimeOfLifeDeep,
  getAdministrativeYears,
  getAdministrativeYearsDeep,
  getLifeSnippets,
})
