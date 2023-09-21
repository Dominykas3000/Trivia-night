'use client';
import styles from './page.module.css';
import Card from '@/components/card/card';
import { useSearchParams } from 'next/navigation';
export default function Play() {
  const searchCategories = useSearchParams();
  const categoryName = searchCategories.get('category') || 'General Knowledge';
  const categoryId = searchCategories.get('categoryId') || '9';
  console.log(categoryName, categoryId);
    return (
        <>
            <Card categoryName={categoryName} categoryId={categoryId} />
        </>
    )
}
