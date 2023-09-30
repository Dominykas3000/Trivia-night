"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './card.module.css';
import CategoriesJson from '../../../public/categorySelection.json';
import ArrowLeft from '../../../public/arrowLeft.svg';
import ArrowRight from '../../../public/arrowRight.svg';
import { get } from 'http';
import Link from 'next/link';


interface TriviaQuestion {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  shuffledAnswers: string[]; // New property for shuffled answers
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

export default function Card(props: Category) {
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { categories } = CategoriesJson as CategoriesJSon;

  function getTriviaLink() {
    const category = categories.find((category) => category.value === props.categoryId);
    const link = category?.link || '';
    getTriviaData(link);
  }


  async function getTriviaData(link: string) {
    setLoading(true);
    // 'https://opentdb.com/api.php?amount=1&category=28'
    try {
      const response = await axios.get(link);
      const triviaData = response.data.results[0];
      const shuffledAnswers = shuffleAnswers([...triviaData.incorrect_answers, triviaData.correct_answer]);
      setTriviaQuestions([{ ...triviaData, shuffledAnswers }]);
    }
    catch (error) {
      console.error('Error fetching trivia data:', error);
    }

    setLoading(false);
  }

  function shuffleAnswers(array: string[]) {
    const shuffleAnswers = [...array];

    for (let i = shuffleAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffleAnswers[i], shuffleAnswers[j]] = [shuffleAnswers[j], shuffleAnswers[i]];
    }
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

  useEffect(() => {
    getTriviaLink()
  }, []);

  return (
    <section className={style.mainHeaderContainer}>
      <h1 className={style.mainText}>Question #1 of {props.categoryName}</h1>
      <hr className={style.sectionTab} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        triviaQuestions.map((triviaData, index) => (
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
        ))
      )}
    </section>
  );
}
