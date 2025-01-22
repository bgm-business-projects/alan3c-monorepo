import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { futureSpeechSchema } from './future-speech.type'

export const getFutureSpeech = {
  method: 'GET',
  path: `/items/academicLectureRecord`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    fields: z.string().default('*,translations.*'),
  }),
  responses: {
    200: futureSpeechSchema,
  },

} satisfies AppRoute
