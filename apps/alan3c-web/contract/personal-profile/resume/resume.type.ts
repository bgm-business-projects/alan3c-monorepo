import { z } from 'zod'

export const resumeSchema = z.object({
})

export type Resume = z.infer<typeof resumeSchema>
