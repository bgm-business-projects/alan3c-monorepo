import { z } from 'zod'

export const compilationSchema = z.object({
  meta: z.object({
    filter_count: z.string(),
  }),
  data: z.array(
    z.object({
      id: z.number(),
      translations: z.array(
        z.object({
          id: z.number(),
          compilation_id: z.number(),
          compilationLanguages_code: z.string(),
          title: z.string(), // title 是字串
          content: z.string(), // content 是 HTML 字串
        }),
      ),
    }),
  ),
})

export type Compilation = z.infer<typeof compilationSchema>
