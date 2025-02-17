import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  paperReviewer_id: z.number(), // 所屬 resume 的 ID
  paperReviewerLanguages_code: z.string(), // 語言代碼
  title: z.string().nullable(), // 名稱，可以為 null
})

export const paperReviewerSchema = z.object({
  data: z.array(z.object({
    id: z.number(), // resume 的 ID
    sort: z.number().nullable(), // 排序
    sortDate: z.string(), // 排序日期,
    displayName: z.string().nullable(), // 顯示名稱
    translations: z.array(translationSchema), // translation 的陣列
  })),
})

export type PaperReviewer = z.infer<typeof paperReviewerSchema>
export const isPaperReviewer = (data: unknown): data is PaperReviewer => paperReviewerSchema.safeParse(data).success

const extensionTranslationSchema = z.object({
  id: z.number(), // translation 的 ID
  paperReviewerExtension_id: z.number(), // 所屬 resume 的 ID
  paperReviewerExtensionLanguages_code: z.string(), // 語言代碼
  text: z.string().nullable(), // 名稱，可以為 null
})

// 供項目下方備註使用
export const paperReviewerExtensionSchema = z.object({
  data: z.object({
    id: z.number(),
    translations: z.array(extensionTranslationSchema),
  }),
})

export type PaperReviewerExtension = z.infer<typeof paperReviewerExtensionSchema>
