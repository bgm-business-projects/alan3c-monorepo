import { z } from 'zod'
import { basicFileSchema } from '../../basic-schema'

const translationSchema = z.object({
  id: z.number(),
  lifeSnippets_id: z.number(),
  lifeSnippetsLanguages_code: z.string(),
  name: z.string(),
})

export const lifeSnippetsMainSchema = z.object(
  {
    data: z.object({
      id: z.number(),
      translations: z.array(translationSchema),
      mainImage: basicFileSchema,
    }),
  },
)

export type LifeSnippetsMain = z.infer<typeof lifeSnippetsMainSchema>
