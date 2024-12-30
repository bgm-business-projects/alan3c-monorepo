import { z } from 'zod'
import { basicFileSchema } from '../../basic-schema'

export const translationSchema = z.object({
  id: z.number(),
  growthRecordMain_id: z.number(),
  growthRecordMainLanguages_code: z.string(),
  name: z.string(),
})

export const snapshotTranslationSchema = z.object({
  id: z.number(),
  growthRecord_id: z.number(),
  growthRecordLanguages_code: z.string(),
  name: z.string(),
})

export const growthRecordSchema = z.object({
  id: z.number(),
  name: z.string(),
  file: basicFileSchema,
  translations: z.array(snapshotTranslationSchema),
})

export const nestedGrowthRecordSchema = z.object({
  id: z.number(),
  growthRecordMain_id: z.number(),
  growthRecord_id: growthRecordSchema,
})

export const growthRecordMainSchema = z.object({
  id: z.number(),
  mainImage: basicFileSchema,
  translations: z.array(translationSchema),
  growthRecord: z.array(nestedGrowthRecordSchema),
})

export const dataSchema = z.object({
  id: z.number(),
  translations: z.array(translationSchema),
  growthRecord: z.array(
    z.object({
      id: z.number(),
      growthRecordMain_id: growthRecordMainSchema,
      growthRecord_id: growthRecordSchema,
    }),
  ),
  mainImage: basicFileSchema,
})

export const growthRecordsSchema = z.object(
  {
    data: dataSchema,
  },
)

export type GrowthRecord = z.infer<typeof growthRecordsSchema>
