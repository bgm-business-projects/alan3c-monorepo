import { initContract } from '@ts-rest/core'
import { addArtificialIntelligenceDownloadCount } from './add-artificial-intelligence-download-count.contract'
import { getArtificialIntelligence } from './get-list.contract'

const c = initContract()

export const artificialIntelligenceContract = c.router({
  getArtificialIntelligence,
  addArtificialIntelligenceDownloadCount,
})
