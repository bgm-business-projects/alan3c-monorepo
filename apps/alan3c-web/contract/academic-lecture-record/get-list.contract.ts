import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { academicLectureRecordSchema } from './academic-lecture-record.type'

export const getAcademicLectureRecord = {
  method: 'GET',
  path: `/items/academicLectureRecord`,
  query: z.object({
    'meta': z.string().default('filter_count'),
    'limit': z.string().optional(),
    'offset': z.string().optional(),
    'filter[showOnAcademicLectureRecord][_eq]': z.boolean().default(true),
    'filter[translations][name][_contains]': z.string().optional(),
    'sort': z.string().default('-lectureDate'),
    'fields': z.string().default('*,translations.*'),
  }),
  responses: {
    200: academicLectureRecordSchema,
  },

} satisfies AppRoute
