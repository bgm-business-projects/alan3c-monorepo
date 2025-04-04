import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { proceedingsSchema } from './proceedings.type'

export const getProceedingsList = {
  method: 'GET',
  path: `/items/proceedings`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    fields: z.string().default('*,translations.*'),
  }),
  responses: {
    200: proceedingsSchema,
  },
} satisfies AppRoute
