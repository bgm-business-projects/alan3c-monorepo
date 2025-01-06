import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { compilationSchema } from './compilation.type'

export const getCompilation = {
  method: 'GET',
  path: `/items/compilation`,
  responses: {
    200: compilationSchema,
  },
  query: z.object({
    'filter[translations][compilationLanguages_code][_eq]': z.enum(['zh', 'en']),
    'filter[translations][title][_eq]': z.string(),
    'fields': z.string().default('translations.*'),
  }),
} satisfies AppRoute
