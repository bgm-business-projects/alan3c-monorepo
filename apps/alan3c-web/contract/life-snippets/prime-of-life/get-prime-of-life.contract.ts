import type { AppRoute } from '@ts-rest/core'
import { primeOfLifesSchema } from './prime-of-life.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'
const primeOfLife = 'primeOfLife.*.*.*'

export const getPrimeOfLife = {
  method: 'GET',
  path: `/items/primeOfLifeMain?fields=*,${mainImage},${translations},${primeOfLife}`,
  responses: {
    200: primeOfLifesSchema,
  },
} satisfies AppRoute
