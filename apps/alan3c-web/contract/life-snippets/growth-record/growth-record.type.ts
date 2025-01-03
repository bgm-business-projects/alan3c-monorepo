import { z } from 'zod'
import { basicFileSchema } from '../../basic-schema'

const translationSchema = z.object({
  id: z.number(),
  growthRecordMain_id: z.number(),
  growthRecordMainLanguages_code: z.string(),
  name: z.string(),
})

const moreFileListSchema = z.object({
  id: z.number(),
  growthRecord_id: z.number(),
  directus_files_id: z.string(),
})

const growthRecordTranslationsSchema = z.object({
  id: z.number(),
  growthRecord_id: z.number(),
  growthRecordLanguages_code: z.string(),
  name: z.string(),
})

const growthRecordBasicSchema = z.object({
  growthRecord_id: z.object({
    id: z.number(),
    translations: z.array(growthRecordTranslationsSchema),
    file: basicFileSchema,
    moreFileList: z.array(moreFileListSchema).default([]),
  }),
})

export const growthRecordSchema = z.object({
  data: z.object({
    id: z.number(),
    key: z.string(),
    translations: z.array(translationSchema),
    mainImage: basicFileSchema,
  }),
})

export const growthRecordDeepSchema = z.object({
  data: z.object({
    id: z.number(),
    key: z.string(),
    translations: z.array(translationSchema),
    growthRecord: z.array(growthRecordBasicSchema),
    mainImage: basicFileSchema,
  }),
})

export const growthRecordMoreFileSchema = z.object({
  data: z.object({
    growthRecord: z.array(z.object({
      growthRecord_id: z.object({
        moreFileList: z.array(z.object({
          directus_files_id: basicFileSchema,
        })).default([]),
      }),
    })),
  }),
})

export type GrowthRecord = z.infer<typeof growthRecordSchema>
export const isGrowthRecord = (data: unknown): data is GrowthRecord => growthRecordSchema.safeParse(data).success

export type GrowthRecordDeep = z.infer<typeof growthRecordDeepSchema>
export const isGrowthRecordDeep = (data: unknown): data is GrowthRecordDeep => growthRecordDeepSchema.safeParse(data).success

export type GrowthRecordMoreFile = z.infer<typeof growthRecordMoreFileSchema>
export const isGrowthRecordMoreFile = (data: unknown): data is GrowthRecordMoreFile => growthRecordMoreFileSchema.safeParse(data).success
// export const translationSchema = z.object({
//   id: z.number(),
//   growthRecordMain_id: z.number(),
//   growthRecordMainLanguages_code: z.string(),
//   name: z.string(),
// })

// export const snapshotTranslationSchema = z.object({
//   id: z.number(),
//   growthRecord_id: z.number(),
//   growthRecordLanguages_code: z.string(),
//   name: z.string(),
// })

// export const growthRecordSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   file: basicFileSchema,
//   translations: z.array(snapshotTranslationSchema),
// })

// export const nestedGrowthRecordSchema = z.object({
//   id: z.number(),
//   growthRecordMain_id: z.number(),
//   growthRecord_id: growthRecordSchema,
// })

// export const growthRecordMainSchema = z.object({
//   id: z.number(),
//   mainImage: basicFileSchema,
//   translations: z.array(translationSchema),
//   growthRecord: z.array(nestedGrowthRecordSchema),
// })

// export const dataSchema = z.object({
//   id: z.number(),
//   translations: z.array(translationSchema),
//   growthRecord: z.array(
//     z.object({
//       id: z.number(),
//       growthRecordMain_id: growthRecordMainSchema,
//       growthRecord_id: growthRecordSchema,
//     }),
//   ),
//   mainImage: basicFileSchema,
// })

// export const growthRecordsSchema = z.object(
//   {
//     data: dataSchema,
//   },
// )

// export type GrowthRecord = z.infer<typeof growthRecordsSchema>
