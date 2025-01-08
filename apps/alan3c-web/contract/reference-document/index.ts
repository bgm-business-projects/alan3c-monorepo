import { initContract } from '@ts-rest/core'
import { addReferenceDocumentDownloadCount } from './add-reference-document-download-count.contract'
import { getReferenceDocument } from './get-list.contract'

const c = initContract()

export const referenceDocumentContract = c.router({
  getReferenceDocument,
  addReferenceDocumentDownloadCount,
})
