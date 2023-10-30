import styles from './page.module.css'
import Welcome from '@/components/welcome/welcome'
export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Welcome />
      </main>
    </>
  )
}
