'use client'

import React from 'react'
import { editorConfig } from '@/lib/editor-config'
import { RichTextFormattingToolbar } from './formatting-toolbar'
import { useEditor, EditorContent } from '@tiptap/react'

export type ContentType = {
    formatted: string
    unformatted: string
}

interface RichTextProps {
    content: string
    onChange: (content: ContentType) => void
}

export function RichText({ onChange, content }: RichTextProps) {
    const editor = useEditor({
        extensions: editorConfig,
        content: content,
        editorProps: {
            attributes: {
                class: 'rounded-sm px-3 py-2 min-h-[150px] border  bg-back ring-offset-2 focus-visible:ring-indigo-300 ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            },
        },
        onUpdate({ editor }) {
            onChange({
                unformatted: editor.getText(),
                formatted: editor.getHTML(),
            })
        },
    })

    return (
        <div className="my-32">
            <RichTextFormattingToolbar editor={editor} />
            <EditorContent className="my-4 bg-background" editor={editor} />
        </div>
    )
}
