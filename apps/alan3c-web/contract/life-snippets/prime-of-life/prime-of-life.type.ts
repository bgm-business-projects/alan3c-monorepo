import { z } from 'zod'
import { basicFileSchema } from '../../basic-schema'

export const translationSchema = z.object({
  id: z.number(),
  primeOfLifeMain_id: z.number(),
  primeOfLifeMainLanguages_code: z.string(),
  name: z.string(),
})

export const snapshotTranslationSchema = z.object({
  id: z.number(),
  primeOfLife_id: z.number(),
  primeOfLifeLanguages_code: z.string(),
  name: z.string(),
})

export const primeOfLifeSchema = z.object({
  id: z.number(),
  name: z.string(),
  file: basicFileSchema,
  translations: z.array(snapshotTranslationSchema),
})

export const nestedPrimeOfLifeSchema = z.object({
  id: z.number(),
  primeOfLifeMain_id: z.number(),
  primeOfLife_id: primeOfLifeSchema,
})

export const primeOfLifeMainSchema = z.object({
  id: z.number(),
  mainImage: basicFileSchema,
  translations: z.array(translationSchema),
  primeOfLife: z.array(nestedPrimeOfLifeSchema),
})

export const dataSchema = z.object({
  id: z.number(),
  translations: z.array(translationSchema),
  primeOfLife: z.array(
    z.object({
      id: z.number(),
      primeOfLifeMain_id: primeOfLifeMainSchema,
      primeOfLife_id: primeOfLifeSchema,
    }),
  ),
  mainImage: basicFileSchema,
})

export const primeOfLifesSchema = z.object(
  {
    data: dataSchema,
  },
)

export type PrimeOfLife = z.infer<typeof primeOfLifesSchema>
