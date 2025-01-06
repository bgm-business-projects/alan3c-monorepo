import { initContract } from '@ts-rest/core'
import { getResearchPlan } from './get-single.contract'

const c = initContract()

export const researchPlanContract = c.router({
  getResearchPlan,
})
