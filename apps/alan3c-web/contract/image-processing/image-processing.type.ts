import { z } from 'zod'
import { basicFileSchema } from '../basic-schema'

export const imageProcessingSchema = z.object({
  meta: z.object({
    filter_count: z.string(),
  }),
  data: z.array(z.object({
    id: z.number(),
    sort: z.number().nullable(),
    user_created: z.string(),
    date_created: z.string(),
    user_updated: z.string(),
    date_updated: z.string(),
    reportDate: z.string(),
    thesisTitle: z.string(),
    academicJournal: z.string(),
    paperAuthor: z.string(),
    reporter: z.string(),
    downloadCount: z.number(),
    file: basicFileSchema,
    video: basicFileSchema,
  })),
})

export const downloadCountAPIResponseSchema = z.object({
  success: z.boolean(), // 是否成功
  downloadFileId: z.string(), // 下載檔案 ID
  fileDetails: z.object({
    id: z.string(), // 檔案 ID
    filename: z.string(), // 檔案名稱
  }),
})

export type ImageProcessing = z.infer<typeof imageProcessingSchema>
export type DownloadCountAPIResponse = z.infer<typeof downloadCountAPIResponseSchema>

export interface ImageProcessingCreateInput {
  reportDate: string;
  thesisTitle: string;
  academicJournal: string;
  paperAuthor: string;
  reporter: string;
  video: File;
  file: File;
}
