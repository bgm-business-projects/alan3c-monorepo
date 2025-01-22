import type { AppRoute } from '@ts-rest/core'
import { academicHonorsSchema } from './academic-honors.type'

export const getAcademicHonors = {
  method: 'GET',
  path: `/items/academicHonors`,
  responses: {
    200: academicHonorsSchema,
  },

} satisfies AppRoute
