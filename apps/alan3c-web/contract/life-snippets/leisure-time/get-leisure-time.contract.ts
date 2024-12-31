import type { AppRoute } from '@ts-rest/core'
import { leisureTimesSchema } from './leisure-time.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subMainImage = 'leisureTime.leisureTime_id.mainImage.*'
const subTranslations = 'leisureTime.leisureTime_id.translations.*'
const moreFileList = 'leisureTime.leisureTime_id.moreFileList.*'

export const getLeisureTime = {
  method: 'GET',
  path: `/items/leisureTimeMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList}`,
  responses: {
    200: leisureTimesSchema,
  },
} satisfies AppRoute
