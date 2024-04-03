import * as z from 'zod'

export const UserSchema = z.object({
  id: z.number().int(),
  authId: z.coerce.string(),
})

export type User = z.infer<typeof UserSchema>
