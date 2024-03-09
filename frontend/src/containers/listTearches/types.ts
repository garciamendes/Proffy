import { z } from "zod"

export const filtersSchemas = z.object({
  valueByhours: z.string().optional(),
  matter: z.string().optional(),
  dayWeek: z.string().optional()
})

export type filtersSchemas = z.infer<typeof filtersSchemas>