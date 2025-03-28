import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  resume_id: z.number(), // 所屬 resume 的 ID
  resumeLanguages_code: z.string(), // 語言代碼
  name: z.string().nullable(), // 名稱，可以為 null
  content: z.string().nullable(), // 內容，可以為 null
})

export const resumeSchema = z.object({
  data: z.object({
    id: z.number(), // resume 的 ID
    translations: z.array(translationSchema), // translation 的陣列
  }),
})

export type Resume = z.infer<typeof resumeSchema>

export const isResume = (data: unknown): data is Resume => resumeSchema.safeParse(data).success
