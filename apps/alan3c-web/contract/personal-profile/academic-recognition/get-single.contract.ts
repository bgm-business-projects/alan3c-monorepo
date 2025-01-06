import type { AppRoute } from '@ts-rest/core'
import { academicRecognitionSchema } from './academic-recognition.type'

const translations = 'translations.*'

export const getAcademicRecognition = {
  method: 'GET',
  path: `/items/academicRecognition?fields=*,${translations}`,
  responses: {
    200: academicRecognitionSchema,
  },
} satisfies AppRoute
