import { initContract } from '@ts-rest/core'
import { getAuthoredBooks } from './get-authored-books.contract'
import { getBookChapters } from './get-book-chapters.contract'
import { getDomesticMagazineArticles } from './get-domestic-magazine-articles'
import { getGuestEditorial } from './get-guest-editorial.contract'
import { getInternationalConferencePapers } from './get-international-conference-papers'
import { getLocalConferencePapers } from './get-local-conference-papers.contract'
import { getLocalJournalPapers } from './get-local-journal-papers.contract'
import { getBibliography } from './get-single.contract'
import { getSubmittedPapers } from './get-submitted-papers.contract'
import { getTechnicalReports } from './get-technical-reports'

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
