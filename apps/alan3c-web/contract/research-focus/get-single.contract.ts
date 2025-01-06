import type { AppRoute } from '@ts-rest/core'
import { researchFocusSchema } from './research-focus.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'

export const getResearchFocus = {
  method: 'GET',
  path: `/items/researchFocus?fields=*,${mainImage},${translations}`,
  responses: {
    200: researchFocusSchema,
  },

} satisfies AppRoute
