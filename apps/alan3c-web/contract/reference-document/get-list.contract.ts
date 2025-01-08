import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { referenceDocumentSchema } from './reference-document.type'

export const getReferenceDocument = {
  method: 'GET',
  path: `/items/referenceDocument`,
  query: z.object({
    'filter[documentTitle][_contains]': z.string().optional(),
  }),
  responses: {
    200: referenceDocumentSchema,
  },
} satisfies AppRoute
