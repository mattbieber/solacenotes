'use server'

import { auth } from '@clerk/nextjs'
import { returnLocalUserId } from './localId-action'
import type { Note } from '@/data/models'
import { db } from '@/data'

export async function fetchNotes(): Promise<{ notes: Note[] } | null> {
    const { userId } = auth()
    if (!userId) throw new Error(`Malformed Clerk Id: ${userId}`)
    const localUserId = await returnLocalUserId(userId)

    const notes = await db.user.findFirst({
        where: { id: localUserId },
        include: { notes: true },
    })

    if (notes) {
        return notes
    }

    return null
}
