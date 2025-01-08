import { initContract } from '@ts-rest/core'
import { addImageProcessingDownloadCount } from './add-image-processing-download-count.contract'
import { getImageProcessing } from './get-list.contract'

const c = initContract()

export const imageProcessingContract = c.router({
  getImageProcessing,
  addImageProcessingDownloadCount,
})
