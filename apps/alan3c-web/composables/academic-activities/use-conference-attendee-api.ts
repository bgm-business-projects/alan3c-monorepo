import type { ClientInferRequest } from '@ts-rest/core'
import { computed } from 'vue'
import { conferenceAttendeeContract } from '~/contract/personal-profile/academic-activities/conference-attendee'

type ConferenceAttendeeRequest = ClientInferRequest<typeof conferenceAttendeeContract>
export function useConferenceAttendeeApi(
  accessToken?: MaybeRefOrGetter<string | undefined>,
) {
  // const baseUrl = process.env.NUXT_API_BASE_URL;

  const conferenceAttendeeApi = computed(() => {
    const clientHeader = accessToken
      ? { authorization: `Bearer ${toValue(accessToken)}` }
      : {}
    return useClient(conferenceAttendeeContract, clientHeader)
  })

  async function findConferenceAttendee(params?: ConferenceAttendeeRequest['getConferenceAttendee']) {
    if (params) {
      const query = conferenceAttendeeContract.getConferenceAttendee.query.parse(params.query)
      const result = await conferenceAttendeeApi.value.getConferenceAttendee({
        ...params,
        query,
      })
      if (result.status === 200) {
        return result.body
      }
    }
    else {
      const result = await conferenceAttendeeApi.value.getConferenceAttendee()
      if (result.status === 200) {
        return result.body
      }
    }
  }

  return {
    findConferenceAttendee,
  }
}
