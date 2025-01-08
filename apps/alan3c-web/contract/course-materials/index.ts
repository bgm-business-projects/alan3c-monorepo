import { initContract } from '@ts-rest/core'
import { addCourseMaterialsDownloadCount } from './add-course-materials-download-count.contract'
import { getCourseMaterials } from './get-list.contract'

const c = initContract()

export const courseMaterialsContract = c.router({
  getCourseMaterials,
  addCourseMaterialsDownloadCount,
})
