import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  curriculumVitae_id: z.number(), // 所屬 resume 的 ID
  curriculumVitaeLanguages_code: z.string(), // 語言代碼
  name: z.string().nullable(), // 名稱，可以為 null
  content: z.string().nullable(), // 內容，可以為 null
})

export const curriculumVitaeSchema = z.object({
  data: z.object({
    id: z.number(), // resume 的 ID
    translations: z.array(translationSchema), // translation 的陣列
  }),
})

export type CurriculumVitae = z.infer<typeof curriculumVitaeSchema>
export const isCurriculumVitae = (data: unknown): data is CurriculumVitae => curriculumVitaeSchema.safeParse(data).success
