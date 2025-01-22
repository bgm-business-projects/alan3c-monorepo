import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  patentApplication_id: z.number(), // 所屬 patent application 的 ID
  patentApplicationLanguages_code: z.string(), // 語言代碼
  name: z.string().nullable(), // 名稱，可以為 null
  content: z.string().nullable(), // 內容，可以為 null
})

export const patentApplicationSchema = z.object({
  data: z.object({
    id: z.number(), // patent application 的 ID
    translations: z.array(translationSchema), // translation 的陣列
  }),
})

export type PatentApplication = z.infer<typeof patentApplicationSchema>

export const isPatentApplication = (data: unknown): data is PatentApplication => patentApplicationSchema.safeParse(data).success
