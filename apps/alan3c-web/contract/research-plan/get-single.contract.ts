import type { AppRoute } from '@ts-rest/core'
import { researchPlanSchema } from './research-plan.type'

const translations = 'translations.*'
export const getResearchPlan = {
  method: 'GET',
  path: `/items/researchPlan?fields=*,${translations}`,
  responses: {
    200: researchPlanSchema,
  },

} satisfies AppRoute
