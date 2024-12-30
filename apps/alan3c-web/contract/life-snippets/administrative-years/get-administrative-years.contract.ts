import type { AppRoute } from '@ts-rest/core'
import { administrativeYearsListSchema } from './administrative-years.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const administrativeYears = 'administrativeYears.*.*.*'

export const getAdministrativeYears = {
  method: 'GET',
  path: `/items/administrativeYearsMain?fields=*,${mainImage},${translations},${administrativeYears}`,
  responses: {
    200: administrativeYearsListSchema,
  },
} satisfies AppRoute
