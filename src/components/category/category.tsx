/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import style from './category.module.css'
import CategoriesJson from '../../../public/categorySelection.json'
import Triangle from '../../../public/triangle.svg'
import Link from 'next/link';
import { useState } from 'react';

interface Category {
  value: string;
  name: string;
  link: string;
}

interface Categories {
  categories: Category[];
}

export default function Category() {
  const [categoryPassed, setCategoryPassed] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const { categories } = CategoriesJson as Categories;
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>('5');
  function handleSelectCategory(categoryId: string, categoryName: string) {
    setCategoryPassed(categoryId);
    setCategoryName(categoryName);
  }

  return (
    <section className={style.mainCard}>
      <h1 className={style.mainText}>
        Select a category that you are interested in !
      </h1>
      <hr className={style.sectionTab} />

      <h2 className={style.categorySelectionLabel}>
        Categories to choose from:
      </h2>
      <div className={style.categorySelectionContainer}>
        <select
          name="categorySelection"
          id="categorySelection"
          className={style.categorySelection}>

          {categories.map((category) => (
            <option
              className={style.categorySelectionOption}
              value={category.value}
              key={category.value}
              onClick={() => handleSelectCategory(category.value, category.name)}>
              {category.name}
            </option>
          ))}

        </select>

        <div className={style.iconContainer} >
          <Triangle height={14} width={12} />
        </div>

        <form>
          <h4 className={style.numberOfQuestionsLabel}>
            Number of questions:
          </h4>
          <label className={style.numberLabel}>
            <input
              type="radio"
              id="5"
              name="numberOfQuestions" />
            5
          </label>
        </form>

      </div>
      <Link
        href={{
          pathname: '/play',
          query: {
            categoryId: categoryPassed,
            category: categoryName,
          }
        }}>
        <button className={style.startButton}>
          Start Playing!
        </button>
      </Link>
    </section >
  )
}
