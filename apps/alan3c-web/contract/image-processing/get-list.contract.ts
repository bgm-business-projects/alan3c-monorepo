import type { AppRoute } from '@ts-rest/core'
import { imageProcessingSchema } from './image-processing.type'

const file = 'file.*'

export const getImageProcessing = {
  method: 'GET',
  path: `/items/imageProcessing?fields=*,${file}`,
  responses: {
    200: imageProcessingSchema,
  },
} satisfies AppRoute

// export const addImageProcessingDownloadCount = {
//   method: 'PATCH',
//   path: `/items/imageProcessing`,
//   responses: {
//     200: imageProcessingSchema,
//   },
//   body: {
//     downloadCount: z.
//   }
// } satisfies AppRoute
