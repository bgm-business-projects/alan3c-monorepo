import type { AppRoute } from '@ts-rest/core'
import { resumeSchema } from './resume.type'

export const getResume = {
  method: 'GET',
  path: `/items/resume?fields=*`,
  responses: {
    200: resumeSchema,
  },
} satisfies AppRoute
