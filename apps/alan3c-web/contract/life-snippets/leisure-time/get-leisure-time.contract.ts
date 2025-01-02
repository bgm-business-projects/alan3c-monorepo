import type { AppRoute } from '@ts-rest/core'
import { leisureTimeDeepSchema, leisureTimeSchema } from './leisure-time.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
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
  path: `/items/leisureTimeMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList}`,
  responses: {
    200: leisureTimeDeepSchema,
  },
} satisfies AppRoute
