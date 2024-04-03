import React from 'react'
import { NavBar } from '@/components/notes'

export default function NotesLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}
