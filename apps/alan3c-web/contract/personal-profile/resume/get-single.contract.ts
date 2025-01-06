import type { AppRoute } from '@ts-rest/core'
import { resumeSchema } from './resume.type'

const translations = 'translations.*'

export const getResume = {
  method: 'GET',
  path: `/items/resume?fields=*,${translations}`,
  responses: {
    200: resumeSchema,
  },
} satisfies AppRoute
