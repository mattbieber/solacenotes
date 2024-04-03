'use server'

import { clerkClient } from '@clerk/nextjs'
import { db } from '@/data'

export async function returnLocalUserId(clerkId: string): Promise<number> {
    
    let _id = -1

    try {
        const { privateMetadata } = await clerkClient.users.getUser(clerkId)

        if (
            'noteUser' in privateMetadata &&
            typeof privateMetadata['noteUser'] === 'number'
        ) {
            _id = privateMetadata['noteUser']
        } else {
            const user = await db.user.create({
                data: {
                    authId: clerkId,
                },
            })

            await clerkClient.users.updateUserMetadata(clerkId, {
                privateMetadata: {
                    noteUser: user.id,
                },
            })
            _id = user.id
        }
    } catch {
        throw new Error('Error returning Db user')
    }

    return _id
}