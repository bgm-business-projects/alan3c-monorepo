import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { compilationSchema } from './compilation.type'

export const getCompilationList = {
  method: 'GET',
  path: `/items/compilation`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    fields: z.string().default('*,translations.*'),
  }),
  responses: {
    200: compilationSchema,
  },
} satisfies AppRoute
