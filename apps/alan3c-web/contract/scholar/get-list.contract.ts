import type { AppRoute } from '@ts-rest/core'
import { scholarSchema } from './scholar.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'

export const getScholar = {
  method: 'GET',
  path: `/items/scholar?fields=*,${mainImage},${translations}`,
  responses: {
    200: scholarSchema,
  },

} satisfies AppRoute
