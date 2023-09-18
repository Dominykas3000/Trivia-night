import React from 'react'
import style from './page.module.css'

export default function PlayLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={style.main}>
            {children}
        </main>
    )
}
