import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { referenceDocumentSchema } from './reference-document.type'

export const getReferenceDocument = {
  method: 'GET',
  path: `/items/referenceDocument`,
  query: z.object({
    'filter[documentTitle][_icontains]': z.string().optional(),
    'meta': z.string().default('filter_count'),
    'sort[]': z.string().default('-uploadDate'),
    'limit': z.string().optional(),
    'offset': z.string().optional(),
    'fields': z.string().default('*,video.*,file.*'),
  }),
  responses: {
    200: referenceDocumentSchema,
  },
} satisfies AppRoute
