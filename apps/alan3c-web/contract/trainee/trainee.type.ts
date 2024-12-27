import { z } from 'zod'
import { basicImageSchema } from '../basic-shema'

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
  mainImage: basicImageSchema,
  email: z.string().email(),
  web: z.string().url(),
  traineeCategory: z.number(),
  file: z.string().nullable(),
  translations: z.array(translationSchema),
})

export const traineeListSchema = z.object(
  {
    data: z.array(traineeSchema),
  },
)

export type TraineeList = z.infer<typeof traineeListSchema>
