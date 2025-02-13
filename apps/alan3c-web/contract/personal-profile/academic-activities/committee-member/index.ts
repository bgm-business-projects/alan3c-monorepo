import { initContract } from '@ts-rest/core'
import { getCommitteeMember } from './get-list.contract'

const c = initContract()

export const committeeMemberContract = c.router({
  getCommitteeMember,
})
