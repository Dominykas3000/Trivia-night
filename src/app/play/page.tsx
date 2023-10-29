'use client';
import Card from '@/components/card/card';
import Question from '@/components/question/question';
import { useSearchParams } from 'next/navigation';

export default function Play() {
  const searchCategories = useSearchParams();
  const categoryName = searchCategories.get('category') || 'General Knowledge';
  const categoryId = searchCategories.get('categoryId') || '9';
  const categoryLink = searchCategories.get('categoryLink') || 'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple';
  // console.log(categoryName, categoryId, categoryLink);
  return (
    <>
      <Card>
        <Question
          categoryName={categoryName}
          categoryId={categoryId}
          categoryLink={categoryLink}          
        />
      </Card>
    </>
  )
}
