import { z } from 'zod'
import { basicFileSchema } from '../basic-schema'

export const authoredBooksSchema = z.object({
  meta: z.object({
    filter_count: z.string(),
  }),
  data: z.array(
    z.object({
      id: z.number(),
      sort: z.number(),
      date: z.string(),
      image: basicFileSchema,
      bibliographyId: z.number(),
      displayName: z.string(),
      translations: z.array(
        z.object({
          id: z.number(),
          authoredBooks_id: z.number(),
          authoredBooksLanguages_code: z.string(),
          title: z.string(),
          company: z.string(),
          coAuthor: z.string(),
        }),
      ),
    }),
  ),
})

export type AuthoredBooks = z.infer<typeof authoredBooksSchema>
