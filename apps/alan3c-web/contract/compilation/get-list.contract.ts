import type { AppRoute } from '@ts-rest/core'
import { compilationSchema } from './compilation.type'

const translations = 'translations.*'
export const getCompilationList = {
  method: 'GET',
  path: `/items/compilation?fields=*,${translations}`,
  responses: {
    200: compilationSchema,
  },
} satisfies AppRoute
