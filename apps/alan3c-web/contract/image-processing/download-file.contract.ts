import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { imageProcessingSchema } from './image-processing.type'

export const downloadTraineeFile = {
  method: 'GET',
  path: `/asset`,
  responses: {
    200: imageProcessingSchema,
  },
  pathParams: z.object({
    id: z.string(),
  }),
} satisfies AppRoute
