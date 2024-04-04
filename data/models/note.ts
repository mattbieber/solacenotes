import * as z from 'zod'

export const NoteSchema = z.object({
    id: z.number().int().optional(),
    slug: z.string(),
    userId: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    title: z
        .string({
            description: 'note title',
        })
        .trim(),

    content: z.coerce.string().trim().min(10).max(300),
    contentFormatted: z.coerce.string(),
})

export type Note = z.infer<typeof NoteSchema>
