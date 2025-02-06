import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'

export const checkDirectusUser = {
  method: 'GET',
  path: `/users/me`,
  responses: {
    200: z.object({
      data: z.object({
        id: z.string().uuid(),
      }),
    }),
  },
} satisfies AppRoute
