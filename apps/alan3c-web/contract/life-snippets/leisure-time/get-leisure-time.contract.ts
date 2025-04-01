import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { leisureTimeDeepSchema, leisureTimeMoreFileSchema, leisureTimeSchema } from './leisure-time.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subId = 'leisureTime.leisureTime_id.id'
const subMainImage = 'leisureTime.leisureTime_id.file.*'
const subTranslations = 'leisureTime.leisureTime_id.translations.*'
const moreFileList = 'leisureTime.leisureTime_id.moreFileList.*'

export const getLeisureTime = {
  method: 'GET',
  path: `/items/leisureTimeMain?fields=*,${mainImage},${translations}`,
  responses: {
    200: leisureTimeSchema,
  },
} satisfies AppRoute

export const getLeisureTimeDeep = {
  method: 'GET',
  path: `/items/leisureTimeMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList},${subId}`,
  responses: {
    200: leisureTimeDeepSchema,
  },
} satisfies AppRoute

export const getLeisureTimeMoreFile = {
  method: 'GET',
  path: `/items/leisureTime`,
  query: z.object({
    'filter[id][_eq]': z.number(),
    'fields': z.string().default('*,moreFileList.directus_files_id.*'),
  }),
  responses: {
    200: leisureTimeMoreFileSchema,
  },
} satisfies AppRoute
