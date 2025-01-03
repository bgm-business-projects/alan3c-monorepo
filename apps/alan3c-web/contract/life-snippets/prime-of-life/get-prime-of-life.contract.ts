import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { primeOfLifeDeepSchema, primeOfLifeMoreFileSchema, primeOfLifeSchema } from './prime-of-life.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subId = 'primeOfLife.primeOfLife_id.id'
const subMainImage = 'primeOfLife.primeOfLife_id.file.*'
const subTranslations = 'primeOfLife.primeOfLife_id.translations.*'
const moreFileList = 'primeOfLife.primeOfLife_id.moreFileList.*'

export const getPrimeOfLife = {
  method: 'GET',
  path: `/items/primeOfLifeMain?fields=*,${mainImage},${translations}`,
  responses: {
    200: primeOfLifeSchema,
  },
} satisfies AppRoute

export const getPrimeOfLifeDeep = {
  method: 'GET',
  path: `/items/primeOfLifeMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList},${subId}`,
  responses: {
    200: primeOfLifeDeepSchema,
  },
} satisfies AppRoute

export const getPrimeOfLifeMoreFile = {
  method: 'GET',
  path: `/items/primeOfLifeMain`,
  query: z.object({
    'filter[primeOfLife][primeOfLife_id][id][_eq]': z.number(),
    'fields': z.string().default('primeOfLife.primeOfLife_id.moreFileList.directus_files_id.*'),
  }),
  responses: {
    200: primeOfLifeMoreFileSchema,
  },
} satisfies AppRoute
