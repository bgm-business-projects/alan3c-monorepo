import type { AppRoute } from '@ts-rest/core'
import { primeOfLifeDeepSchema, primeOfLifeSchema } from './prime-of-life.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
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
  path: `/items/primeOfLifeMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList}`,
  responses: {
    200: primeOfLifeDeepSchema,
  },
} satisfies AppRoute
