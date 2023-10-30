'use client';
import Card from '@/components/card/card';
import { useSearchParams } from 'next/navigation';
import ResultComponent from '@/components/result/result';

export default function Result() {
  const searchCategories = useSearchParams();
  const selectedAnswers = searchCategories.get('selectedAnswers') || [];
  const correctAnswers = searchCategories.get('correctAnswers') || [];
  const questionsCount = searchCategories.get('questionsCount') || 0;
  const categoryName = searchCategories.get('category') || '';
  const categoryId = searchCategories.get('categoryId') || '';
  const categoryLink = searchCategories.get('categoryLink') || '';

  let selectedAnswersArray = Array.isArray(selectedAnswers) ? selectedAnswers : JSON.parse(selectedAnswers);
  let correctAnswersArray = Array.isArray(correctAnswers) ? correctAnswers : JSON.parse(correctAnswers);

  return (
    <Card>
      <ResultComponent
        selectedAnswers={selectedAnswersArray}
        correctAnswers={correctAnswersArray}
        questionsCount={questionsCount.toString()}
        categoryLink={categoryLink}
        categoryName={categoryName}
        categoryId={categoryId}
      />
    </Card>
  )
}
