import { useEffect, useState } from "react";
import CategoriesJson from '../../../public/categorySelection.json';
import ArrowLeft from '../../../public/arrowLeft.svg';
import ArrowRight from '../../../public/arrowRight.svg';
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
}

interface JsonCategory {
  value: string;
  name: string;
  link: string;
}

interface CategoriesJson {
  categories: JsonCategory[];
}

export default function Question(props: Category) {
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<(string)[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { categories } = CategoriesJson as CategoriesJson;

  function getTriviaLink() {
    const category = categories.find((category) => category.value === props.categoryId);
    const link = category?.link;
    return link;
  }

  async function getTriviaData() {
    setLoading(true);
    try {
      const link = await getTriviaLink();
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

  async function  handleAnswerSelect(answer: string) {
    await setSelectedAnswers([...selectedAnswers, answer]);
    console.log('selected answers: ', selectedAnswers);
  }

  function getCorrectAnswers(): string[] {
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
      alert("Correct!");
    } else {
      alert("Incorrect. Try again!");
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
      checkAnswer();
    }, 0);
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
                  handleAnswerSelect(answer);
                }}
              >
                {removeCharacters(answer)}
              </button>
            ))}
          </section>
        </div>
      </div><div className={style.navigationButtons}>
        <button
          className={`${style.backButton} ${style.navButton}`}
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft height={25} width={25} />
          <h4>Previous Question</h4>
        </button>
        <button
          className={`${style.nextQuestion} ${style.navButton}`}
          onClick={goToNextQuestion}
          disabled={currentQuestionIndex === triviaQuestions.length - 1}
        >
          <h4>Next Question</h4>
          <ArrowRight height={25} width={25} />
        </button>
      </div>
    </>
  );
}
