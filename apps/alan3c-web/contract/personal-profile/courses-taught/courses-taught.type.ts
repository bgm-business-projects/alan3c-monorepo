import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  coursesTaught_id: z.number(), // 所屬 resume 的 ID
  coursesTaughtLanguages_code: z.string(), // 語言代碼
  name: z.string().nullable(), // 名稱，可以為 null
  content: z.string().nullable(), // 內容，可以為 null
})

export const coursesTaughtSchema = z.object({
  data: z.object({
    id: z.number(), // resume 的 ID
    translations: z.array(translationSchema), // translation 的陣列
  }),
})

export type CoursesTaught = z.infer<typeof coursesTaughtSchema>
export const isCoursesTaught = (data: unknown): data is CoursesTaught => coursesTaughtSchema.safeParse(data).success
