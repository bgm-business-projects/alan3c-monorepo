import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { researchPlanSchema } from './research-plan.type'

export const getResearchPlan = {
  method: 'GET',
  path: `/items/researchPlan`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    fields: z.string().default('*,translations.*'),
  }),
  responses: {
    200: researchPlanSchema,
  },

} satisfies AppRoute
