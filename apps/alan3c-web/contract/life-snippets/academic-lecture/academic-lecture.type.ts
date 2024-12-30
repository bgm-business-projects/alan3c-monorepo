import { z } from 'zod'
import { basicFileSchema } from '../../basic-schema'

export const translationSchema = z.object({
  id: z.number(),
  academicLectureMain_id: z.number(),
  academicLectureMainLanguages_code: z.string(),
  name: z.string(),
})

export const snapshotTranslationSchema = z.object({
  id: z.number(),
  academicLecture_id: z.number(),
  academicLectureLanguages_code: z.string(),
  name: z.string(),
})

export const academicLectureSchema = z.object({
  id: z.number(),
  name: z.string(),
  file: basicFileSchema,
  translations: z.array(snapshotTranslationSchema),
})

export const nestedAcademicLectureSchema = z.object({
  id: z.number(),
  academicLectureMain_id: z.number(),
  academicLecture_id: academicLectureSchema,
})

export const academicLectureMainSchema = z.object({
  id: z.number(),
  mainImage: basicFileSchema,
  translations: z.array(translationSchema),
  academicLecture: z.array(nestedAcademicLectureSchema),
})

export const dataSchema = z.object({
  id: z.number(),
  translations: z.array(translationSchema),
  academicLecture: z.array(
    z.object({
      id: z.number(),
      academicLectureMain_id: academicLectureMainSchema,
      academicLecture_id: academicLectureSchema,
    }),
  ),
  mainImage: basicFileSchema,
})

export const academicLecturesSchema = z.object(
  {
    data: dataSchema,
  },
)

export type AcademicLecture = z.infer<typeof academicLecturesSchema>
