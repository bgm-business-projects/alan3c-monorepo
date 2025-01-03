import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { administrativeYearsDeepSchema, administrativeYearsMoreFileSchema, administrativeYearsSchema } from './administrative-years.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subId = 'administrativeYears.administrativeYears_id.id'
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
  path: `/items/administrativeYearsMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList},${subId}`,
  responses: {
    200: administrativeYearsDeepSchema,
  },
} satisfies AppRoute

export const getAdministrativeYearsMoreFile = {
  method: 'GET',
  path: `/items/administrativeYearsMain`,
  query: z.object({
    'filter[administrativeYears][administrativeYears_id][id][_eq]': z.number(),
    'fields': z.string().default('administrativeYears.administrativeYears_id.moreFileList.directus_files_id.*'),
  }),
  responses: {
    200: administrativeYearsMoreFileSchema,
  },
} satisfies AppRoute
