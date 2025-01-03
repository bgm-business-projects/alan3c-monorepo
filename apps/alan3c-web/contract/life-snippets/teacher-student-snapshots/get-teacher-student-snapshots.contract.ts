import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { teacherStudentSnapshotsDeepSchema, teacherStudentSnapshotsMoreFileSchema, teacherStudentSnapshotsSchema } from './teacher-student-snapshots.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subId = 'teacherStudentSnapshots.teacherStudentSnapshots_id.id'
const subMainImage = 'teacherStudentSnapshots.teacherStudentSnapshots_id.file.*'
const subTranslations = 'teacherStudentSnapshots.teacherStudentSnapshots_id.translations.*'
const moreFileList = 'teacherStudentSnapshots.teacherStudentSnapshots_id.moreFileList.*'

export const getTeacherStudentSnapshots = {
  method: 'GET',
  path: `/items/teacherStudentSnapshotsMain?fields=*,${mainImage},${translations}`,
  responses: {
    200: teacherStudentSnapshotsSchema,
  },
} satisfies AppRoute

export const getTeacherStudentSnapshotsDeep = {
  method: 'GET',
  path: `/items/teacherStudentSnapshotsMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList},${subId}`,
  responses: {
    200: teacherStudentSnapshotsDeepSchema,
  },
} satisfies AppRoute

export const getTeacherStudentSnapshotsMoreFile = {
  method: 'GET',
  path: `/items/teacherStudentSnapshotsMain`,
  query: z.object({
    'filter[teacherStudentSnapshots][teacherStudentSnapshots_id][id][_eq]': z.number(),
    'fields': z.string().default('teacherStudentSnapshots.teacherStudentSnapshots_id.moreFileList.directus_files_id.*'),
  }),
  responses: {
    200: teacherStudentSnapshotsMoreFileSchema,
  },
} satisfies AppRoute
