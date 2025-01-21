import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { scholarSchema } from './scholar.type'

export const getScholar = {
  method: 'GET',
  path: `/items/scholar`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    fields: z.string().default('*,mainImage.*,translations.*'),
  }),
  responses: {
    200: scholarSchema,
  },

} satisfies AppRoute
