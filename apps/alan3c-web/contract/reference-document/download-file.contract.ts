import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { referenceDocumentSchema } from './reference-document.type'

export const downloadReferenceDocumentFile = {
  method: 'GET',
  path: `/asset`,
  responses: {
    200: referenceDocumentSchema,
  },
  pathParams: z.object({
    id: z.string(),
  }),
} satisfies AppRoute
