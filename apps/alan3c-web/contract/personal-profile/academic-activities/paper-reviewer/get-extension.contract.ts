import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { paperReviewerExtensionSchema } from './paper-reviewer.type'

export const getPaperReviewerExtension = {
  method: 'GET',
  path: `/items/paperReviewerExtension`,
  query: z.object({
    fields: z.string().default('*,translations.*'),
  }),
  responses: {
    200: paperReviewerExtensionSchema,
  },
} satisfies AppRoute
