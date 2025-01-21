import { initContract } from '@ts-rest/core'
import { getResearchPlan } from './get-list.contract'

const c = initContract()

export const researchPlanContract = c.router({
  getResearchPlan,
})
