import React from 'react'
import styles from './header.module.css'
import Link from 'next/link';
export default function header() {
    return (
        <header className={styles.header}>
            <Link href={'/'}>
                <h1 className={styles.title}>Trivia Night</h1>
            </Link>
            <Link className={styles.playButtonLink} href={'/categorySelection'}>
                <button className={styles.playButton}>Play</button>
            </Link>
        </header>
    )
}
