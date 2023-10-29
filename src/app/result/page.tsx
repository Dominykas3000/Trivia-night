'use client'
import Card from '@/components/card/card'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Result() {
  const searchCategories = useSearchParams();
  const selectedAnswers = searchCategories.get('selectedAnswers') || [];
  const correctAnswers = searchCategories.get('correctAnswers') || [];
  const questionsCount = searchCategories.get('questionsCount') || 0;
  
  function countCorrect() {
    let correct = 0;
    let selectedAnswersArray = Array.isArray(selectedAnswers) ? selectedAnswers : JSON.parse(selectedAnswers);
    let correctAnswersArray = Array.isArray(correctAnswers) ? correctAnswers : JSON.parse(correctAnswers);

    for (let i = 0; i < selectedAnswersArray.length; i++) {
      if (selectedAnswersArray[i] === correctAnswersArray[i]) {
        console.log(selectedAnswersArray[i], correctAnswersArray[i]);
        correct++;
      }
    }
    return correct ;
  }

  const correct = countCorrect();

  return (
    <Card>
      <div>
        <h1>Result</h1>
        {correct + "/" + questionsCount }
        <p>Selected Answers: {selectedAnswers}</p>
        <p>Correct Answers: {correctAnswers}</p>
      </div>
    </Card>
  )
}
