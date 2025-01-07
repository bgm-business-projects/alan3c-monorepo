import { z } from 'zod'

export const proceedingsSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      translations: z.array(
        z.object({
          id: z.number(),
          proceedings_id: z.number(),
          proceedingsLanguages_code: z.string(),
          title: z.string(), // title 是字串
          content: z.string(), // content 是 HTML 字串
        }),
      ),
    }),
  ),
})

export type Proceedings = z.infer<typeof proceedingsSchema>
