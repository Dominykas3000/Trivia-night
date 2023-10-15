'use client';
import Card from '@/components/card/card';
import Question from '@/components/question/question';
import { useSearchParams } from 'next/navigation';

export default function Play() {
  const searchCategories = useSearchParams();
  const categoryName = searchCategories.get('category') || 'General Knowledge';
  const categoryId = searchCategories.get('categoryId') || '9';
  console.log(categoryName, categoryId);
  return (
    <>
      <Card>
        <Question categoryName={categoryName} categoryId={categoryId} />
      </Card>
    </>
  )
}
