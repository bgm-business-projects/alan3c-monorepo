import { z } from 'zod'

export const academicHonorsSchema = z.object({
  data: z.object({
    content: z.string(),
  }),
})

export type AcademicHonors = z.infer<typeof academicHonorsSchema>
