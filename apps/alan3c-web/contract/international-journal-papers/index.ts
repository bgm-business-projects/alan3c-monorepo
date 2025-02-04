import { initContract } from '@ts-rest/core'
import { uploadFile } from '../common/upload-file.contract'
import { createInternationalJournalPapers } from './create-data.contract'
import { getInternationalJournalPapers } from './get-list.contract'

const c = initContract()

export const internationalJournalPapersContract = c.router({
  getInternationalJournalPapers,
  uploadFile,
  createInternationalJournalPapers,
})
