import { z } from 'zod'

export const submittedPapersSchema = z.object({
  meta: z.object({
    filter_count: z.string(),
  }),
  data: z.array(
    z.object({
      id: z.number(),
      sort: z.number(),
      year: z.string(),
      translations: z.array(
        z.object({
          id: z.number(),
          submittedPapers_id: z.number(),
          submittedPapersLanguages_code: z.string(),
          content: z.string(),
        }),
      ),
    }),
  ),
})

export type AuthoredBooks = z.infer<typeof submittedPapersSchema>
