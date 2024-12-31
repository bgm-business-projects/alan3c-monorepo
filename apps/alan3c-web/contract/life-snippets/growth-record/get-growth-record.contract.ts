import type { AppRoute } from '@ts-rest/core'
import { growthRecordsSchema } from './growth-record.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subMainImage = 'growthRecord.growthRecord_id.mainImage.*'
const subTranslations = 'growthRecord.growthRecord_id.translations.*'
const moreFileList = 'growthRecord.growthRecord_id.moreFileList.*'

export const getGrowthRecord = {
  method: 'GET',
  path: `/items/growthRecordMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList}`,
  responses: {
    200: growthRecordsSchema,
  },
} satisfies AppRoute
