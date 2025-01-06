import { z } from 'zod'

export const curriculumVitaeDataSchema = z.object({
  data: z.object({
    id: z.number(),
    curriculumVitae: z.string().nullable(),
    activitiesSociety: z.string().nullable(),
    activitiesOther: z.string().nullable(),
    technicalReviewer: z.string().nullable(),
    consulting: z.string().nullable(),
    projects: z.string().nullable(),
    thesesMaster: z.string().nullable(),
    awards: z.string().nullable(),
  }),
})

export type CurriculumVitaeData = z.infer<typeof curriculumVitaeDataSchema>
