import type { AppRoute } from '@ts-rest/core'
import { curriculumVitaeDataSchema } from './curriculum-vitae-data.type'

export const getCurriculumVitaeData = {
  method: 'GET',
  path: `/items/curriculumVitaeData?fields=*`,
  responses: {
    200: curriculumVitaeDataSchema,
  },

} satisfies AppRoute
