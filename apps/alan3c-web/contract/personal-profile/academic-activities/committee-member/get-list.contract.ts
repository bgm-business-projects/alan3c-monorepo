import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { committeeMemberSchema } from './committee-member.type'

export const getCommitteeMember = {
  method: 'GET',
  path: `/items/committeeMember`,
  query: z.object({
    sort: z.string().default('-sortDate'),
    fields: z.string().default('*,translations.*'),
    limit: z.number().default(9999),
  }),
  responses: {
    200: committeeMemberSchema,
  },
} satisfies AppRoute
