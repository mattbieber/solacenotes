import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import { GitHubIcon, LinkIcon } from '@/components/ui/icons'
export default function Home() {
    const { userId } = auth()
    if (userId) {
        redirect('/notes')
    }

    return (
        <>
            <Link href="" className="absolute top-4 right-12">
                <GitHubIcon />
            </Link>
            <main className="flex min-h-screen flex-col items-center p-4">
                <h1 className="text-6xl mt-40 mb-16 font-black tracking-tight">
                    ✨ Solace Notes ✨
                </h1>

                <Link
                    href="/sign-up"
                    className="rounded px-5 py-2.5 overflow-hidden group bg-gray-800 relative hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 text-white hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all ease-out duration-300"
                >
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    Get Started
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                </Link>
                <p className="mt-12">
                    Have an account?&nbsp;&nbsp;
                    <Link
                        className=" text-indigo-500 hover:text-indigo-300"
                        href="/sign-in"
                    >
                        Sign In
                    </Link>
                </p>
                <div className="flex mt-20 text-1xl space-x-12 text-indigo-500">
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/mattbieber/solace-notes"
                        className="flex space-x-1 mt-12 mb-12 text-l  hover:text-indigo-300"
                    >
                        <span>Visit the repo</span>
                        <span>
                            <LinkIcon />
                        </span>
                    </a>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href=""
                        className="flex space-x-1 mt-12 mb-12 text-l  hover:text-indigo-300"
                    >
                        <span>View the docs</span>
                        <span>
                            <LinkIcon />
                        </span>
                    </a>
                </div>
            </main>
        </>
    )
}
