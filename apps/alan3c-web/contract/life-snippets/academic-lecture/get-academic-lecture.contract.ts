import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { academicLectureDeepSchema, academicLectureMoreFileSchema, academicLectureSchema } from './academic-lecture.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subId = 'academicLecture.academicLecture_id.id'
const subMainImage = 'academicLecture.academicLecture_id.file.*'
const subTranslations = 'academicLecture.academicLecture_id.translations.*'
const moreFileList = 'academicLecture.academicLecture_id.moreFileList.*'

export const getAcademicLecture = {
  method: 'GET',
  path: `/items/academicLectureMain?fields=*,${mainImage},${translations}`,
  responses: {
    200: academicLectureSchema,
  },
} satisfies AppRoute

export const getAcademicLectureDeep = {
  method: 'GET',
  path: `/items/academicLectureMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList},${subId}`,
  responses: {
    200: academicLectureDeepSchema,
  },
} satisfies AppRoute

export const getAcademicLectureMoreFile = {
  method: 'GET',
  path: `/items/academicLectureMain`,
  query: z.object({
    'filter[academicLecture][academicLecture_id][id][_eq]': z.number(),
    'fields': z.string().default('academicLecture.academicLecture_id.moreFileList.directus_files_id.*'),
  }),
  responses: {
    200: academicLectureMoreFileSchema,
  },
} satisfies AppRoute
