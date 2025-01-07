import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { proceedingsSchema } from './proceedings.type'

export const getProceedings = {
  method: 'GET',
  path: `/items/proceedings`,
  responses: {
    200: proceedingsSchema,
  },
  query: z.object({
    'filter[translations][proceedingsLanguages_code][_eq]': z.enum(['zh', 'en']),
    'filter[translations][title][_eq]': z.string(),
    'fields': z.string().default('translations.*'),
  }),
} satisfies AppRoute
