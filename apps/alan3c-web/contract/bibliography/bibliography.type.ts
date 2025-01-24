import { z } from 'zod'

const basicSchema = z.object({
  id: z.number(),
  bibliography_id: z.number(),
  title: z.string(),
  content: z.string(),
})

export const bibliographySchema = z.object({
  data: z.object({
    id: z.number(),
    internationalJournalPapers: z.array(
      basicSchema.extend({
        internationalJournalPapersLanguages_code: z.string(),
      }),
      /** 當整合兩個 z.object 可以用 z.intersection，因為不直觀所以註解 */
      // z.intersection(
      //   basicSchema,
      //   z.object({
      //     internationalJournalPapersLanguages_code: z.string(),
      //   }),
      // ),
    ),
    internationalConferencePapers: z.array(
      basicSchema.extend({
        internationalConferencePapersLanguages_code: z.string(),
      }),
    ),
    bookChapters: z.array(
      basicSchema.extend({
        bookChaptersLanguages_code: z.string(),
      }),
    ),
    localJournalPapers: z.array(
      basicSchema.extend({
        localJournalPapersLanguages_code: z.string(),
      }),
    ),
    domesticMagazineArticles: z.array(
      basicSchema.extend({
        domesticMagazineArticlesLanguages_code: z.string(),
      }),
    ),
    technicalReports: z.array(
      basicSchema.extend({
        technicalReportsLanguages_code: z.string(),
      }),
    ),
    guestEditorial: z.array(
      basicSchema.extend({
        guestEditorialLanguages_code: z.string(),
      }),
    ),
    localConferencePapers: z.array(
      basicSchema.extend({
        localConferencePapersLanguages_code: z.string(),
      }),
    ),
  }),
})

export type BibliographyData = z.infer<typeof bibliographySchema>

const internationalJournalPapersSchema = bibliographySchema.shape.data.shape.internationalJournalPapers
export type InternationalJournalPapers = z.infer<typeof internationalJournalPapersSchema>
export const isInternationalJournalPapers = (data: unknown): data is InternationalJournalPapers => internationalJournalPapersSchema.safeParse(data).success

const internationalConferencePapersSchema = bibliographySchema.shape.data.shape.internationalConferencePapers
export type InternationalConferencePapers = z.infer<typeof internationalConferencePapersSchema>
export const isInternationalConferencePapers = (data: unknown): data is InternationalConferencePapers => internationalConferencePapersSchema.safeParse(data).success

const bookChaptersSchema = bibliographySchema.shape.data.shape.bookChapters
export type BookChapters = z.infer<typeof bookChaptersSchema>
export const isBookChapters = (data: unknown): data is BookChapters => bookChaptersSchema.safeParse(data).success

const localJournalPapersSchema = bibliographySchema.shape.data.shape.localJournalPapers
export type LocalJournalPapers = z.infer<typeof localJournalPapersSchema>
export const isLocalJournalPapers = (data: unknown): data is LocalJournalPapers => localJournalPapersSchema.safeParse(data).success

const domesticMagazineArticlesSchema = bibliographySchema.shape.data.shape.domesticMagazineArticles
export type DomesticMagazineArticles = z.infer<typeof domesticMagazineArticlesSchema>
export const isDomesticMagazineArticles = (data: unknown): data is DomesticMagazineArticles => domesticMagazineArticlesSchema.safeParse(data).success

const technicalReportsSchema = bibliographySchema.shape.data.shape.technicalReports
export type TechnicalReports = z.infer<typeof technicalReportsSchema>
export const isTechnicalReports = (data: unknown): data is TechnicalReports => technicalReportsSchema.safeParse(data).success

const guestEditorialSchema = bibliographySchema.shape.data.shape.guestEditorial
export type GuestEditorial = z.infer<typeof guestEditorialSchema>
export const isGuestEditorial = (data: unknown): data is GuestEditorial => guestEditorialSchema.safeParse(data).success

const localConferencePapersSchema = bibliographySchema.shape.data.shape.localConferencePapers
export type LocalConferencePapers = z.infer<typeof localConferencePapersSchema>
export const isLocalConferencePapers = (data: unknown): data is LocalConferencePapers => localConferencePapersSchema.safeParse(data).success
