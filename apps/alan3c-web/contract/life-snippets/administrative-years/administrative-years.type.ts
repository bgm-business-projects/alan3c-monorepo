import { z } from 'zod'
import { basicFileSchema } from '../../basic-schema'

export const translationSchema = z.object({
  id: z.number(),
  administrativeYearsMain_id: z.number(),
  administrativeYearsMainLanguages_code: z.string(),
  name: z.string(),
})

export const snapshotTranslationSchema = z.object({
  id: z.number(),
  administrativeYears_id: z.number(),
  administrativeYearsLanguages_code: z.string(),
  name: z.string(),
})

export const administrativeYearsSchema = z.object({
  id: z.number(),
  name: z.string(),
  file: basicFileSchema,
  translations: z.array(snapshotTranslationSchema),
})

export const nestedadministrativeYearsSchema = z.object({
  id: z.number(),
  administrativeYearsMain_id: z.number(),
  administrativeYears_id: administrativeYearsSchema,
})

export const administrativeYearsMainSchema = z.object({
  id: z.number(),
  mainImage: basicFileSchema,
  translations: z.array(translationSchema),
  administrativeYears: z.array(nestedadministrativeYearsSchema),
})

export const dataSchema = z.object({
  id: z.number(),
  translations: z.array(translationSchema),
  administrativeYears: z.array(
    z.object({
      id: z.number(),
      administrativeYearsMain_id: administrativeYearsMainSchema,
      administrativeYears_id: administrativeYearsSchema,
    }),
  ),
  mainImage: basicFileSchema,
})

export const administrativeYearsListSchema = z.object(
  {
    data: dataSchema,
  },
)

export type AdministrativeYears = z.infer<typeof administrativeYearsListSchema>
