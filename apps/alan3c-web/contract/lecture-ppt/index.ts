import { initContract } from '@ts-rest/core'
import { addLecturePptDownloadCount } from './add-lecture-ppt-download-count.contract'
import { getLecturePpt } from './get-list.contract'

const c = initContract()

export const lecturePptContract = c.router({
  getLecturePpt,
  addLecturePptDownloadCount,
})
