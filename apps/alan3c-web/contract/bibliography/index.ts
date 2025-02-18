import { initContract } from '@ts-rest/core'
import { getAuthoredBooks } from './authored-books/get-authored-books.contract'
import { getBookChapters } from './book-chapters/get-book-chapters.contract'
import { getDomesticMagazineArticles } from './domestic-magazine-articles/get-domestic-magazine-articles.contract'
import { getBibliography } from './get-single.contract'
import { getGuestEditorial } from './guest-editorial/get-guest-editorial.contract'
import { getInternationalConferencePapers } from './international-conference-papers/get-international-conference-papers'
import { getLocalConferencePapers } from './local-conference-papers/get-local-conference-papers.contract'
import { getLocalJournalPapers } from './local-journal-papers/get-local-journal-papers.contract'
import { getSubmittedPapers } from './submitted-papers/get-submitted-papers.contract'
import { getTechnicalReports } from './technical-reports/get-technical-reports.contract'

const c = initContract()

export const bibliographyContract = c.router({
  getBibliography,
  getBookChapters,
  getAuthoredBooks,
  getSubmittedPapers,
  getLocalJournalPapers,
  getInternationalConferencePapers,
  getLocalConferencePapers,
  getGuestEditorial,
  getDomesticMagazineArticles,
  getTechnicalReports,
})
