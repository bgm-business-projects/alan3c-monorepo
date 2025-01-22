import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { imageProcessingSchema } from './image-processing.type'

export const getImageProcessing = {
  method: 'GET',
  path: `/items/imageProcessing`,
  query: z.object({
    'filter[thesisTitle][_icontains]': z.string().optional(),
    'meta': z.string().default('filter_count'),
    'limit': z.string().optional(),
    'offset': z.string().optional(),
    'fields': z.string().default('*,video.*,file.*'),
  }),
  responses: {
    200: imageProcessingSchema,
  },
} satisfies AppRoute
