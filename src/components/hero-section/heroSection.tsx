/* eslint-disable react/no-unescaped-entities */
import HeroImage from '../../../public/mainPage.jpg'
import Image from 'next/image';
import style from './hero-section.module.css'
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className={style.heroSectionContainer}>
            <Image
                className={style.heroImage}
                src={HeroImage}
                alt="Hero Image"
                priority={true}
                width={1920}
                height={1080}
            />
            <div className={style.heroTextContainer}>
                <h1 className={style.heroText}>
                    Welcome to the Trivia Game!
                </h1>
                <h4 className={style.heroDescription}>
                    One of the unique aspects of trivia is its ability to impart knowledge in an enjoyable and non-formal way. It's a delightful method of learning something new, often introducing you to fascinating facts and anecdotes you might not have encountered otherwise
                </h4>
                <Link href={'/categorySelection'}>
                    <button className={style.startButton}>
                        Start Playing!
                    </button>
                </Link>
            </div>
        </section>
    );
}
