import { z } from 'zod'
import { basicFileSchema } from '../../basic-schema'

const translationSchema = z.object({
  id: z.number(),
  academicLectureMain_id: z.number(),
  academicLectureMainLanguages_code: z.string(),
  name: z.string(),
})

const moreFileListSchema = z.object({
  id: z.number(),
  academicLecture_id: z.number(),
  directus_files_id: z.string(),
})

const academicLectureTranslationsSchema = z.object({
  id: z.number(),
  academicLecture_id: z.number(),
  academicLectureLanguages_code: z.string(),
  name: z.string(),
})

const academicLectureBasicSchema = z.object({
  academicLecture_id: z.object({
    id: z.number(),
    translations: z.array(academicLectureTranslationsSchema),
    file: basicFileSchema,
    moreFileList: z.array(moreFileListSchema).default([]),
  }),
})

export const academicLectureSchema = z.object({
  data: z.object({
    id: z.number(),
    key: z.string(),
    translations: z.array(translationSchema),
    mainImage: basicFileSchema,
  }),
})
export const academicLectureDeepSchema = z.object({
  data: z.object({
    id: z.number(),
    key: z.string(),
    translations: z.array(translationSchema),
    academicLecture: z.array(academicLectureBasicSchema),
    mainImage: basicFileSchema,
  }),
})

export const academicLectureMoreFileSchema = z.object({
  data: z.object({
    academicLecture: z.array(z.object({
      academicLecture_id: z.object({
        moreFileList: z.array(basicFileSchema),
      }),
    })),
  }),
})

export type AcademicLecture = z.infer<typeof academicLectureSchema>
export const isAcademicLecture = (data: unknown): data is AcademicLecture => academicLectureSchema.safeParse(data).success

export type AcademicLectureDeep = z.infer<typeof academicLectureDeepSchema>
export const isAcademicLectureDeep = (data: unknown): data is AcademicLectureDeep => academicLectureDeepSchema.safeParse(data).success

export type AcademicLectureMoreFile = z.infer<typeof academicLectureMoreFileSchema>

// export const translationSchema = z.object({
//   id: z.number(),
//   academicLectureMain_id: z.number(),
//   academicLectureMainLanguages_code: z.string(),
//   name: z.string(),
// })

// export const snapshotTranslationSchema = z.object({
//   id: z.number(),
//   academicLecture_id: z.number(),
//   academicLectureLanguages_code: z.string(),
//   name: z.string(),
// })

// export const academicLectureSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   file: basicFileSchema,
//   translations: z.array(snapshotTranslationSchema),
// })

// export const nestedAcademicLectureSchema = z.object({
//   id: z.number(),
//   academicLectureMain_id: z.number(),
//   academicLecture_id: academicLectureSchema,
// })

// export const academicLectureMainSchema = z.object({
//   id: z.number(),
//   mainImage: basicFileSchema,
//   translations: z.array(translationSchema),
//   academicLecture: z.array(nestedAcademicLectureSchema),
// })

// export const dataSchema = z.object({
//   id: z.number(),
//   translations: z.array(translationSchema),
//   academicLecture: z.array(
//     z.object({
//       id: z.number(),
//       academicLectureMain_id: academicLectureMainSchema,
//       academicLecture_id: academicLectureSchema,
//     }),
//   ),
//   mainImage: basicFileSchema,
// })

// export const academicLecturesSchema = z.object(
//   {
//     data: dataSchema,
//   },
// )

// export type AcademicLecture = z.infer<typeof academicLecturesSchema>
