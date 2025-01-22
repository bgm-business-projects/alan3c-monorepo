import type { AppRoute } from '@ts-rest/core'
import { patentApplicationSchema } from './patent-application.type'

const translations = 'translations.*'

export const getPatentApplication = {
  method: 'GET',
  path: `/items/patentApplication?fields=*,${translations}`,
  responses: {
    200: patentApplicationSchema,
  },
} satisfies AppRoute
