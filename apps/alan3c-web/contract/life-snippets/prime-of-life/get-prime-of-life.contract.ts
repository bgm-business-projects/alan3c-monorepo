import type { AppRoute } from '@ts-rest/core'
import { primeOfLifesSchema } from './prime-of-life.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const subMainImage = 'primeOfLife.primeOfLife_id.mainImage.*'
const subTranslations = 'primeOfLife.primeOfLife_id.translations.*'
const moreFileList = 'primeOfLife.primeOfLife_id.moreFileList.*'

export const getPrimeOfLife = {
  method: 'GET',
  path: `/items/primeOfLifeMain?fields=*,${mainImage},${translations},${subMainImage},${subTranslations},${moreFileList}`,
  responses: {
    200: primeOfLifesSchema,
  },
} satisfies AppRoute
