import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { internationalConferencePapersSchema } from './international-conference-papers.type'

export const getInternationalConferencePapers = {
  method: 'GET',
  path: `/items/internationalConferencePapers`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    sort: z.string().default('-date'),
    fields: z.string().default('*'),
  }),
  responses: {
    200: internationalConferencePapersSchema,
  },
} satisfies AppRoute
