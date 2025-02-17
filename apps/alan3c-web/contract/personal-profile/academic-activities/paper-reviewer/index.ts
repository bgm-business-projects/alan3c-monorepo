import { initContract } from '@ts-rest/core'
import { getPaperReviewerExtension } from './get-extension.contract'
import { getPaperReviewer } from './get-list.contract'

const c = initContract()

export const paperReviewerContract = c.router({
  getPaperReviewer,
  getPaperReviewerExtension,
})
