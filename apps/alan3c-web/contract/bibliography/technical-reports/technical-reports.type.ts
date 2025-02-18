import { z } from 'zod'

export const technicalReportsSchema = z.object({
  meta: z.object({
    filter_count: z.string(),
  }),
  data: z.array(
    z.object({
      id: z.number(),
      author: z.string(),
      publicationYear: z.string(),
      title: z.string(),
      date: z.string(),
      numPages: z.string(),
    }),
  ),
})

export type TechnicalReports = z.infer<typeof technicalReportsSchema>
