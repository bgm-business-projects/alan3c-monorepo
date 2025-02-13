import { initContract } from '@ts-rest/core'
import { getPaperReviewer } from './get-list.contract'

const c = initContract()

export const paperReviewerContract = c.router({
  getPaperReviewer,
})
