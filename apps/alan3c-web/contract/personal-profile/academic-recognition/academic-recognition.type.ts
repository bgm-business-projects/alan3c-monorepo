import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  academicRecognition_id: z.number(), // 所屬 resume 的 ID
  academicRecognitionLanguages_code: z.string(), // 語言代碼
  name: z.string().nullable(), // 名稱，可以為 null
  content: z.string().nullable(), // 內容，可以為 null
})

export const academicRecognitionSchema = z.object({
  data: z.object({
    id: z.number(), // resume 的 ID
    translations: z.array(translationSchema), // translation 的陣列
  }),
})

export type AcademicRecognition = z.infer<typeof academicRecognitionSchema>

export const isAcademicRecognition = (data: unknown): data is AcademicRecognition => academicRecognitionSchema.safeParse(data).success
