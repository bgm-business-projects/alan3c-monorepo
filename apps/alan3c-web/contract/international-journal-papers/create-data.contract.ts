import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { internationalJournalPapersSchema } from './international-journal-papers.type'

export const createInternationalJournalPapers = {
  method: 'POST',
  path: `/items/internationalJournalPapers`,
  body: z.string(),
  responses: {
    200: internationalJournalPapersSchema,
  },
} satisfies AppRoute
