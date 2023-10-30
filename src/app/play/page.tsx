'use client';
import Card from '@/components/card/card';
import Question from '@/components/question/question';
import { useSearchParams } from 'next/navigation';

export default function Play() {
  const searchCategories = useSearchParams();
  const categoryName = searchCategories.get('category') || '';
  const categoryId = searchCategories.get('categoryId') || '';
  const categoryLink = searchCategories.get('categoryLink') || '';
  console.log("play "+ categoryLink);
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
