import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { paperReviewerSchema } from './paper-reviewer.type'

export const getPaperReviewer = {
  method: 'GET',
  path: `/items/paperReviewer`,
  query: z.object({
    sort: z.string().default('-sortDate'),
    fields: z.string().default('*,translations.*'),
    limit: z.number().default(9999),
  }),
  responses: {
    200: paperReviewerSchema,
  },
} satisfies AppRoute
