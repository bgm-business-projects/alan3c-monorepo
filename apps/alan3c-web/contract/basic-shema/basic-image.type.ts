import { z } from 'zod'

export const basicImageSchema = z.object({
  id: z.string().uuid(),
  storage: z.string(),
  filename_disk: z.string(),
  filename_download: z.string(),
  title: z.string(),
  type: z.string(),
  folder: z.string().nullable(),
  uploaded_by: z.string().uuid(),
  uploaded_on: z.string().transform((val) => new Date(val)), // 轉換為 Date 物件
  modified_by: z.string().uuid().nullable(),
  modified_on: z.string().transform((val) => new Date(val)).nullable(), // 轉換為 Date 物件並允許 null
  charset: z.string().nullable(),
  filesize: z.union([z.string(), z.number()]), // filesize 可以是字串或數字
  width: z.number(),
  height: z.number(),
  duration: z.number().nullable(),
  embed: z.unknown().nullable(),
  description: z.string().nullable(),
  location: z.unknown().nullable(),
  tags: z.array(z.string()).nullable(),
  metadata: z.object({}).passthrough(),
  focal_point_x: z.number().nullable(),
  focal_point_y: z.number().nullable(),
  tus_id: z.string().nullable(),
  tus_data: z.unknown().nullable(),
})

export type BasicImage = z.infer<typeof basicImageSchema>
