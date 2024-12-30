import type { AppRoute } from '@ts-rest/core'
import { growthRecordsSchema } from './growth-record.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const growthRecord = 'growthRecord.*.*.*'

export const getGrowthRecord = {
  method: 'GET',
  path: `/items/growthRecordMain?fields=*,${mainImage},${translations},${growthRecord}`,
  responses: {
    200: growthRecordsSchema,
  },
} satisfies AppRoute
