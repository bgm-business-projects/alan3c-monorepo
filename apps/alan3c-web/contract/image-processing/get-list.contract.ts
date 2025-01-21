import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { imageProcessingSchema } from './image-processing.type'

export const getImageProcessing = {
  method: 'GET',
  path: `/items/imageProcessing`,
  query: z.object({
    'filter[thesisTitle][_icontains]': z.string().optional(),
  }),
  responses: {
    200: imageProcessingSchema,
  },
} satisfies AppRoute
