import { computed } from 'vue'
import { journalEditorContract } from '~/contract/personal-profile/academic-activities/journal-editor'

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

  async function findJournalEditor() {
    const result = await journalEditorApi.value.getJournalEditor()
    if (result.status === 200) {
      return result.body
    }
  }

  return {
    findJournalEditor,
  }
}
