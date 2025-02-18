import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { technicalReportsSchema } from './technical-reports.type'

export const getTechnicalReports = {
  method: 'GET',
  path: `/items/technicalReports`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    fields: z.string().default('*'),
  }),
  responses: {
    200: technicalReportsSchema,
  },
} satisfies AppRoute
