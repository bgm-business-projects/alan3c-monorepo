import type { AppRoute } from '@ts-rest/core'
import { servicesToPractitionersCommunitySchema } from './services-to-practitioners-community.type'

const translations = 'translations.*'

export const getServicesToPractitionersCommunity = {
  method: 'GET',
  path: `/items/servicesToPractitionersCommunity?fields=*,${translations}`,
  responses: {
    200: servicesToPractitionersCommunitySchema,
  },
} satisfies AppRoute
