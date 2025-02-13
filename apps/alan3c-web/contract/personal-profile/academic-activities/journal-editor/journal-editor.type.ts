import { z } from 'zod'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  journalEditor_id: z.number(), // 所屬 resume 的 ID
  journalEditorLanguages_code: z.string(), // 語言代碼
  title: z.string().nullable(), // 名稱，可以為 null
})

export const journalEditorSchema = z.object({
  data: z.array(z.object({
    id: z.number(), // resume 的 ID
    sort: z.number().nullable(), // 排序
    sortDate: z.string(), // 排序日期,
    displayName: z.string().nullable(), // 顯示名稱
    translations: z.array(translationSchema), // translation 的陣列
  })),
})

export type JournalEditor = z.infer<typeof journalEditorSchema>
export const isJournalEditor = (data: unknown): data is JournalEditor => journalEditorSchema.safeParse(data).success
