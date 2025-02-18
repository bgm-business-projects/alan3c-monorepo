import { z } from 'zod'

export const curriculumVitaeDataSchema = z.object({
  data: z.object({
    id: z.number(),
    information: z.string().nullable(),
    awards: z.string().nullable(),
    professionalSocietyActivities: z.string().nullable(),
    otherActivities: z.string().nullable(),
    technicalReviewer: z.string().nullable(),
    consultingMembershipsInAcademicAndProfessionalSocieties: z.string().nullable(),
    projectRecords: z.string().nullable(),
    masterThesesSupervision: z.string().nullable(),
    phDDissertationSupervision: z.string().nullable(),
    patents: z.string().nullable(),
    lecture: z.string().nullable(),
  }),
})

export type CurriculumVitaeData = z.infer<typeof curriculumVitaeDataSchema>
