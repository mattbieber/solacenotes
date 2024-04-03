'use client'

import React, { createContext, useContext, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { User, Note } from '@/data/models'

export const enum Currently {
    START = 'start',
    ON_DASHBOARD = 'on_dashboard',
    EDITING = 'editing',
}

interface NotesContextProps extends Pick<User, 'id'> {
    setId: Dispatch<SetStateAction<number>>
    currently: Currently
    setCurrently: Dispatch<SetStateAction<Currently>>
    currentNote: Note | undefined
    setCurrentNote: Dispatch<SetStateAction<Note | undefined>>
}

export const NotesContext = createContext<NotesContextProps>({
    id: -1,
    setId: (): number => -1,
    currently: Currently.START,
    setCurrently: (): Currently => Currently.START,
    currentNote: undefined,
    setCurrentNote: (): Note | undefined => undefined,
})

interface NotesContextProviderProps {
    children: React.ReactNode
}

export const NotesContextProvider = ({
    children,
}: NotesContextProviderProps) => {
    const [id, setId] = useState(-1)
    const [currently, setCurrently] = useState<Currently>(Currently.START)
    const [currentNote, setCurrentNote] = useState<Note | undefined>(undefined)
    return (
        <NotesContext.Provider
            value={{
                id,
                setId,
                currently,
                setCurrently,
                currentNote,
                setCurrentNote,
            }}
        >
            {children}
        </NotesContext.Provider>
    )
}

export const useNotesContext = () => useContext(NotesContext)
