import { initContract } from '@ts-rest/core'
import { getConferenceAttendee } from './get-list.contract'

const c = initContract()

export const conferenceAttendeeContract = c.router({
  getConferenceAttendee,
})
