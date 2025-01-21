import { z } from 'zod'
import { basicFileSchema } from '../basic-schema'

const translationSchema = z.object({
  id: z.number(),
  trainee_id: z.number(),
  traineeLanguages_code: z.string(),
  name: z.string().nullable(),
  topic: z.string().nullable(),
  graduation: z.string().nullable(),
  title: z.string().nullable(),
})

const traineeSchema = z.object({
  id: z.number(),
  sort: z.number().nullable(),
  mainImage: basicFileSchema,
  file: basicFileSchema,
  email: z.string().email(),
  web: z.string().url(),
  traineeCategory: z.number(),
  translations: z.array(translationSchema),
})

export const traineeListSchema = z.object(
  {
    meta: z.object({
      filter_count: z.string(),
    }),
    data: z.array(traineeSchema),
  },
)

export type TraineeList = z.infer<typeof traineeListSchema>
