import { initContract } from '@ts-rest/core'
import { getResearchFocus } from './get-single.contract'

const c = initContract()

export const researchFocusContract = c.router({
  getResearchFocus,
})
