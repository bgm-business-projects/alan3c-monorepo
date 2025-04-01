import { z } from 'zod'
import { basicFileSchema } from '../../basic-schema'

const translationSchema = z.object({
  id: z.number(),
  leisureTimeMain_id: z.number(),
  leisureTimeMainLanguages_code: z.string(),
  name: z.string(),
})

const moreFileListSchema = z.object({
  id: z.number(),
  leisureTime_id: z.number(),
  directus_files_id: z.string(),
})

const leisureTimeTranslationsSchema = z.object({
  id: z.number(),
  leisureTime_id: z.number(),
  leisureTimeLanguages_code: z.string(),
  name: z.string(),
})

const leisureTimeBasicSchema = z.object({
  leisureTime_id: z.object({
    id: z.number(),
    translations: z.array(leisureTimeTranslationsSchema),
    file: basicFileSchema,
    moreFileList: z.array(moreFileListSchema).default([]),
  }),
})

export const leisureTimeSchema = z.object({
  data: z.object({
    id: z.number(),
    key: z.string(),
    translations: z.array(translationSchema),
    mainImage: basicFileSchema,
  }),
})

export const leisureTimeDeepSchema = z.object({
  data: z.object({
    id: z.number(),
    key: z.string(),
    translations: z.array(translationSchema),
    leisureTime: z.array(leisureTimeBasicSchema),
    mainImage: basicFileSchema,
  }),
})

export const leisureTimeMoreFileSchema = z.object({
  key: z.literal('leisureTime'),
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

export type LeisureTime = z.infer<typeof leisureTimeSchema>
export const isLeisureTime = (data: unknown): data is LeisureTime => leisureTimeSchema.safeParse(data).success

export type LeisureTimeDeep = z.infer<typeof leisureTimeDeepSchema>
export const isLeisureTimeDeep = (data: unknown): data is LeisureTimeDeep => leisureTimeDeepSchema.safeParse(data).success

export type LeisureTimeMoreFile = z.infer<typeof leisureTimeMoreFileSchema>
export const isLeisureTimeMoreFile = (data: unknown): data is LeisureTimeMoreFile => leisureTimeMoreFileSchema.safeParse(data).success
// export const translationSchema = z.object({
//   id: z.number(),
//   leisureTimeMain_id: z.number(),
//   leisureTimeMainLanguages_code: z.string(),
//   name: z.string(),
// })

// export const snapshotTranslationSchema = z.object({
//   id: z.number(),
//   leisureTime_id: z.number(),
//   leisureTimeLanguages_code: z.string(),
//   name: z.string(),
// })

// export const leisureTimeSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   file: basicFileSchema,
//   translations: z.array(snapshotTranslationSchema),
// })

// export const nestedLeisureTimeSchema = z.object({
//   id: z.number(),
//   leisureTimeMain_id: z.number(),
//   leisureTime_id: leisureTimeSchema,
// })

// export const leisureTimeMainSchema = z.object({
//   id: z.number(),
//   mainImage: basicFileSchema,
//   translations: z.array(translationSchema),
//   leisureTime: z.array(nestedLeisureTimeSchema),
// })

// export const dataSchema = z.object({
//   id: z.number(),
//   translations: z.array(translationSchema),
//   leisureTime: z.array(
//     z.object({
//       id: z.number(),
//       leisureTimeMain_id: leisureTimeMainSchema,
//       leisureTime_id: leisureTimeSchema,
//     }),
//   ),
//   mainImage: basicFileSchema,
// })

// export const leisureTimesSchema = z.object(
//   {
//     data: dataSchema,
//   },
// )

// export type LeisureTime = z.infer<typeof leisureTimesSchema>
