import { initContract } from '@ts-rest/core'
import { getAcademicHonors } from './get-academic-honors.contract'
import { getFutureSpeech } from './get-list.contract'
import { getQuotes } from './get-quotes.contract'

const c = initContract()

export const futureSpeechContract = c.router({
  getFutureSpeech,
  getQuotes,
  getAcademicHonors,
})
