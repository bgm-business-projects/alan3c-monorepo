import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  conferenceAttendee_id: z.number(), // 所屬 resume 的 ID
  conferenceAttendeeLanguages_code: z.string(), // 語言代碼
  conferenceName: z.string().nullable(), // 名稱，可以為 null
  location: z.string().nullable(), // 內容，可以為 null
})

export const conferenceAttendeeSchema = z.object({
  data: z.array(z.object({
    id: z.number(), // resume 的 ID
    sort: z.number().nullable(), // 排序
    sortDate: z.string(), // 排序日期,
    displayName: z.string().nullable(), // 顯示名稱
    translations: z.array(translationSchema), // translation 的陣列
    publishedPapers: z.number(), // 內容，可以為 null
  })),
})

export type ConferenceAttendee = z.infer<typeof conferenceAttendeeSchema>
export const isConferenceAttendee = (data: unknown): data is ConferenceAttendee => conferenceAttendeeSchema.safeParse(data).success
