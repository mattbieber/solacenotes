'use client'

import type { Note } from '@/data/models'
import React from 'react'
import Link from 'next/link'
import { Filter } from './filter'
import { TrashIcon } from '@/components/ui'
interface NoteListProps {
    deleteClickHandler: (slug: string) => void
    notes: Note[]
}

export const NoteList = ({ notes, deleteClickHandler }: NoteListProps) => {
    const [results, setResults] = React.useState<Note[] | undefined>()

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!e.target.value) {
            setResults(notes)
        } else {
            const { value: term } = e.target

            const filtered = notes.filter((note) => {
                return note.title.includes(term) || note.content.includes(term)
            })

            setResults(filtered)
        }
    }

    React.useEffect(() => {
        if (notes) setResults(notes)
    }, [notes])

    const renderList = (): React.ReactNode => {
        if (results && results.length > 0) {
            return results.map((note) => {
                return (
                    <li className="flex w-full" key={note.slug}>
                        <div
                            translate="no"
                            className=" w-2/5 py-2 pr-2 font-mono font-medium font-bold text-1xl leading-6 text-indigo-500 whitespace-nowrap hover:text-indigo-300"
                        >
                            <Link href={`/notes/edit/${note.slug}`}>
                                {note.title}
                            </Link>
                        </div>
                        <div
                            translate="no"
                            className="w-2/5 py-2 pl-2 font-mono text-sm leading-6 text-gray-600 whitespace-pre"
                        >
                            {note.updatedAt.toLocaleString()}
                        </div>
                        <div
                            translate="no"
                            className="w-1/5 py-2 pl-2 mr-6 font-mono text-sm text-right leading-6 text-gray-600 whitespace-pre"
                        >
                            <button
                                className="rounded transition duration-500 ease-in-out hover:ring-2 hover:ring-indigo-200"
                                onClick={(() => deleteClickHandler(note.slug))}
                                type="button"
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    </li>
                )
            })
        }
        return null
    }

    if (!results) return null
    return (
        <div className="flex flex-col space-y-20">
            <Filter onChange={handleSearchChange} />
            <ul className="w-full ml-0 text-left border-collapse">
                <li className="flex w-full">
                    <div className="sticky w-2/5 z-10 top-0 text-lg leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                        <div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">
                            Title
                        </div>
                    </div>
                    <div className="sticky w-2/5 z-10 top-0 text-lg leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                        <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                            Last Modified
                        </div>
                    </div>
                    <div className="sticky w-1/5 z-10 top-0 text-lg leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                        <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                            &nbsp;
                        </div>
                    </div>
                </li>

                {notes && renderList()}
            </ul>
        </div>
    )
}
