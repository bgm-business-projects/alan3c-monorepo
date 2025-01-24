import { initContract } from '@ts-rest/core'
import { getAuthoredBooks } from './get-authored-books.contract'
import { getBibliography } from './get-single.contract'
import { getSubmittedPapers } from './get-submitted-papers.contract'

const c = initContract()

export const bibliographyContract = c.router({
  getBibliography,
  getAuthoredBooks,
  getSubmittedPapers,
})
