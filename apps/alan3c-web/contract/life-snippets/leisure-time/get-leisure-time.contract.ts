import type { AppRoute } from '@ts-rest/core'
import { leisureTimesSchema } from './leisure-time.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const leisureTime = 'leisureTime.*.*.*'

export const getLeisureTime = {
  method: 'GET',
  path: `/items/leisureTimeMain?fields=*,${mainImage},${translations},${leisureTime}`,
  responses: {
    200: leisureTimesSchema,
  },
} satisfies AppRoute
