import { z } from 'zod'

export const domesticMagazineArticlesSchema = z.object({
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
      date: z.string(),
      numPages: z.string(),
    }),
  ),
})

export type DomesticMagazineArticles = z.infer<typeof domesticMagazineArticlesSchema>
