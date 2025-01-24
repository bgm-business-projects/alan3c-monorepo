import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { internationalJournalPapersSchema } from './international-journal-papers.type'

export const getInternationalJournalPapers = {
  method: 'GET',
  path: `/items/internationalJournalPapers`,
  query: z.object({
    fields: z.string().default('*,file.*'),
  }),
  responses: {
    200: internationalJournalPapersSchema,
  },
} satisfies AppRoute
