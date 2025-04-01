import { z } from 'zod'
import { basicFileSchema } from '../../basic-schema'

const translationSchema = z.object({
  id: z.number(),
  administrativeYearsMain_id: z.number(),
  administrativeYearsMainLanguages_code: z.string(),
  name: z.string(),
})

const moreFileListSchema = z.object({
  id: z.number(),
  administrativeYears_id: z.number(),
  directus_files_id: z.string(),
})

const administrativeYearsTranslationsSchema = z.object({
  id: z.number(),
  administrativeYears_id: z.number(),
  administrativeYearsLanguages_code: z.string(),
  name: z.string(),
})

const administrativeYearsBasicSchema = z.object({
  administrativeYears_id: z.object({
    id: z.number(),
    translations: z.array(administrativeYearsTranslationsSchema),
    file: basicFileSchema,
    moreFileList: z.array(moreFileListSchema).default([]),
  }),
})

export const administrativeYearsSchema = z.object({
  data: z.object({
    id: z.number(),
    key: z.string(),
    translations: z.array(translationSchema),
    mainImage: basicFileSchema,
  }),
})

export const administrativeYearsDeepSchema = z.object({
  data: z.object({
    id: z.number(),
    key: z.string(),
    translations: z.array(translationSchema),
    administrativeYears: z.array(administrativeYearsBasicSchema),
    mainImage: basicFileSchema,
  }),
})

export const administrativeYearsMoreFileSchema = z.object({
  key: z.literal('administrativeYears'),
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

export type AdministrativeYears = z.infer<typeof administrativeYearsSchema>
export const isAdministrativeYears = (data: unknown): data is AdministrativeYears => administrativeYearsSchema.safeParse(data).success

export type AdministrativeYearsDeep = z.infer<typeof administrativeYearsDeepSchema>
export const isAdministrativeYearsDeep = (data: unknown): data is AdministrativeYearsDeep => administrativeYearsDeepSchema.safeParse(data).success

export type AdministrativeYearsMoreFile = z.infer<typeof administrativeYearsMoreFileSchema>
export const isAdministrativeYearsMoreFile = (data: unknown): data is AdministrativeYearsMoreFile => administrativeYearsMoreFileSchema.safeParse(data).success

// export const translationSchema = z.object({
//   id: z.number(),
//   administrativeYearsMain_id: z.number(),
//   administrativeYearsMainLanguages_code: z.string(),
//   name: z.string(),
// })

// export const snapshotTranslationSchema = z.object({
//   id: z.number(),
//   administrativeYears_id: z.number(),
//   administrativeYearsLanguages_code: z.string(),
//   name: z.string(),
// })

// export const administrativeYearsSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   file: basicFileSchema,
//   translations: z.array(snapshotTranslationSchema),
// })

// export const nestedadministrativeYearsSchema = z.object({
//   id: z.number(),
//   administrativeYearsMain_id: z.number(),
//   administrativeYears_id: administrativeYearsSchema,
// })

// export const administrativeYearsMainSchema = z.object({
//   id: z.number(),
//   mainImage: basicFileSchema,
//   translations: z.array(translationSchema),
//   administrativeYears: z.array(nestedadministrativeYearsSchema),
// })

// export const dataSchema = z.object({
//   id: z.number(),
//   translations: z.array(translationSchema),
//   administrativeYears: z.array(
//     z.object({
//       id: z.number(),
//       administrativeYearsMain_id: administrativeYearsMainSchema,
//       administrativeYears_id: administrativeYearsSchema,
//     }),
//   ),
//   mainImage: basicFileSchema,
// })

// export const administrativeYearsListSchema = z.object(
//   {
//     data: dataSchema,
//   },
// )

// export type AdministrativeYears = z.infer<typeof administrativeYearsListSchema>
