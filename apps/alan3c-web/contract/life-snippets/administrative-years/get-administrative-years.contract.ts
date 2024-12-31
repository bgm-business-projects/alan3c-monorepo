import type { AppRoute } from '@ts-rest/core'
import { administrativeYearsListSchema } from './administrative-years.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subMainImage = 'administrativeYears.administrativeYears_id.mainImage.*'
const subTranslations = 'administrativeYears.administrativeYears_id.translations.*'
const moreFileList = 'administrativeYears.administrativeYears_id.moreFileList.*'

export const getAdministrativeYears = {
  method: 'GET',
  path: `/items/administrativeYearsMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList}`,
  responses: {
    200: administrativeYearsListSchema,
  },
} satisfies AppRoute
