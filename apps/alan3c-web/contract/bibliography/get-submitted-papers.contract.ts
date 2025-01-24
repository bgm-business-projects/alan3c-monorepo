import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { submittedPapersSchema } from './submitted-papers.type'

export const getSubmittedPapers = {
  method: 'GET',
  path: `/items/submittedPapers`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    fields: z.string().default('*,translations.*'),
  }),
  responses: {
    200: submittedPapersSchema,
  },
} satisfies AppRoute
