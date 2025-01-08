import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { lecturePptSchema } from './lecture-ppt.type'

export const downloadReferenceDocumentFile = {
  method: 'GET',
  path: `/asset`,
  responses: {
    200: lecturePptSchema,
  },
  pathParams: z.object({
    id: z.string(),
  }),
} satisfies AppRoute
