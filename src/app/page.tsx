/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import styles from './page.module.css'
import Header from '../components/header/header'
import Card from '@/components/card/card'
import Welcome from '@/components/welcome/welcome'
export default function Home() {
  return (
    <>
      <main className={styles.main}>
        {/* <Card/> */}
        <Welcome />
      </main>
    </>
  )
}
