import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { lecturePptSchema } from './lecture-ppt.type'

export const getLecturePpt = {
  method: 'GET',
  path: `/items/lecturePPT`,
  query: z.object({
    'filter[lectureTitle][_contains]': z.string().optional(),
  }),
  responses: {
    200: lecturePptSchema,
  },
} satisfies AppRoute
