import { z } from 'zod'

export const imageProcessingSchema = z.object({
})

export type ImageProcessing = z.infer<typeof imageProcessingSchema>
