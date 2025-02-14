import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  academicGroup_id: z.number(), // 所屬 resume 的 ID
  academicGroupLanguages_code: z.string(), // 語言代碼
  title: z.string().nullable(), // 名稱，可以為 null
})

export const academicGroupSchema = z.object({
  data: z.array(z.object({
    id: z.number(), // resume 的 ID
    sort: z.number().nullable(), // 排序
    sortDate: z.string(), // 排序日期,
    displayName: z.string().nullable(), // 顯示名稱
    translations: z.array(translationSchema), // translation 的陣列
  })),
})

export type AcademicGroup = z.infer<typeof academicGroupSchema>
export const isAcademicGroup = (data: unknown): data is AcademicGroup => academicGroupSchema.safeParse(data).success
