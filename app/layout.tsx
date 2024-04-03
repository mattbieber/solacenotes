import React from 'react'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from 'geist/font/sans'
import { NotesContextProvider } from '@/context/store'
import './globals.css'

export const metadata: Metadata = {
    title: 'Solace Notes',
    description: 'Simple note project.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={GeistSans.className}>
                    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                        <div className="absolute top-0 -z-10 h-full w-full bg-transparent">
                            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
                        </div>
                        <NotesContextProvider>{children}</NotesContextProvider>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}
