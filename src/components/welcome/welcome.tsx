import styles from './welcome.module.css';
import HeroSection from '../hero-section/heroSection';
import HowItWorks from '../how-works/howItWorks';
import SpecialThanks from '../special-thanks/specialThanks';

export default function welcome() {
    return (
        <section className={styles.welcomeSection}>
            <HeroSection />
            <HowItWorks />
            <SpecialThanks />
        </section>
    )
}

