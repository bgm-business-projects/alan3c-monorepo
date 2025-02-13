import type { AppRoute } from '@ts-rest/core'
import { journalEditorSchema } from './journal-editor.type'

const translations = 'translations.*'

export const getJournalEditor = {
  method: 'GET',
  path: `/items/journalEditor?fields=*,${translations}`,
  responses: {
    200: journalEditorSchema,
  },
} satisfies AppRoute
