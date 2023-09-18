"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './card.module.css';

interface TriviaQuestion {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function Card() {
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getTriviaData() {
    setLoading(true);

    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
      setTriviaQuestions(response.data.results);
    } catch (error) {
      console.error('Error fetching trivia data:', error);
    }

    setLoading(false);
  }

  useEffect(() => {
    getTriviaData();
  }, []);

  function removeCharacters(text: string) {
    return text.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
  }

  return (
    <section className={style.mainHeaderContainer}>
      <h1>Welcome to Trivia Night!</h1>
      <h3>Here you will experience the joy of trivia!</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        triviaQuestions.map((triviaData, index) => (
          <div key={index}>
            <div>{removeCharacters(triviaData.question)}</div>
            <ul>
              {triviaData.incorrect_answers.map((answer, answerIndex) => (
                <li key={answerIndex}>{removeCharacters(answer)}</li>
              ))}
              <li>{removeCharacters(triviaData.correct_answer)}</li>
            </ul>
          </div>
        ))
      )}
    </section>
  );
}
