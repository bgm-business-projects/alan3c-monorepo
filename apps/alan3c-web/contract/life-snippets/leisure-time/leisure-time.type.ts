import { z } from 'zod'
import { basicFileSchema } from '../../basic-schema'

export const translationSchema = z.object({
  id: z.number(),
  leisureTimeMain_id: z.number(),
  leisureTimeMainLanguages_code: z.string(),
  name: z.string(),
})

export const snapshotTranslationSchema = z.object({
  id: z.number(),
  leisureTime_id: z.number(),
  leisureTimeLanguages_code: z.string(),
  name: z.string(),
})

export const leisureTimeSchema = z.object({
  id: z.number(),
  name: z.string(),
  file: basicFileSchema,
  translations: z.array(snapshotTranslationSchema),
})

export const nestedLeisureTimeSchema = z.object({
  id: z.number(),
  leisureTimeMain_id: z.number(),
  leisureTime_id: leisureTimeSchema,
})

export const leisureTimeMainSchema = z.object({
  id: z.number(),
  mainImage: basicFileSchema,
  translations: z.array(translationSchema),
  leisureTime: z.array(nestedLeisureTimeSchema),
})

export const dataSchema = z.object({
  id: z.number(),
  translations: z.array(translationSchema),
  leisureTime: z.array(
    z.object({
      id: z.number(),
      leisureTimeMain_id: leisureTimeMainSchema,
      leisureTime_id: leisureTimeSchema,
    }),
  ),
  mainImage: basicFileSchema,
})

export const leisureTimesSchema = z.object(
  {
    data: dataSchema,
  },
)

export type LeisureTime = z.infer<typeof leisureTimesSchema>
