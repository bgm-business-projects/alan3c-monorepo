import { initContract } from '@ts-rest/core'
import { getConsultantRole } from './get-list.contract'

const c = initContract()

export const consultantRoleContract = c.router({
  getConsultantRole,
})
