import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { artificialIntelligenceSchema } from './artificial-intelligence.type'

export const createArtificialIntelligence = {
  method: 'POST',
  path: `/items/artificialIntelligence`,
  contentType: 'application/json',
  body: z.object({
    thesisTitle: z.string().optional(),
    academicJournal: z.string().optional(),
    reportDate: z.string().optional(),
    paperAuthor: z.string().optional(),
    reporter: z.string().optional(),
    video: z.string().optional(),
    file: z.string().optional(),
  }),
  responses: {
    200: artificialIntelligenceSchema,
  },
} satisfies AppRoute
