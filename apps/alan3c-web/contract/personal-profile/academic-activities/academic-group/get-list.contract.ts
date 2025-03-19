import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { academicGroupSchema } from './academic-group.type'

export const getAcademicGroup = {
  method: 'GET',
  path: `/items/academicGroup`,
  query: z.object({
    sort: z.string().default('-sortDate'),
    fields: z.string().default('*,translations.*'),
    limit: z.number().default(9999),
  }),
  responses: {
    200: academicGroupSchema,
  },
} satisfies AppRoute
