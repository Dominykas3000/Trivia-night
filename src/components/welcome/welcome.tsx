import styles from './welcome.module.css';
import HeroSection from '../hero-section/heroSection';
import HowItWorks from '../how-works/howItWorks';

export default function welcome() {
    return (
        <section className={styles.welcomeSection}>
            <HeroSection />
            <HowItWorks />
        </section>
    )
}

