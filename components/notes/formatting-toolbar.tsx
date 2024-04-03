'use client'

import React from 'react'
import type { Editor } from '@tiptap/react'
import { ToolbarIcons } from '../ui/icons'

interface RichTextFormattingToolbarProps {
    editor: Editor | null
}

export function RichTextFormattingToolbar({
    editor,
}: RichTextFormattingToolbarProps) {
    // const [showColorPicker, setShowColorPicker] = useState(false)
    // const [color, setColor] = useState<string>('')

    if (!editor) {
        return null
    }

    // const colorPickerStyle = showColorPicker
    //     ? 'opacity-100 visible absolute w-48 mt-2 bg-white text-gray-800 border border-gray-300'
    //     : 'opacity-0 invisible absolute'

    return (
        <section className="border bg-background rounded-sm border-input p-2 flex space-x-4">
            {/* HEAD 1 */}
            <button
                className="ml-4"
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
            >
                <ToolbarIcons.Heading1
                    className="h-4 w-4"
                    on={editor.isActive('heading', { level: 1 })}
                />
            </button>

            {/* HEAD 2 */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
            >
                <ToolbarIcons.Heading2
                    className="h-4 w-4"
                    on={editor.isActive('heading', { level: 2 })}
                />
            </button>

            {/* HEAD 3 */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
            >
                <ToolbarIcons.Heading3
                    className="h-4 w-4"
                    on={editor.isActive('heading', { level: 3 })}
                />
            </button>

            {/* STRIKE */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <ToolbarIcons.StrikeIcon
                    className="h-4 w-4"
                    on={editor.isActive('strike')}
                />
            </button>

            {/* BOLD */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <ToolbarIcons.BoldIcon
                    className="h-4 w-4"
                    on={editor.isActive('bold')}
                />
            </button>

            {/* ITALIC */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <ToolbarIcons.ItalicIcon
                    className="h-4 w-4"
                    on={editor.isActive('italic')}
                />
            </button>

            {/* BULLET */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <ToolbarIcons.BulletListIcon
                    className="h-4 w-4"
                    on={editor.isActive('bulletList')}
                />
            </button>

            {/* LIST */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ToolbarIcons.NumberedListIcon
                    className="h-4 w-4"
                    on={editor.isActive('orderedList')}
                />
            </button>

            {/* QUOTE */}
            <button
                className="mt-1"
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <ToolbarIcons.BlockQuoteIcon
                    className="h-4 w-4"
                    on={editor.isActive('blockquote')}
                />
            </button>
        
            {/* <div className="relative group inline-block z-50">
                <div className={colorPickerStyle}>
                    {showColorPicker && <ColorPicker />}
                </div>
            </div> */}
        </section>
    )
}
