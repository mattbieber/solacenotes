'use client' // Error components must be Client Components

import React from 'react'

export function CenteredItem({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <div className="m-auto text-4xl text-center">{children}</div>
        </div>
    )
}
