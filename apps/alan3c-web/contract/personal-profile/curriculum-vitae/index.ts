import { initContract } from '@ts-rest/core'
import { getCurriculumVitae } from './get-single.contract'

const c = initContract()

export const curriculumVitaeContract = c.router({
  getCurriculumVitae,
})
