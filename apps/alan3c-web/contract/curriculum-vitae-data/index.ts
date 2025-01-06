import { initContract } from '@ts-rest/core'
import { getCurriculumVitaeData } from './get-single.contract'

const c = initContract()

export const curriculumVitaeDataContract = c.router({
  getCurriculumVitaeData,
})
