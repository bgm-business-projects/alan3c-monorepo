import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { guestEditorialSchema } from './guest-editorial.type'

export const getGuestEditorial = {
  method: 'GET',
  path: `/items/guestEditorial`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    sort: z.string().default('-sortDate'),
    fields: z.string().default('*'),
  }),
  responses: {
    200: guestEditorialSchema,
  },
} satisfies AppRoute
