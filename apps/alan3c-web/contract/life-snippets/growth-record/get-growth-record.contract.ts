import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { growthRecordDeepSchema, growthRecordMoreFileSchema, growthRecordSchema } from './growth-record.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subMainImage = 'growthRecord.growthRecord_id.file.*'
const subTranslations = 'growthRecord.growthRecord_id.translations.*'
const subId = 'growthRecord.growthRecord_id.id'
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
  path: `/items/growthRecordMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList},${subId}`,
  responses: {
    200: growthRecordDeepSchema,
  },
} satisfies AppRoute

export const getGrowthRecordMoreFile = {
  method: 'GET',
  path: `/items/growthRecordMain`,
  query: z.object({
    'filter[growthRecord][growthRecord_id][id][_eq]': z.number(),
    'fields': z.string().default('growthRecord.growthRecord_id.moreFileList.directus_files_id.*'),
  }),
  responses: {
    200: growthRecordMoreFileSchema,
  },
} satisfies AppRoute
