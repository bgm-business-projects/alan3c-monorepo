import { z } from 'zod'
import { basicFileSchema } from '../../basic-schema'

export const translationSchema = z.object({
  id: z.number(),
  teacherStudentSnapshotsMain_id: z.number(),
  teacherStudentSnapshotsMainLanguages_code: z.string(),
  name: z.string(),
})

export const snapshotTranslationSchema = z.object({
  id: z.number(),
  teacherStudentSnapshots_id: z.number(),
  teacherStudentSnapshotsLanguages_code: z.string(),
  name: z.string(),
})

export const teacherStudentSnapshotSchema = z.object({
  id: z.number(),
  name: z.string(),
  file: basicFileSchema,
  translations: z.array(snapshotTranslationSchema),
})

export const nestedTeacherStudentSnapshotsSchema = z.object({
  id: z.number(),
  teacherStudentSnapshotsMain_id: z.number(),
  teacherStudentSnapshots_id: teacherStudentSnapshotSchema,
})

export const teacherStudentSnapshotsMainSchema = z.object({
  id: z.number(),
  mainImage: basicFileSchema,
  translations: z.array(translationSchema),
  teacherStudentSnapshots: z.array(nestedTeacherStudentSnapshotsSchema),
})

export const dataSchema = z.object({
  id: z.number(),
  translations: z.array(translationSchema),
  teacherStudentSnapshots: z.array(
    z.object({
      id: z.number(),
      teacherStudentSnapshotsMain_id: teacherStudentSnapshotsMainSchema,
      teacherStudentSnapshots_id: teacherStudentSnapshotSchema,
    }),
  ),
  mainImage: basicFileSchema,
})

export const teacherStudentSnapshotsSchema = z.object(
  {
    data: dataSchema,
  },
)

export type TeacherStudentSnapshots = z.infer<typeof teacherStudentSnapshotsSchema>
