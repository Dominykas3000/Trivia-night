import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowEnd from '../../../public/arrowContinue.svg';
import ArrowLeft from '../../../public/arrowLeft.svg';
import ArrowRight from '../../../public/arrowRight.svg';
import GoBackArrow from '../../../public/goBack.svg';
import style from './question.module.css';

interface TriviaQuestion {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  shuffledAnswers: string[];
}

interface Category {
  categoryName: string;
  categoryId: string;
  categoryLink: string;
}

export default function Question(props: Category) {
  const { categoryName, categoryId, categoryLink } = props;

  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<(string)[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  async function getTriviaData() {
    setLoading(true);
    try {
      const link = await categoryLink;
      if (!link) {
        throw new Error('Trivia link is undefined');
      }

      console.log(link);
      const response = await fetch(link);
      const data = await response.json();

      if (data.results.length === 0) {
        throw new Error('No trivia questions available for this category.');
      }

      const shuffledQuestions = data.results.map((triviaData: TriviaQuestion) => {
        const shuffledAnswers = shuffleAnswers([...triviaData.incorrect_answers, triviaData.correct_answer]);
        return { ...triviaData, shuffledAnswers };
      });

      setTriviaQuestions(shuffledQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trivia data:', error);
    }
  }

  function shuffleAnswers(array: string[]) {
    const shuffledAnswers = [...array];

    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    return shuffledAnswers;
  }

  function removeCharacters(text: string) {
    return text.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"").replace(/(&ldquo\;)/g, "\"").replace(/(&rdquo\;)/g, "\"").replace(/(&eacute\;)/g, "é").replace(/(&shy\;)/g, "").replace(/(&uuml;)/g, "ü");
  }

  function getCorrectAnswers() {
    const correctAnswers = triviaQuestions.map((triviaQuestion) => triviaQuestion.correct_answer);
    console.log(correctAnswers)
    return correctAnswers;
  }

  function checkAnswer() {
    const correctAnswers = getCorrectAnswers();
    const currentQuestion = triviaQuestions[currentQuestionIndex];

    if (selectedAnswers[0] === null) {
      return;
    }
    if (selectedAnswers[0] === currentQuestion.correct_answer) {
      console.warn("Correct!");
    } else {
      console.warn("Incorrect. Try again!");
    }
  }

  function goToNextQuestion() {
    if (currentQuestionIndex < triviaQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      getCorrectAnswers();
    }, 10);
  }, [selectedAnswers]);

  useEffect(() => {
    getTriviaData();
  }, [props.categoryId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const currentQuestion = triviaQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return <p>Loading...</p>;
  }

  function handleAnswerSelect(answer: string, currentQuestionIndex: number) {
    console.log('answer: ', answer);
    console.log('currentQuestionIndex: ', currentQuestionIndex);

    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    if (currentQuestionIndex >= updatedAnswers.length) {
      updatedAnswers.push(answer);
    }
    setSelectedAnswers(updatedAnswers);
    console.log('selected answers: ', updatedAnswers);
  }

  return (
    <>
      <div className={style.questionContainer}>
        <h1 className={style.mainText}>Question #{currentQuestionIndex + 1} of {props.categoryName}</h1>
        <hr className={style.sectionTab} />
        <div className={style.questionContainer}>
          <div>
            <h2 className={style.questionText}>{removeCharacters(currentQuestion.question)}</h2>
          </div>
          <section className={style.buttonContainer}>
            {currentQuestion.shuffledAnswers.map((answer: string, answerIndex: number) => (
              <button
                key={answerIndex}
                className={answer === selectedAnswers[currentQuestionIndex]
                  ? style.answerButtonClicked : style.answerButton}
                onClick={() => {
                  handleAnswerSelect(answer, currentQuestionIndex);
                }}
              >
                {removeCharacters(answer)}
              </button>
            ))}
          </section>
        </div>
      </div>
      <div className={style.navigationButtons}>
        {
          currentQuestionIndex == 0 ? 
            <Link href="/categorySelection">
              <button className={`${style.reverseButton} ${style.navButton}`}>
                <GoBackArrow height={25} width={25} />
                <h4>Back</h4>
              </button>  
            </Link>
          : 
            <button
              className={`${style.backButton} ${style.navButton}`}
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft height={25} width={25} />
              <h4>Previous Question</h4>
            </button>
        }
        {
          currentQuestionIndex == 4 ?
            <button
              className={`${style.nextStep} ${style.navButton}`}
            >
              <h4>Finish</h4>
              <ArrowEnd height={25} width={25} />
            </button>
          :
            <button
              className={`${style.nextQuestion} ${style.navButton}`}
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === triviaQuestions.length - 1}
            >
              <h4>Next Question</h4>
              <ArrowRight height={25} width={25} />
            </button>
        }
      </div>
    </>
  );
}
