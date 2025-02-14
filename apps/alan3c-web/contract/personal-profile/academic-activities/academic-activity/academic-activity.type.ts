import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  academicActivity_id: z.number(), // 所屬 resume 的 ID
  academicActivityLanguages_code: z.string(), // 語言代碼
  text: z.string().nullable(), // 名稱，可以為 null
})

const itemTranslationSchema = z.object({
  id: z.number(), // translation 的 ID
  academicActivityItem_id: z.number(), // 所屬 resume 的 ID
  academicActivityItemLanguages_code: z.string(), // 語言代碼
  text: z.string().nullable(), // 名稱，可以為 null
})

export const academicActivitySchema = z.object({
  data: z.array(z.object({
    id: z.number(), // resume 的 ID
    sort: z.number().nullable(), // 排序
    displayText: z.string().nullable(), // 顯示名稱
    translations: z.array(translationSchema), // translation 的陣列
    itemList: z.array(z.object({
      academicActivityItem_id: z.object({
        translations: z.array(itemTranslationSchema),
        sortDate: z.string().nullable(),
      }),
    })),
  })),
})

export type AcademicActivity = z.infer<typeof academicActivitySchema>
export const isAcademicActivity = (data: unknown): data is AcademicActivity => academicActivitySchema.safeParse(data).success
