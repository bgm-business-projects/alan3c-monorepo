import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { courseMaterialsSchema } from './course-materials.type'

export const downloadCourseMaterialsFile = {
  method: 'GET',
  path: `/asset`,
  responses: {
    200: courseMaterialsSchema,
  },
  pathParams: z.object({
    id: z.string(),
  }),
} satisfies AppRoute
