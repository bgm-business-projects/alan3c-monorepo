import { z } from 'zod'

export const futureSpeechSchema = z.object({
  meta: z.object({
    filter_count: z.string(),
  }),
  data: z.array(
    z.object({
      id: z.number(),
      sort: z.number().nullable(), // sort 可以為 null
      lectureDate: z.number(), //
      translations: z.array(
        z.object({
          id: z.number(),
          academicLectureRecord_id: z.number(),
          academicLectureRecordLanguages_code: z.string(),
          name: z.string().nullable(), // name 可以為 null
          location: z.string().nullable(), // location 可以為 null
        }),
      ),
      showOnAcademicLectureRecord: z.boolean(),
    }),
  ),
})

export type FutureSpeech = z.infer<typeof futureSpeechSchema>
