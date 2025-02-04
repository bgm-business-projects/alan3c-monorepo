import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { internationalJournalPapersSchema } from './international-journal-papers.type'

export const createInternationalJournalPapers = {
  method: 'POST',
  path: `/items/internationalJournalPapers`,
  contentType: 'application/json',
  body: z.object({
    author: z.string().optional(),
    titleOfThePaper: z.string().optional(),
    journalName: z.string().optional(),
    vol: z.string().optional(),
    no: z.string().optional(),
    pp: z.string().optional(),
    year: z.number().optional(),
    month: z.string().optional(),
    day: z.string().optional(),
    status: z.string().optional(),
    file: z.string().optional(),
  }),
  responses: {
    200: internationalJournalPapersSchema,
  },
} satisfies AppRoute
