import style from './step-how-it-works.module.css';
import QuestionMark from '../../../public/questionMark.svg';

interface StepText {
  stepHeading: string;
  stepText: string;
  isStepLast?: boolean;
}

export default function stepHowItWorks(props: StepText) {
  return (
    <div className={style.stepContainer}>
      {!props.isStepLast ?
        <div className={style.progressBarWrapper}>
          <div className={style.progressBar}></div>
        </div> : ''
      }
      <QuestionMark height={48} width={48} />
      <div className={style.textContainer}>
        <h2>{props.stepHeading}</h2>
        <h4>{props.stepText}</h4>
      </div>
    </div>
  )
}
