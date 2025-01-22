import { z } from 'zod'

export const quotesSchema = z.object({
  data: z.object({
    content: z.string(),
  }),
})

export type Quotes = z.infer<typeof quotesSchema>
