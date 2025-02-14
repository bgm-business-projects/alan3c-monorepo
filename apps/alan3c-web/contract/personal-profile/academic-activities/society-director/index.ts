import { initContract } from '@ts-rest/core'
import { getSocietyDirector } from './get-list.contract'

const c = initContract()

export const societyDirectorContract = c.router({
  getSocietyDirector,
})
