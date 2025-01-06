import { initContract } from '@ts-rest/core'
import { getAcademicRecognition } from './get-single.contract'

const c = initContract()

export const academicRecognitionContract = c.router({
  getAcademicRecognition,
})
