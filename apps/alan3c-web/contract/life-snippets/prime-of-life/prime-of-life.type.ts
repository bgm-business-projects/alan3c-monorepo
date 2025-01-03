import { z } from 'zod'
import { basicFileSchema } from '~/contract/basic-schema'

const translationSchema = z.object({
  id: z.number(),
  primeOfLifeMain_id: z.number(),
  primeOfLifeMainLanguages_code: z.string(),
  name: z.string(),
})

const moreFileListSchema = z.object({
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

const primeOfLifeBasicSchema = z.object({
  primeOfLife_id: z.object({
    id: z.number(),
    translations: z.array(primeOfLifeTranslationsSchema),
    file: basicFileSchema,
    moreFileList: z.array(moreFileListSchema).default([]),
  }),
})

export const primeOfLifeSchema = z.object({
  data: z.object({
    id: z.number(),
    key: z.string(),
    translations: z.array(translationSchema),
    mainImage: basicFileSchema,
  }),
})

export const primeOfLifeDeepSchema = z.object({
  data: z.object({
    id: z.number(),
    key: z.string(),
    translations: z.array(translationSchema),
    primeOfLife: z.array(primeOfLifeBasicSchema),
    mainImage: basicFileSchema,
  }),
})

export const primeOfLifeMoreFileSchema = z.object({
  data: z.object({
    primeOfLifeDeep: z.array(z.object({
      primeOfLifeDeep_id: z.object({
        moreFileList: z.array(z.object({
          directus_files_id: basicFileSchema,
        })).default([]),
      }),
    })),
  }),
})

export type PrimeOfLife = z.infer<typeof primeOfLifeSchema>
export const isPrimeOfLife = (data: unknown): data is PrimeOfLife => primeOfLifeSchema.safeParse(data).success

export type PrimeOfLifeDeep = z.infer<typeof primeOfLifeDeepSchema>
export const isPrimeOfLifeDeep = (data: unknown): data is PrimeOfLifeDeep => primeOfLifeDeepSchema.safeParse(data).success

export type PrimeOfLifeMoreFile = z.infer<typeof primeOfLifeMoreFileSchema>
export const isPrimeOfLifeMoreFile = (data: unknown): data is PrimeOfLifeMoreFile => primeOfLifeMoreFileSchema.safeParse(data).success
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
