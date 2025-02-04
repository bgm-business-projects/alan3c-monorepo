import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { imageProcessingSchema } from './image-processing.type'

export const createImageProcessing = {
  method: 'POST',
  path: `/items/imageProcessing`,
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
    200: imageProcessingSchema,
  },
} satisfies AppRoute
