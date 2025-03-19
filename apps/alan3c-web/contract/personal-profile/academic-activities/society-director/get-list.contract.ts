import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { societyDirectorSchema } from './society-director.type'

export const getSocietyDirector = {
  method: 'GET',
  path: `/items/societyDirector`,
  query: z.object({
    sort: z.string().default('-sortDate'),
    fields: z.string().default('*,translations.*'),
    limit: z.number().default(9999),
  }),
  responses: {
    200: societyDirectorSchema,
  },
} satisfies AppRoute
