import type { AppRoute } from '@ts-rest/core'
import { academicLectureRecordSchema } from './academic-lecture-record.type'

const translations = 'translations.*'

export const getAcademicLectureRecord = {
  method: 'GET',
  path: `/items/academicLectureRecord?fields=*,${translations}`,
  responses: {
    200: academicLectureRecordSchema,
  },

} satisfies AppRoute
