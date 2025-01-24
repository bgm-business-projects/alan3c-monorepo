import { initContract } from '@ts-rest/core'
import { getInternationalJournalPapers } from './get-list.contract'

const c = initContract()

export const internationalJournalPapersContract = c.router({
  getInternationalJournalPapers,
})
