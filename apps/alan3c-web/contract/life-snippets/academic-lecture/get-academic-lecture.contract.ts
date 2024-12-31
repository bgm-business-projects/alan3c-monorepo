import type { AppRoute } from '@ts-rest/core'
import { academicLecturesSchema } from './academic-lecture.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subMainImage = 'academicLecture.academicLecture_id.mainImage.*'
const subTranslations = 'academicLecture.academicLecture_id.translations.*'
const moreFileList = 'academicLecture.academicLecture_id.moreFileList.*'

export const getAcademicLecture = {
  method: 'GET',
  path: `/items/academicLectureMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList}`,
  responses: {
    200: academicLecturesSchema,
  },
} satisfies AppRoute
