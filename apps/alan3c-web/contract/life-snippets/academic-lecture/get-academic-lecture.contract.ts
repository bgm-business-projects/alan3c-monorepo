import type { AppRoute } from '@ts-rest/core'
import { academicLecturesSchema } from './academic-lecture.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const academicLecture = 'academicLecture.*.*.*'

export const getAcademicLecture = {
  method: 'GET',
  path: `/items/academicLectureMain?fields=*,${mainImage},${translations},${academicLecture}`,
  responses: {
    200: academicLecturesSchema,
  },
} satisfies AppRoute
