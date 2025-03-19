import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { consultantRoleSchema } from './consultant-role.type'

export const getConsultantRole = {
  method: 'GET',
  path: `/items/consultantRole`,
  query: z.object({
    sort: z.string().default('-sortDate'),
    fields: z.string().default('*,translations.*'),
    limit: z.number().default(9999),
  }),
  responses: {
    200: consultantRoleSchema,
  },
} satisfies AppRoute
