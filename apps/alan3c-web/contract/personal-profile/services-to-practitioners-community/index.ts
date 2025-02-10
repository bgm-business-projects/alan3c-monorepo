import { initContract } from '@ts-rest/core'
import { getServicesToPractitionersCommunity } from './get-single.contract'

const c = initContract()

export const servicesToPractitionersCommunityContract = c.router({
  getServicesToPractitionersCommunity,
})
