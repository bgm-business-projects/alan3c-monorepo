import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { bookChaptersSchema } from './book-chapters.type'

export const getBookChapters = {
  method: 'GET',
  path: `/items/bookChapters`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    sort: z.string().default('-sortDate'),
    fields: z.string().default('*'),
  }),
  responses: {
    200: bookChaptersSchema,
  },
} satisfies AppRoute
