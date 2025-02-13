import { initContract } from '@ts-rest/core'
import { getJournalEditor } from './get-list.contract'

const c = initContract()

export const journalEditorContract = c.router({
  getJournalEditor,
})
