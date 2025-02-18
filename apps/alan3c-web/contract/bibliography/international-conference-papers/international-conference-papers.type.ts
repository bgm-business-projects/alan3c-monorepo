import { z } from 'zod'

export const internationalConferencePapersSchema = z.object({
  meta: z.object({
    filter_count: z.string(),
  }),
  data: z.array(
    z.object({
      id: z.number(),
      author: z.string(),
      publicationYear: z.string(),
      title: z.string(),
      publicationConference: z.string(),
      location: z.string(),
      date: z.string(),
      numPages: z.string(),
    }),
  ),
})

export type InternationalConferencePapers = z.infer<typeof internationalConferencePapersSchema>
