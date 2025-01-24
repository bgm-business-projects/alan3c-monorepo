import type { AppRoute } from '@ts-rest/core'
import { z } from 'zod'
import { bibliographySchema } from './bibliography.type'

export const getBibliography = {
  method: 'GET',
  path: `/items/bibliography`,
  query: z.object({
    fields: z.string().default('*,internationalJournalPapers.*,internationalConferencePapers.*,bookChapters.*,localJournalPapers.*,domesticMagazineArticles.*,technicalReports.*,guestEditorial.*,localConferencePapers.*'),
  }),
  responses: {
    200: bibliographySchema,
  },

} satisfies AppRoute
