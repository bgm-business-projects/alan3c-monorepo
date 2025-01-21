import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { courseMaterialsSchema } from './course-materials.type'

export const getCourseMaterials = {
  method: 'GET',
  path: `/items/courseMaterials`,
  query: z.object({
    'filter[documentTitle][_icontains]': z.string().optional(),
  }),
  responses: {
    200: courseMaterialsSchema,
  },
} satisfies AppRoute
