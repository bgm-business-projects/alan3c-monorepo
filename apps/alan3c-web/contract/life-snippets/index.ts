import { initContract } from '@ts-rest/core'
import { getAcademicLecture, getAcademicLectureDeep, getAcademicLectureMoreFile } from './academic-lecture/get-academic-lecture.contract'
import { getAdministrativeYears, getAdministrativeYearsDeep, getAdministrativeYearsMoreFile } from './administrative-years/get-administrative-years.contract'
import { getGrowthRecord, getGrowthRecordDeep, getGrowthRecordMoreFile } from './growth-record/get-growth-record.contract'
import { getLeisureTime, getLeisureTimeDeep, getLeisureTimeMoreFile } from './leisure-time/get-leisure-time.contract'
import { getLifeSnippets } from './life-snippets-main/get-life-snippets.contract'
import { getPrimeOfLife, getPrimeOfLifeDeep, getPrimeOfLifeMoreFile } from './prime-of-life/get-prime-of-life.contract'
import { getTeacherStudentSnapshots, getTeacherStudentSnapshotsDeep, getTeacherStudentSnapshotsMoreFile } from './teacher-student-snapshots/get-teacher-student-snapshots.contract'

const c = initContract()

export const lifeSnippetsContract = c.router({
  getTeacherStudentSnapshots,
  getTeacherStudentSnapshotsDeep,
  getTeacherStudentSnapshotsMoreFile,
  getGrowthRecord,
  getGrowthRecordDeep,
  getGrowthRecordMoreFile,
  getLeisureTime,
  getLeisureTimeDeep,
  getLeisureTimeMoreFile,
  getAcademicLecture,
  getAcademicLectureDeep,
  getAcademicLectureMoreFile,
  getPrimeOfLife,
  getPrimeOfLifeDeep,
  getPrimeOfLifeMoreFile,
  getAdministrativeYears,
  getAdministrativeYearsDeep,
  getAdministrativeYearsMoreFile,
  getLifeSnippets,
})
