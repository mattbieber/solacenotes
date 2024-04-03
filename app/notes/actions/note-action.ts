'use server'

import { auth } from '@clerk/nextjs'
import { returnLocalUserId } from './localId-action'
import { Note } from '@/data/models'
import { db } from '@/data'

type SaveDeleteResult = 'success' | 'failure'
export type FetchFailure = Omit<SaveDeleteResult, 'success'>

export async function saveNote(note: Note): Promise<SaveDeleteResult> {
    if (note.userId === -1) {
        const { userId } = auth()
        if (!userId) throw new Error(`Malformed Clerk Id: ${userId}`)
        const localUserId = await returnLocalUserId(userId)
        note.userId = localUserId
    }

    try {
        void await db.note.upsert({
            where: { slug: note.slug },
            update: note,
            create: note,
        })
    } catch (err) {
        console.error(err)
    }
    return 'success'
}

export async function fetchNote(slug: string): Promise<Note | FetchFailure> {
    const result = await db.note.findFirst({
        where: { slug },
    })

    return result ? result : 'failure'
}

export async function deleteNote(slug: string): Promise<SaveDeleteResult> {
    void await db.note.delete({
        where: { slug },
    })
    return 'failure'
}
