import { z } from 'zod'

const TranslationSchema = z.object({
  id: z.number(),
  primeOfLifeMain_id: z.number(),
  primeOfLifeMainLanguages_code: z.string(),
  name: z.string(),
})

const MoreFileListSchema = z.object({
  id: z.number(),
  primeOfLife_id: z.number(),
  directus_files_id: z.string(),
})

const primeOfLifeTranslationsSchema = z.object({
  id: z.number(),
  primeOfLife_id: z.number(),
  primeOfLifeLanguages_code: z.string(),
  name: z.string(),
})

const primeOfLifeSchema = z.object({
  primeOfLife_id: z.object({
    translations: z.array(primeOfLifeTranslationsSchema),
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

export const primeOfLifesSchema = z.object({
  id: z.number(),
  key: z.string(),
  translations: z.array(TranslationSchema),
  primeOfLife: z.array(primeOfLifeSchema),
  mainImage: MainImageSchema,
})

export type PrimeOfLife = z.infer<typeof primeOfLifesSchema>

// import { z } from 'zod'
// import { basicFileSchema } from '../../basic-schema'

// export const translationSchema = z.object({
//   id: z.number(),
//   primeOfLifeMain_id: z.number(),
//   primeOfLifeMainLanguages_code: z.string(),
//   name: z.string(),
// })

// export const snapshotTranslationSchema = z.object({
//   id: z.number(),
//   primeOfLife_id: z.number(),
//   primeOfLifeLanguages_code: z.string(),
//   name: z.string(),
// })

// export const primeOfLifeSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   file: basicFileSchema,
//   translations: z.array(snapshotTranslationSchema),
// })

// export const nestedPrimeOfLifeSchema = z.object({
//   id: z.number(),
//   primeOfLifeMain_id: z.number(),
//   primeOfLife_id: primeOfLifeSchema,
// })

// export const primeOfLifeMainSchema = z.object({
//   id: z.number(),
//   mainImage: basicFileSchema,
//   translations: z.array(translationSchema),
//   primeOfLife: z.array(nestedPrimeOfLifeSchema),
// })

// export const dataSchema = z.object({
//   id: z.number(),
//   translations: z.array(translationSchema),
//   primeOfLife: z.array(
//     z.object({
//       id: z.number(),
//       primeOfLifeMain_id: primeOfLifeMainSchema,
//       primeOfLife_id: primeOfLifeSchema,
//     }),
//   ),
//   mainImage: basicFileSchema,
// })

// export const primeOfLifesSchema = z.object(
//   {
//     data: dataSchema,
//   },
// )

// export type PrimeOfLife = z.infer<typeof primeOfLifesSchema>
