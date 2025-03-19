import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { journalEditorSchema } from './journal-editor.type'

export const getJournalEditor = {
  method: 'GET',
  path: `/items/journalEditor`,
  query: z.object({
    sort: z.string().default('-sortDate'),
    fields: z.string().default('*,translations.*'),
    limit: z.number().default(9999),
  }),
  responses: {
    200: journalEditorSchema,
  },
} satisfies AppRoute
