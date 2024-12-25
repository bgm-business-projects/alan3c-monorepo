import { initContract } from '@ts-rest/core'
import { getHome } from './get-single.contract'

const c = initContract()

export const homeContract = c.router({
  getHome,
})
