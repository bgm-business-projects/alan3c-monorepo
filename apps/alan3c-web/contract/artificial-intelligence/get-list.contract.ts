import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { artificialIntelligenceSchema } from './artificial-intelligence.type'

export const getArtificialIntelligence = {
  method: 'GET',
  path: `/items/artificialIntelligence`,
  query: z.object({
    'filter[thesisTitle][_contains]': z.string().optional(),
  }),
  responses: {
    200: artificialIntelligenceSchema,
  },
} satisfies AppRoute
