import type { AppRoute } from '@ts-rest/core'
import { homeSchema } from './home.type'

// const teacherQuery = 'teachers.teachers_id.*.*'
// const carouselQuery = 'carousel.*.*.*'
// const aboutQuery = 'aboutImage.*'
// const newsQuery = 'news.articles_id.*.*'
// const coursesQuery = 'courses.courses_id.*.*,courses.courses_id.*.directus_files_id.*,courses.courses_id.teacher.mainImage.*'

const mainImage = 'mainImage.*'
const translations = 'translations.*'

export const getHome = {
  method: 'GET',
  path: `/items/home?fields=*,${mainImage},${translations}`,
  responses: {
    200: homeSchema,
  },
  // headers: z.object({
  //   pagination: z.string().optional(),
  // }),
  // query: z.object({
  //   take: z.string().transform(Number).optional(),
  //   skip: z.string().transform(Number).optional(),
  //   search: z.string().optional(),
  // }),
  summary: 'Get home page',

} satisfies AppRoute
