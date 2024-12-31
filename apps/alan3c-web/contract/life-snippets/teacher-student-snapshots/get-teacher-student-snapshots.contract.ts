import type { AppRoute } from '@ts-rest/core'
import { teacherStudentSnapshotsSchema } from './teacher-student-snapshots.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subMainImage = 'teacherStudentSnapshots.teacherStudentSnapshots_id.mainImage.*'
const subTranslations = 'teacherStudentSnapshots.teacherStudentSnapshots_id.translations.*'
const moreFileList = 'teacherStudentSnapshots.teacherStudentSnapshots_id.moreFileList.*'

export const getTeacherStudentSnapshots = {
  method: 'GET',
  path: `/items/teacherStudentSnapshotsMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList}`,
  responses: {
    200: teacherStudentSnapshotsSchema,
  },
} satisfies AppRoute
