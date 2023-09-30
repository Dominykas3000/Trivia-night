import style from './how-works.module.css';
import Step from '../how-works-step/stepHowItWorks'
export default function howItWorks() {
    return (
        <section className={style.howItWorksSection}>
            <div>
                <h1 className={style.howItWorksHeader}>
                    This is how you can start playing!
                </h1>
            </div>
            <div>
                <Step stepHeading={'Because you' + "'" + 're already here..'}
                    stepText={'because you are already here and probably enjoy trivia games or quirky questions in general, click play button where ever you see.'} />

                <Step stepHeading={'When you click play..'}
                    stepText={'you' + "'" + 've got taken to the next page. What now? Now you are free to choose one of 32 categories and choose the amount of questions you want to answer (5 or 10).'} />

                <Step isStepLast={true} stepHeading={'So now you are answering questions..'}
                    stepText={'Now you have to answer questions from your chosen topic. The questions are random in difficulty and and type of answers you can choose from. Just remember do your best ;)'} />
            </div>
        </section>
    )
}
