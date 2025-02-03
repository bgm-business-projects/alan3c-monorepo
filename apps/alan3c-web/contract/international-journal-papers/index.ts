import { initContract } from '@ts-rest/core'
import { createInternationalJournalPapers } from './create-data.contract'
import { getInternationalJournalPapers } from './get-list.contract'
import { uploadInternationalJournalPapersFile } from './upload-file.contract'

const c = initContract()

export const internationalJournalPapersContract = c.router({
  getInternationalJournalPapers,
  uploadInternationalJournalPapersFile,
  createInternationalJournalPapers,
})
