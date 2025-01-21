import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { traineeListSchema } from './trainee.type'

const mainImage = 'mainImage.*'
const file = 'file.*'
const traineeCategory = 'traineeCategory.*,traineeCategory.translations.*'
const translations = 'translations.*'

export const getTraineeList = {
  method: 'GET',
  path: `/items/trainee`,
  responses: {
    200: traineeListSchema,
  },
  query: z.optional(z.object({
    'filter[_and][0][traineeCategory][translations][name][_eq]': z.string().optional(),
    'filter[_and][0][translations][name][_icontains]': z.string().optional(),
    'fields': z.string().default(`*,${mainImage},${translations},${traineeCategory},${file}`),
  })),

} satisfies AppRoute
