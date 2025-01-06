import type { AppRoute } from '@ts-rest/core'
import { coursesTaughtSchema } from './courses-taught.type'

const translations = 'translations.*'

export const getCoursesTaught = {
  method: 'GET',
  path: `/items/coursesTaught?fields=*,${translations}`,
  responses: {
    200: coursesTaughtSchema,
  },
} satisfies AppRoute
