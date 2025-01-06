import { z } from 'zod'

export const researchFocusSchema = z.object({
  data: z.object({
    id: z.number(),
    translations: z.array(
      z.object({
        id: z.number(),
        researchFocus_id: z.number(),
        researchFocusLanguages_code: z.string(),
        content: z.string().nullable(),
      }),
    ),
  }),
})

export type ResearchFocus = z.infer<typeof researchFocusSchema>
