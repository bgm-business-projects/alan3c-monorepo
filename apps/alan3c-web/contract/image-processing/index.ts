import { initContract } from '@ts-rest/core'
import { uploadFile } from '../common/upload-file.contract'
import { addImageProcessingDownloadCount } from './add-image-processing-download-count.contract'
import { createImageProcessing } from './create-data.contract'
import { getImageProcessing } from './get-list.contract'

const c = initContract()

export const imageProcessingContract = c.router({
  getImageProcessing,
  addImageProcessingDownloadCount,
  uploadFile,
  createImageProcessing,
})
