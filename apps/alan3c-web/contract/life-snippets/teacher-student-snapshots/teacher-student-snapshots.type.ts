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
  data: z.object({
    teacherStudentSnapshots: z.array(z.object({
      teacherStudentSnapshots_id: z.object({
        moreFileList: z.array(basicFileSchema),
      }),
    })),
  }),
})

export type TeacherStudentSnapshotsDeep = z.infer<typeof teacherStudentSnapshotsDeepSchema>
export type TeacherStudentSnapshots = z.infer<typeof teacherStudentSnapshotsSchema>

export const isTeacherStudentSnapshotsDeep = (data: unknown): data is TeacherStudentSnapshotsDeep => teacherStudentSnapshotsDeepSchema.safeParse(data).success
export const isTeacherStudentSnapshots = (data: unknown): data is TeacherStudentSnapshots => teacherStudentSnapshotsSchema.safeParse(data).success

export type TeacherStudentSnapshotsMoreFile = z.infer<typeof teacherStudentSnapshotsMoreFileSchema>
// import { z } from 'zod'
// import { basicFileSchema } from '../../basic-schema'

// export const translationSchema = z.object({
//   id: z.number(),
//   teacherStudentSnapshotsMain_id: z.number(),
//   teacherStudentSnapshotsMainLanguages_code: z.string(),
//   name: z.string(),
// })

// export const snapshotTranslationSchema = z.object({
//   id: z.number(),
//   teacherStudentSnapshots_id: z.number(),
//   teacherStudentSnapshotsLanguages_code: z.string(),
//   name: z.string(),
// })

// export const teacherStudentSnapshotSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   file: basicFileSchema,
//   translations: z.array(snapshotTranslationSchema),
// })

// export const nestedTeacherStudentSnapshotsSchema = z.object({
//   id: z.number(),
//   teacherStudentSnapshotsMain_id: z.number(),
//   teacherStudentSnapshots_id: teacherStudentSnapshotSchema,
// })

// export const teacherStudentSnapshotsMainSchema = z.object({
//   id: z.number(),
//   mainImage: basicFileSchema,
//   translations: z.array(translationSchema),
//   teacherStudentSnapshots: z.array(nestedTeacherStudentSnapshotsSchema),
// })

// export const dataSchema = z.object({
//   id: z.number(),
//   translations: z.array(translationSchema),
//   teacherStudentSnapshots: z.array(
//     z.object({
//       id: z.number(),
//       teacherStudentSnapshotsMain_id: teacherStudentSnapshotsMainSchema,
//       teacherStudentSnapshots_id: teacherStudentSnapshotSchema,
//     }),
//   ),
//   mainImage: basicFileSchema,
// })

// export const teacherStudentSnapshotsSchema = z.object(
//   {
//     data: dataSchema,
//   },
// )

// export type TeacherStudentSnapshots = z.infer<typeof teacherStudentSnapshotsSchema>
