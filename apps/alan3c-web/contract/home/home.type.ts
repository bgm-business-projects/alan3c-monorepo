import { z } from 'zod'
import { basicFileSchema } from '../basic-schema'

const incumbentSchema = z.object({
  title: z.string(),
})

const researchAreaSchema = z.object({
  title: z.string(),
})

const translationSchema = z.object({
  id: z.number(),
  home_id: z.number(),
  homeLanguages_code: z.enum(['en', 'zh']),
  incumbent: z.array(incumbentSchema),
  researcArea: z.array(researchAreaSchema),
})

export const homeSchema = z.object(
  {
    data: z.object(
      {
        id: z.number(),
        translations: z.array(translationSchema),
        mainImage: basicFileSchema,
      },
    ),
  },
)

export type Home = z.infer<typeof homeSchema>
