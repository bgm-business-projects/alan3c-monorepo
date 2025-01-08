import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { artificialIntelligenceSchema } from './artificial-intelligence.type'

export const downloadArtificialIntelligenceFile = {
  method: 'GET',
  path: `/asset`,
  responses: {
    200: artificialIntelligenceSchema,
  },
  pathParams: z.object({
    id: z.string(),
  }),
} satisfies AppRoute
