import Link from 'next/link';
import style from './footer.module.css';
import LinkedIn from '../../../public/linkedin.svg';
import GitHub from '../../../public/github.svg';
export default function footer() {
  return (
    <footer className={style.footerContainer}>
      <div className={style.infoContainer}>

        <Link href={'/'}>
        <h1 className={style.title}>Trivia Night</h1>
        </Link>
          
        <div className={style.linkContainer}>
          <a className={style.link} target='_blank' href='https://opentdb.com'>Trivia DB</a>
          <a className={style.link} target='_blank' href='https://github.com/Dominykas3000/Trivia-night'>Projects GitHub</a>
          <Link className={style.link} href={'/categorySelection'}>
            Start Playing!
          </Link>
        </div>

        <div className={style.socialMediaContainer}>
          <a className={style.socialMediaLink} target='_blank'
            href='https://www.linkedin.com/in/dominykassvilpa/'>
            <LinkedIn height={24} width={24} />
          </a>
          <a className={style.socialMediaLink} target='_blank'
            href='https://github.com/Dominykas3000'>
            <GitHub height={24} width={24} />
            </a>
        </div>

      </div>
    </footer>
  )
}
