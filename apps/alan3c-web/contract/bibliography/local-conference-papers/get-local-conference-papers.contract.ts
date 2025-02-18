import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { localConferencePapersSchema } from './local-conference-papers.type'

export const getLocalConferencePapers = {
  method: 'GET',
  path: `/items/localConferencePapers`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    sort: z.string().default('-date'),
    fields: z.string().default('*'),
  }),
  responses: {
    200: localConferencePapersSchema,
  },
} satisfies AppRoute
