import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { domesticMagazineArticlesSchema } from './domestic-magazine-articles.type'

export const getDomesticMagazineArticles = {
  method: 'GET',
  path: `/items/domesticMagazineArticles`,
  query: z.object({
    meta: z.string().default('filter_count'),
    limit: z.string().optional(),
    offset: z.string().optional(),
    fields: z.string().default('*'),
  }),
  responses: {
    200: domesticMagazineArticlesSchema,
  },
} satisfies AppRoute
