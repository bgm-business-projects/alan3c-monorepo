import type { AppRoute } from '@ts-rest/core'
import { academicActivitiesSchema } from './academic-activities.type'

const translations = 'translations.*'

export const getAcademicActivities = {
  method: 'GET',
  path: `/items/academicActivities?fields=*,${translations}`,
  responses: {
    200: academicActivitiesSchema,
  },
} satisfies AppRoute
