import { z } from 'zod'
import { basicFileSchema } from '../basic-schema'

export const scholarSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      startAt: z.string(), // 日期作為字串處理
      endAt: z.string(), // 日期作為字串處理
      email: z.string().email(), // 驗證 email 格式
      translations: z.array(
        z.object({
          id: z.number(),
          scholar_id: z.number(),
          scholarLanguages_code: z.string(),
          name: z.string(),
          comeFrom: z.string(),
          expertise: z.string(),
        }),
      ),
      mainImage: basicFileSchema,
    }),
  ),
})

export type ScholarData = z.infer<typeof scholarSchema>
