import { z } from 'zod'

export const academicLectureRecordSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      sort: z.number().nullable(), // sort 可以為 null
      lectureDate: z.string(), // 日期作為字串處理
      translations: z.array(
        z.object({
          id: z.number(),
          academicLectureRecord_id: z.number(),
          academicLectureRecordLanguages_code: z.string(),
          name: z.string().nullable(), // name 可以為 null
          location: z.string().nullable(), // location 可以為 null
        }),
      ),
    }),
  ),
})

export type AcademicLectureRecord = z.infer<typeof academicLectureRecordSchema>
