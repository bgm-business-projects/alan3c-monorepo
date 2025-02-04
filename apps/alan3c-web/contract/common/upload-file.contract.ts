import { type AppRoute, initContract } from '@ts-rest/core'
import { z } from 'zod'

export const uploadFile = {
  method: 'POST',
  path: `/files`,
  contentType: 'multipart/form-data',
  body: initContract().type<{
    folder: string;
    file: File;
  }>(),
  responses: {
    200: z.any(),
  },
} satisfies AppRoute
