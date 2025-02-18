import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { localJournalPapersSchema } from './local-journal-papers.type'

export const getLocalJournalPapers = {
  method: 'GET',
  path: `/items/localJournalPapers`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    sort: z.string().default('-sortDate'),
    fields: z.string().default('*'),
  }),
  responses: {
    200: localJournalPapersSchema,
  },
} satisfies AppRoute
