import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { traineeListSchema } from './trainee.type'

export const downloadTraineeFile = {
  method: 'GET',
  path: `/asset`,
  responses: {
    200: traineeListSchema,
  },
  pathParams: z.object({
    id: z.string(),
  }),
} satisfies AppRoute
