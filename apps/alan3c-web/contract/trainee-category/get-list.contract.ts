import type { AppRoute } from '@ts-rest/core'
import { traineeCategoryListSchema } from './trainee-category.type'

const translations = 'translations.*'

export const getTraineeCategories = {
  method: 'GET',
  path: `/items/traineeCategories?fields=*,${translations}`,
  responses: {
    200: traineeCategoryListSchema,
  },
  // headers: z.object({
  //   pagination: z.string().optional(),
  // }),
  // query: z.object({
  //   take: z.string().transform(Number).optional(),
  //   skip: z.string().transform(Number).optional(),
  //   search: z.string().optional(),
  // }),
} satisfies AppRoute
