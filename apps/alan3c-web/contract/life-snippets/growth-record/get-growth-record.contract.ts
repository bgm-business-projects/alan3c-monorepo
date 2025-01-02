import type { AppRoute } from '@ts-rest/core'
import { growthRecordDeepSchema, growthRecordSchema } from './growth-record.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subMainImage = 'growthRecord.growthRecord_id.file.*'
const subTranslations = 'growthRecord.growthRecord_id.translations.*'
const moreFileList = 'growthRecord.growthRecord_id.moreFileList.*'

export const getGrowthRecord = {
  method: 'GET',
  path: `/items/growthRecordMain?fields=*,${mainImage},${translations}`,
  responses: {
    200: growthRecordSchema,
  },
} satisfies AppRoute

export const getGrowthRecordDeep = {
  method: 'GET',
  path: `/items/growthRecordMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList}`,
  responses: {
    200: growthRecordDeepSchema,
  },
} satisfies AppRoute
