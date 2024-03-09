import { z } from "zod"

export const formProfileSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  whatsapp: z.string().max(15),
  bio: z.string().max(300),
  valueByhours: z.string(),
  matter: z.string(),
  dayWeek: z.array(
    z.object({
      id: z.string().optional(),
      dayWeek: z.string(),
      from: z.any(),
      to: z.any(),
      isNew: z.boolean().optional().default(false),
    })
  )
})

export type profileSchema = z.infer<typeof formProfileSchema>