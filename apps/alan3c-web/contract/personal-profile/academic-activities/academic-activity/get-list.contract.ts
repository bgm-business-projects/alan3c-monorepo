import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { academicActivitySchema } from './academic-activity.type'

export const getAcademicActivity = {
  method: 'GET',
  path: `/items/academicActivity`,
  query: z.object({
    fields: z.string().default('*,translations.*,itemList.academicActivityItem_id.translations.*,itemList.academicActivityItem_id.sortDate'),
    limit: z.number().default(9999),
  }),
  responses: {
    200: academicActivitySchema,
  },
} satisfies AppRoute
