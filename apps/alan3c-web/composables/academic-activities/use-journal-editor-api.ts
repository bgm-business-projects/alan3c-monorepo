import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { journalEditorContract } from '~/contract/personal-profile/academic-activities/journal-editor'

type JournalEditorRequest = ClientInferRequest<typeof journalEditorContract>
export function useJournalEditorApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const journalEditorApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(journalEditorContract, clientHeader)
  })

  async function findJournalEditor(params?: JournalEditorRequest['getJournalEditor']) {
    if (params) {
      const query = journalEditorContract.getJournalEditor.query.parse(params.query)
      const result = await journalEditorApi.value.getJournalEditor({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await journalEditorApi.value.getJournalEditor()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findJournalEditor,
  }
}
