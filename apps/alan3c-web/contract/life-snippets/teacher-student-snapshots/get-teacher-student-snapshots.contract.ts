import type { AppRoute } from '@ts-rest/core'
import { teacherStudentSnapshotsSchema } from './teacher-student-snapshots.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const teacherStudentSnapshots = 'teacherStudentSnapshots.*.*.*'

export const getTeacherStudentSnapshots = {
  method: 'GET',
  path: `/items/teacherStudentSnapshotsMain?fields=*,${mainImage},${translations},${teacherStudentSnapshots}`,
  responses: {
    200: teacherStudentSnapshotsSchema,
  },
} satisfies AppRoute
