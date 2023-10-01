import style from './special-thanks.module.css'

export default function specialThanks() {
  return (
    <section className={style.specialThanksSection}>
      <h1 className={style.thanksHeader}>
        And special thanks to Open Trivia Database for providing the questions and answers and an awesome API!
      </h1>
      <h3 className={style.thanksSubHeader}>
        you can find more information about Trivia Database here: {' '}
        <a className={style.thanksLink} target='_blank' href='https://opentdb.com'>opentdb.com</a>
      </h3>
    </section>
  )
}
