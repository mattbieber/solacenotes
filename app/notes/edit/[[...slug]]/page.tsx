'use client'

import React, { useState, useEffect } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
    Input,
} from '@/components/shadcn'
import { BackArrow } from '@/components/ui/icons'
import { CustomButton, Spinner } from '@/components/ui'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RichText } from '@/components/notes'
import type { ContentType } from '@/components/notes'
import { useNotesContext } from '@/context/store'
import type { Note } from '@/data/models'
import { NoteSchema } from '@/data/models'
import { saveNote, fetchNote } from '../../actions/note-action'
import type { FetchFailure } from '../../actions/note-action'
import { trueCharCount } from '@/lib/true-character-count'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { zodResolver } from '@hookform/resolvers/zod'

export default function Edit({ params }: { params: { slug: string } }) {
    const [isDirty, setIsDirty] = useState(true)
    const { currentNote, setCurrentNote, id } = useNotesContext()
    const [working, setIsWorking] = useState(false)

    
    const noteForm = useForm<Note>({
        defaultValues: {
            title: 'New Note',
            content: currentNote?.contentFormatted,
        },
        resolver: zodResolver(NoteSchema),
        mode: 'onChange',
    })
    const router  = useRouter()

    useEffect(() => {
        const { slug } = params

        if (!slug) {
            const newNote: Note = {
                createdAt: new Date(),
                updatedAt: new Date(),
                content: '',
                contentFormatted: '',

                slug: nanoid(),
                title: '',
                userId: id,
            }

            setCurrentNote(newNote)
        } else {
            const getExistingNote = async (slug: string) => {
                const fetchResult: Note | FetchFailure = await fetchNote(slug)

                const parseResult = NoteSchema.safeParse(fetchResult)
                if (parseResult.success) {
                    setCurrentNote(fetchResult as Note)
                    setIsDirty(false)
                }
            }

            void getExistingNote(slug[0])
        }
    }, [id, params, setCurrentNote])

    const handleContentChange = async (content: ContentType) => {
        if (currentNote) {
            currentNote.content = content.unformatted
            currentNote.contentFormatted = content.formatted
            currentNote.updatedAt = new Date()
        }

        const { clearErrors, setError } = noteForm
        const { errors } = noteForm.formState

        const hadErrors = Object.keys(errors).length > 0
        clearErrors()

        const count = trueCharCount(content.unformatted)

        if (count < 10 || count > 300) {
            setError('content', {
                type: 'custom',
                message: `Note content should be between 10 & 300 characters.  (Current count: ${count})`,
            })
            if (!hadErrors) setIsDirty(true)
        } else {
            if (hadErrors) setIsDirty(false)
        }
    }

    const handleTitleChange = async (title: string) => {
        if (currentNote) {
            currentNote.title = title
            currentNote.updatedAt = new Date()
        }
    }

    const parseAndSaveNote = () => {
        if (currentNote) {
            const doSave = async () => {
                const result = NoteSchema.safeParse(currentNote)
                console.log(currentNote)
                console.log(result)
                if (result.success) {
                    void (await saveNote(currentNote))
                    router.push('/notes')
                } else {
                    throw new Error('Error in zod validation    ')
                }
            }
            setIsWorking(true)
            doSave()
        }
    }

    return (
        <main className="mx-auto max-w-4xl relative mt-20">
            <h1 className="mt-20 font-extrabold text text-5xl tracking-tighter mb-10">
                Solace Notes
            </h1>
            <div className="w-14 mb-10">
                <Link className="opacity-100 hover:opacity-60" href="/notes">
                    <BackArrow />
                </Link>
            </div>
            {(!currentNote || working) && (
                <div className="-mt-50 relative">
                    <Spinner />
                </div>
            )}
            {currentNote && !working && (
                <Form {...noteForm}>
                    <form className="flex flex-col gap-8">
                        <FormField
                            control={noteForm.control}
                            name="title"
                            render={() => (
                                <FormItem>
                                    <FormLabel className="text-lg">
                                        Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            defaultValue={currentNote.title}
                                            onChange={(e) =>
                                                handleTitleChange(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            // control={noteForm.control}
                            name="content"
                            render={() => {
                                return (
                                    <FormItem>
                                        <FormLabel className="text-lg">
                                            Note
                                        </FormLabel>
                                        <FormControl>
                                            <RichText
                                                content={
                                                    currentNote?.contentFormatted
                                                }
                                                onChange={handleContentChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                    </form>
                    <div className="flex space-x-8">
                        <CustomButton
                            label="Save"
                            disabled={isDirty}
                            onClick={async () => await parseAndSaveNote()}
                        />
                    </div>
                </Form>
            )}
        </main>
    )
}
