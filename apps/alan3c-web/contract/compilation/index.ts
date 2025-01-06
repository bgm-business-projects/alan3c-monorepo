import { initContract } from '@ts-rest/core'
import { getCompilationList } from './get-list.contract'
import { getCompilation } from './get-single.contract'

const c = initContract()

export const compilationContract = c.router({
  getCompilationList,
  getCompilation,
})
