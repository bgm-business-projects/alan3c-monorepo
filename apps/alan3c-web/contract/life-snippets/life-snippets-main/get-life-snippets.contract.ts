import type { AppRoute } from '@ts-rest/core'
import { lifeSnippetsMainSchema } from './life-snippets-main.type'

const mainImage = 'mainImage.*'
const translations = 'translations.*'

export const getLifeSnippets = {
  method: 'GET',
  path: `/items/lifeSnippets?fields=*,${mainImage},${translations}`,
  responses: {
    200: lifeSnippetsMainSchema,
  },
} satisfies AppRoute
