"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './card.module.css';

interface TriviaQuestion {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  shuffledAnswers: string[]; // New property for shuffled answers
}

export default function Card() {
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  async function getTriviaData() {
    setLoading(true);

    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=1&category=28');
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
    return text.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"").replace(/(&ldquo\;)/g, "\"").replace(/(&rdquo\;)/g, "\"").replace(/(&eacute\;)/g, "é").replace(/(&shy\;)/g, "")
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
    getTriviaData();
  }, []);

  return (
    <section className={style.mainHeaderContainer}>
      <h1 className={style.mainText}>Question #1</h1>
      <hr className={style.sectionTab} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        triviaQuestions.map((triviaData, index) => (
          <div key={index}>
            <div>
              <h2>{removeCharacters(triviaData.question)}</h2>
            </div>
            <section className={style.buttonContainer}>
              {triviaData.shuffledAnswers.map((answer: string, answerIndex: number) => (
                <button
                  key={answerIndex}
                  className={answer === selectedAnswer ? style.answerButtonClicked : style.answerButton}
                  onClick={() => handleAnswerSelect(answer)}
                >
                  {removeCharacters(answer)}
                </button>
              ))}
            </section>
            <button onClick={checkAnswer}>Check Answer</button>
          </div>
        ))
      )}
    </section>
  );
}
