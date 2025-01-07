import type { AppRoute } from '@ts-rest/core'
import { proceedingsSchema } from './proceedings.type'

const translations = 'translations.*'
export const getProceedingsList = {
  method: 'GET',
  path: `/items/proceedings?fields=*,${translations}`,
  responses: {
    200: proceedingsSchema,
  },
} satisfies AppRoute
