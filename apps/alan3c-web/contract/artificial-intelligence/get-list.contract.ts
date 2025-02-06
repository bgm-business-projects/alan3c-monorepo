import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { artificialIntelligenceSchema } from './artificial-intelligence.type'

export const getArtificialIntelligence = {
  method: 'GET',
  path: `/items/artificialIntelligence`,
  query: z.object({
    'filter[thesisTitle][_icontains]': z.string().optional(),
    'sort[]': z.string().default('-reportDate'),
    'meta': z.string().default('filter_count'),
    'limit': z.string().optional(),
    'offset': z.string().optional(),
    'fields': z.string().default('*,video.*,file.*'),
  }),
  responses: {
    200: artificialIntelligenceSchema,
  },
} satisfies AppRoute
