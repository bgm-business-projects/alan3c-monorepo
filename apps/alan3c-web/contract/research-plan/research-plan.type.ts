import { z } from 'zod'

export const researchPlanSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      sort: z.number().nullable(), // sort 可以為 null
      startDate: z.string(), // 日期作為字串處理
      endDate: z.string(), // 日期作為字串處理
      referenceNumber: z.string().nullable(), // referenceNumber 可以為 null
      translations: z.array(
        z.object({
          id: z.number(),
          researchPlan_id: z.number(),
          researchPlanLanguages_code: z.string(),
          name: z.string(), // name 必須為字串
          sponsor: z.string(), // sponsor 必須為字串
        }),
      ),
    }),
  ),
})

export type ResearchPlan = z.infer<typeof researchPlanSchema>
