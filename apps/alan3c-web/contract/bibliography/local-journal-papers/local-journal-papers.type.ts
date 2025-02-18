import { z } from 'zod'

export const localJournalPapersSchema = z.object({
  meta: z.object({
    filter_count: z.string(),
  }),
  data: z.array(
    z.object({
      id: z.number(),
      author: z.string(),
      publicationYear: z.string(),
      title: z.string(),
      source: z.string(),
      volNoPg: z.string(),
      sortDate: z.string(),
    }),
  ),
})

export type LocalJournalPapers = z.infer<typeof localJournalPapersSchema>
