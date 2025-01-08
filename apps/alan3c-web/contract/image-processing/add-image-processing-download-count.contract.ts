import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { downloadCountAPIResponseSchema } from './image-processing.type'

export const addImageProcessingDownloadCount = {
  method: 'GET',
  path: `/download-file/:collection/:id`,
  responses: {
    200: downloadCountAPIResponseSchema,
  },
  pathParams: z.object({
    collection: z.string(),
    id: z.string(),
  }),
} satisfies AppRoute
