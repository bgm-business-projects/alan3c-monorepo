import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(),
  traineeCategories_id: z.number(),
  traineeCategoryLanguages_code: z.string(),
  name: z.string(),
})

const traineeCategorySchema = z.object({
  id: z.number(),
  translations: z.array(translationSchema),
})

export const traineeCategoryListSchema = z.object(
  {
    data: z.array(traineeCategorySchema),
  },
)

export type TraineeCategoryList = z.infer<typeof traineeCategoryListSchema>
