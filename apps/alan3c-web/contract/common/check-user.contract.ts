import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'

export const checkDirectusUser = {
  method: 'GET',
  path: `/users/me`,
  responses: {
    200: z.any(),
  },
} satisfies AppRoute
