import { useEffect, useState } from "react";
import CategoriesJson from '../../../public/categorySelection.json';
import Link from "next/link";
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

interface CategoriesJSon {
  categories: JsonCategory[];
}

export default function Question(props: Category) {
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { categories } = CategoriesJson as CategoriesJSon;

  async function getTriviaLink() {
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
    } catch (error) {
      console.error('Error fetching trivia data:', error);
    } finally {
      setLoading(false);
    }
  }

  function shuffleAnswers(array: string[]) {
    const shuffleAnswers = [...array];

    for (let i = shuffleAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffleAnswers[i], shuffleAnswers[j]] = [shuffleAnswers[j], shuffleAnswers[i]];
    }
    setLoading(false);
    return shuffleAnswers;
  }

  function removeCharacters(text: string) {
    return text.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"").replace(/(&ldquo\;)/g, "\"").replace(/(&rdquo\;)/g, "\"").replace(/(&eacute\;)/g, "é").replace(/(&shy\;)/g, "").replace(/(&uuml;)/g, "ü");
  }

  function handleAnswerSelect(answer: string) {
    setSelectedAnswer(answer);
  }

  function checkAnswer() {
    const currentQuestion = triviaQuestions[0];
    if (selectedAnswer === null) {
      return;
    }
    if (selectedAnswer === currentQuestion.correct_answer) {
      alert("Correct!");
    } else {
      alert("Incorrect. Try again!");
    }
  }

  function getLoading() {
    if (loading === true) {
      return false;
    }
    return false;
  }

  useEffect(() => {
    getTriviaData();
  }, []);

  return (
    <>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
          triviaQuestions.map((triviaData, index) => (
          <>
          <h1 className={style.mainText}>Question #{index+1} of {props.categoryName}</h1>
      <hr className={style.sectionTab} />
          <div className={style.questionContainer} key={index}>

            <div>
              <h2 className={style.questionText}>{removeCharacters(triviaData.question)}</h2>
            </div>

            <section className={style.buttonContainer}>
              {triviaData.shuffledAnswers.map((answer: string, answerIndex: number) => (
                <button
                  key={answerIndex}
                  className={answer === selectedAnswer ? style.answerButtonClicked : style.answerButton}
                  onClick={() => handleAnswerSelect(answer)}>
                  {removeCharacters(answer)}
                </button>
              ))}
            </section>

            <div className={style.navigationButtons}>
              <Link href={'/categorySelection'}>
                <button className={`${style.backButton} ${style.navButton}`}>
                  <ArrowLeft height={25} width={25} />
                  <h4>Back to Main Menu</h4>
                </button>
              </Link>
              <button onClick={checkAnswer}
                className={`${style.nextQuestion} ${style.navButton}`}>
                <h4>Next Question</h4>
                <ArrowRight height={25} width={25} />
              </button>
            </div>

              </div>
    </>

        ))
      )}
    </>
  )
}
