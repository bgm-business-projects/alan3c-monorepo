import { initContract } from '@ts-rest/core'
import { getTeacherStudentSnapshots } from './teacher-student-snapshots/get-teacher-student-snapshots.contract'

const c = initContract()

export const lifeSnippetsContract = c.router({
  getTeacherStudentSnapshots,
})
