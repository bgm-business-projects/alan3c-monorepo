import type { AppRoute } from '@ts-rest/core'
import { administrativeYearsDeepSchema, administrativeYearsSchema } from './administrative-years.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subMainImage = 'administrativeYears.administrativeYears_id.file.*'
const subTranslations = 'administrativeYears.administrativeYears_id.translations.*'
const moreFileList = 'administrativeYears.administrativeYears_id.moreFileList.*'

export const getAdministrativeYears = {
  method: 'GET',
  path: `/items/administrativeYearsMain?fields=*,${mainImage},${translations}`,
  responses: {
    200: administrativeYearsSchema,
  },
} satisfies AppRoute

export const getAdministrativeYearsDeep = {
  method: 'GET',
  path: `/items/administrativeYearsMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList}`,
  responses: {
    200: administrativeYearsDeepSchema,
  },
} satisfies AppRoute
