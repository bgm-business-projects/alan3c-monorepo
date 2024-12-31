import { z } from 'zod'

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

const TeacherStudentSnapshotsSchema = z.object({
  teacherStudentSnapshots_id: z.object({
    translations: z.array(TeacherStudentSnapshotsTranslationsSchema),
    moreFileList: z.array(MoreFileListSchema),
  }),
})

const MainImageSchema = z.object({
  id: z.string(),
  storage: z.string(),
  filename_disk: z.string(),
  filename_download: z.string(),
  title: z.string(),
  type: z.string(),
  folder: z.string(),
  uploaded_by: z.string(),
  created_on: z.string(),
  modified_by: z.string().nullable(),
  modified_on: z.string().nullable(),
  charset: z.string().nullable(),
  filesize: z.string(),
  width: z.number(),
  height: z.number(),
  duration: z.number().nullable(),
  embed: z.any().nullable(),
  description: z.string().nullable(),
  location: z.any().nullable(),
  tags: z.any().nullable(),
  metadata: z.record(z.any()).optional(),
  focal_point_x: z.number().nullable(),
  focal_point_y: z.number().nullable(),
  tus_id: z.any().nullable(),
  tus_data: z.any().nullable(),
  uploaded_on: z.string(),
})

export const teacherStudentSnapshotsSchema = z.object({
  id: z.number(),
  key: z.string(),
  translations: z.array(TranslationSchema),
  teacherStudentSnapshots: z.array(TeacherStudentSnapshotsSchema),
  mainImage: MainImageSchema,
})

export type TeacherStudentSnapshots = z.infer<typeof teacherStudentSnapshotsSchema>

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
