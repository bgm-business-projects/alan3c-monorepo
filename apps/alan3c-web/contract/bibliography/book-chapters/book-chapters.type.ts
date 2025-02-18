import { z } from 'zod'

export const bookChaptersSchema = z.object({
  meta: z.object({
    filter_count: z.string(),
  }),
  data: z.array(
    z.object({
      id: z.number(),
      author: z.string(),
      publicationYear: z.string(),
      title: z.string(),
      publicationSource: z.string(),
      volNoPg: z.string(),
      sortDate: z.string(),
    }),
  ),
})

export type BookChapters = z.infer<typeof bookChaptersSchema>
