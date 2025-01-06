import type { AppRoute } from '@ts-rest/core'
import { curriculumVitaeSchema } from './curriculum-vitae.type'

const translations = 'translations.*'

export const getCurriculumVitae = {
  method: 'GET',
  path: `/items/curriculumVitae?fields=*,${translations}`,
  responses: {
    200: curriculumVitaeSchema,
  },
} satisfies AppRoute
