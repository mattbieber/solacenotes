import React from 'react'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-6xl mt-40 mb-16 font-black tracking-tight">
                ✨ Solace Notes ✨
            </h1>
            <SignUp />
        </div>
    )
}
