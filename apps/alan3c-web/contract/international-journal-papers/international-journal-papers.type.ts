import { z } from 'zod'
import { basicFileSchema } from '../basic-schema'

export const internationalJournalPapersSchema = z.object({
  meta: z.object({
    filter_count: z.string(),
  }),
  data: z.array(
    z.object({
      id: z.number(),
      author: z.string(),
      titleOfThePaper: z.string(),
      journalName: z.string(),
      vol: z.string(),
      no: z.string(),
      pp: z.string(),
      year: z.number(),
      file: basicFileSchema,
      status: z.union([z.literal('publication'), z.literal('onlyAccepted'), z.null()]),
      statusDate: z.string(),
      month: z.string(),
      day: z.string(),
    }),
  ),
})

export type InternationalJournalPapers = z.infer<typeof internationalJournalPapersSchema>
