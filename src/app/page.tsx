/* eslint-disable react/no-unescaped-entities */
import styles from './page.module.css'
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
