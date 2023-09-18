import React from 'react'
import styles from './header.module.css'
export default function header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Trivia Night</h1>
        </header>
    )
}
