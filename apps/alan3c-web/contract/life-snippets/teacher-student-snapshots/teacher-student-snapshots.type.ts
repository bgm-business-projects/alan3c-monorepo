import { z } from 'zod'
import { basicFileSchema } from '~/contract/basic-schema'

const TranslationSchema = z.object({
  id: z.number(),
  teacherStudentSnapshotsMain_id: z.number(),
  teacherStudentSnapshotsMainLanguages_code: z.string(),
  name: z.string(),
})

const MoreFileListSchema = z.object({
  id: z.number(),
  teacherStudentSnapshots_id: z.number(),
  directus_files_id: z.string(),
})

const TeacherStudentSnapshotsTranslationsSchema = z.object({
  id: z.number(),
  teacherStudentSnapshots_id: z.number(),
  teacherStudentSnapshotsLanguages_code: z.string(),
  name: z.string(),
})

const teacherStudentSnapshotsBasicSchema = z.object({
  teacherStudentSnapshots_id: z.object({
    id: z.number(),
    translations: z.array(TeacherStudentSnapshotsTranslationsSchema),
    file: basicFileSchema,
    moreFileList: z.array(MoreFileListSchema).default([]),
  }),
})

export const teacherStudentSnapshotsDeepSchema = z.object({
  data: z.object(
    {
      id: z.number(),
      key: z.string(),
      translations: z.array(TranslationSchema),
      teacherStudentSnapshots: z.array(teacherStudentSnapshotsBasicSchema),
      mainImage: basicFileSchema,
    },
  ),
})

export const teacherStudentSnapshotsSchema = z.object({
  data: z.object(
    {
      id: z.number(),
      key: z.string(),
      translations: z.array(TranslationSchema),
      mainImage: basicFileSchema,
    },
  ),
})

export const teacherStudentSnapshotsMoreFileSchema = z.object({
  key: z.literal('teacherStudentSnapshots'),
  result: z.object({
    data: z.array(z.object({
      id: z.number(),
      file: z.string(),
      name: z.string(),
      moreFileList: z.array(z.object({
        directus_files_id: basicFileSchema,
      })),
      translations: z.array(z.number()),
    })),
  }),
})

export type TeacherStudentSnapshots = z.infer<typeof teacherStudentSnapshotsSchema>
export const isTeacherStudentSnapshots = (data: unknown): data is TeacherStudentSnapshots => teacherStudentSnapshotsSchema.safeParse(data).success

export type TeacherStudentSnapshotsDeep = z.infer<typeof teacherStudentSnapshotsDeepSchema>
export const isTeacherStudentSnapshotsDeep = (data: unknown): data is TeacherStudentSnapshotsDeep => teacherStudentSnapshotsDeepSchema.safeParse(data).success

export type TeacherStudentSnapshotsMoreFile = z.infer<typeof teacherStudentSnapshotsMoreFileSchema>
export const isTeacherStudentSnapshotsMoreFile = (data: unknown): data is TeacherStudentSnapshotsMoreFile => teacherStudentSnapshotsMoreFileSchema.safeParse(data).success

// export function isTeacherStudentSnapshotsMoreFile(data: unknown): data is TeacherStudentSnapshotsMoreFile {
//   const result = teacherStudentSnapshotsMoreFileSchema.safeParse(data)
//   if (result.success === true) {
//     return true
//   }
//   console.log('isTeacherStudentSnapshotsMoreFile 格式驗證錯誤', result.error)
//   return false
// }
