import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  servicesToPractitionersCommunity_id: z.number(), // 所屬 ID
  servicesToPractitionersCommunityLanguages_code: z.string(), // 語言代碼
  name: z.string().nullable(), // 名稱，可以為 null
  content: z.string().nullable(), // 內容，可以為 null
})

export const servicesToPractitionersCommunitySchema = z.object({
  data: z.object({
    id: z.number(), // patent application 的 ID
    translations: z.array(translationSchema), // translation 的陣列
  }),
})

export type ServicesToPractitionersCommunity = z.infer<typeof servicesToPractitionersCommunitySchema>

export const isServicesToPractitionersCommunity = (data: unknown): data is ServicesToPractitionersCommunity => servicesToPractitionersCommunitySchema.safeParse(data).success
