import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { lecturePptSchema } from './lecture-ppt.type'

export const getLecturePpt = {
  method: 'GET',
  path: `/items/lecturePPT`,
  query: z.object({
    'filter[lectureTitle][_icontains]': z.string().optional(),
    'sort[]': z.string().default('-uploadDate'),
    'meta': z.string().default('filter_count'),
    'limit': z.string().optional(),
    'offset': z.string().optional(),
  }),
  responses: {
    200: lecturePptSchema,
  },
} satisfies AppRoute
