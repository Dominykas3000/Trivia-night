/* eslint-disable react/no-unescaped-entities */
import styles from './welcome.module.css';
import TriviaLogo from '../../../public/trivia.svg'
import Image from 'next/image'
import Link from 'next/link'
export default function welcome() {
    return (
        <section className={styles.welcomeSection}>
            <div className={styles.mainHeaderContainer}>
                <div className={styles.triviaDescContainer}>
                    <h1 className={styles.welcomeText}>Welcome to Trivia Night!</h1>
                    <h3>Here you will experience the joy of trivia!</h3>
                    {/* <TriviaLogo height={50} width={50} /> */}
                </div>
                <Link href={'/play'}>
                    <button className={styles.startButton}>
                        Start Playing!
                    </button>
                </Link>
            </div>
            <div className={styles.whyTriviaContainer}>
                <h2 className={styles.triviaDescHeader}>
                    Why Trivia Night?
                </h2>
                <p className={styles.triviaDesc}>
                    Trivia questions are essentially mini brain teasers. They challenge you to think quickly, recall facts, and sometimes make educated guesses. This mental exercise keeps your mind sharp and engaged.<br />

                    One of the unique aspects of trivia is its ability to impart knowledge in an enjoyable and non-formal way. It's a delightful method of learning something new, often introducing you to fascinating facts and anecdotes you might not have encountered otherwise.<br />

                    Beyond the mental stimulation, trivia is also a social activity. It brings people together over a common interest in a relaxed and entertaining setting. Whether you're gathered at a local pub with friends or participating in an online trivia night, it fosters connections and shared experiences.
                </p>
            </div>
        </section>
    )
}

