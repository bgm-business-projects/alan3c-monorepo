import { z } from 'zod'
import { academicGroupSchema } from './academic-group/academic-group.type'
import { committeeMemberSchema } from './committee-member/committee-member.type'
import { conferenceAttendeeSchema } from './conference-attendee/conference-attendee.type'
import { consultantRoleSchema } from './consultant-role/consultant-role.type'
import { journalEditorSchema } from './journal-editor/journal-editor.type'
import { paperReviewerSchema } from './paper-reviewer/paper-reviewer.type'
import { societyDirectorSchema } from './society-director/society-director.type'

const translationSchema = z.object({
  id: z.number(), // translation 的 ID
  academicActivities_id: z.number(), // 所屬 resume 的 ID
  academicActivitiesLanguages_code: z.string(), // 語言代碼
  name: z.string().nullable(), // 名稱，可以為 null
  content: z.string().nullable(), // 內容，可以為 null
})

export const academicActivitiesSchema = z.object({
  data: z.object({
    id: z.number(), // resume 的 ID
    translations: z.array(translationSchema), // translation 的陣列
  }),
})

export type AcademicActivities = z.infer<typeof academicActivitiesSchema>
export const isAcademicActivities = (data: unknown): data is AcademicActivities => academicActivitiesSchema.safeParse(data).success

export const academicActivitiesDataSchema = z.object({
  journalEditor: journalEditorSchema,
  paperReviewer: paperReviewerSchema,
  committeeMember: committeeMemberSchema,
  societyDirector: societyDirectorSchema,
  consultantRole: consultantRoleSchema,
  academicGroup: academicGroupSchema,
  conferenceAttendee: conferenceAttendeeSchema,
})
export type AcademicActivitiesData = z.infer<typeof academicActivitiesDataSchema>
export const isAcademicActivitiesData = (data: unknown): data is AcademicActivitiesData => academicActivitiesDataSchema.safeParse(data).success

// export function isAcademicActivitiesData(data: unknown): data is AcademicActivitiesData {
//   console.log(academicActivitiesDataSchema.parse(data).conferenceAttendee.data)
//   return academicActivitiesDataSchema.safeParse(data).success
// }
