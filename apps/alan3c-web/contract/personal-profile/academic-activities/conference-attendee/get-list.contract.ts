import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { conferenceAttendeeSchema } from './conference-attendee.type'

export const getConferenceAttendee = {
  method: 'GET',
  path: `/items/conferenceAttendee`,
  query: z.object({
    sort: z.string().default('-sortDate'),
    fields: z.string().default('*,translations.*'),
    limit: z.number().default(9999),
  }),
  responses: {
    200: conferenceAttendeeSchema,
  },
} satisfies AppRoute
