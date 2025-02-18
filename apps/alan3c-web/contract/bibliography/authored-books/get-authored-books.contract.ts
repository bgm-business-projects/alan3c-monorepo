import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { authoredBooksSchema } from './authored-books.type'

export const getAuthoredBooks = {
  method: 'GET',
  path: `/items/authoredBooks`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    fields: z.string().default('*,translations.*,image.*'),
  }),
  responses: {
    200: authoredBooksSchema,
  },
} satisfies AppRoute
