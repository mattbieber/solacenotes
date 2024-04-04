'use client'

import React from 'react'
import { UserButton } from '@clerk/nextjs'

import { HelpIcon } from '../ui/icons'

export const NavBar = () => {
    return (
        <nav className="bg-gray-800 text-gray-300">
            <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="text-3xl">✨</div>
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                            <svg
                                className="hidden h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="text-1xl space-x-12 text-indigo-500">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/mattbieber/solacenotes"
                                className="flex space-x-1 mt-12 mb-12 text-l  hover:text-indigo-300"
                            >
                                <HelpIcon />
                            </a>
                        </div>
                        {/* CLERK AUTH */}
                        <div className="relative ml-3">
                            <UserButton />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
