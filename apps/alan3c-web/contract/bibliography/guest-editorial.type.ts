import { z } from 'zod'

export const guestEditorialSchema = z.object({
  meta: z.object({
    filter_count: z.string(),
  }),
  data: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      sortDate: z.string(),
    }),
  ),
})

export type GuestEditorial = z.infer<typeof guestEditorialSchema>
