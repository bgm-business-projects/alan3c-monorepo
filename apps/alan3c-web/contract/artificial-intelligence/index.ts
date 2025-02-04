import { initContract } from '@ts-rest/core'
import { uploadFile } from '../common/upload-file.contract'
import { addArtificialIntelligenceDownloadCount } from './add-artificial-intelligence-download-count.contract'
import { createArtificialIntelligence } from './create-data.contract'
import { getArtificialIntelligence } from './get-list.contract'

const c = initContract()

export const artificialIntelligenceContract = c.router({
  getArtificialIntelligence,
  addArtificialIntelligenceDownloadCount,
  uploadFile,
  createArtificialIntelligence,
})
