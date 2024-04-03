'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { CenteredItem, Spinner } from '@/components/ui'
import { fetchNotes } from './actions/fetch-notes-action'
import { deleteNote } from './actions/note-action'
import { NoteList } from '@/components/notes'
import type { Note } from '@/data/models'

export default function DashboardPage() {
    const [needNotes, setNeedNotes] = useState<boolean>(false)
    const [userNotes, setUserNotes] = useState<Note[]>([])
    const [working, setIsWorking] = useState(true)
    useEffect(() => {
        const getNotes = async () => {
            const result = await fetchNotes()

            if (result && result.notes) {
                setUserNotes(result.notes)
            }
            setNeedNotes(false)
            setIsWorking(false)
        }

        if (needNotes) {
            getNotes()
        }
    }, [needNotes])

    useEffect(() => setNeedNotes(true), [])

    const handleDeleteClick = (slug: string) => {
        const doDelete = async () => {
            void await deleteNote(slug)
            setNeedNotes(true)
            setIsWorking(true)
        }
        doDelete()
    }

    return (
        <div className="mx-auto max-w-4xl relative">
            <h1 className="mt-20 font-extrabold text text-5xl tracking-tighter  ">
                Solace Notes
            </h1>
            {needNotes && (
                <div className="-mt-50">
                    <Spinner />
                </div>
            )}
            {!needNotes && !working && (
                <>
                    <div className="relative h-2">
                        <div className="float-right mt-12 mr-18">
                            <Link
                                className="rounded px-5 py-2.5  text-white bg-gray-800 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all ease-out duration-300"
                                href="/notes/edit"
                            >
                                New Note
                            </Link>
                        </div>
                    </div>

                    {userNotes.length === 0 && (
                        <>
                            <CenteredItem>
                                <div className="flex items-center justify-center mt-40">
                                    <div className="m-auto mt-10 pb-14">
                                        Looks like you have no notes.
                                    </div>
                                </div>
                            </CenteredItem>
                        </>
                    )}

                    {userNotes.length > 0 && (
                        <div className="mt-40">
                            <NoteList
                                deleteClickHandler={handleDeleteClick}
                                notes={userNotes}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
