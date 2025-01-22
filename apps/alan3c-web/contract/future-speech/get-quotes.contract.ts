import type { AppRoute } from '@ts-rest/core'
import { quotesSchema } from './quotes.type'

export const getQuotes = {
  method: 'GET',
  path: `/items/quotes`,
  responses: {
    200: quotesSchema,
  },

} satisfies AppRoute
