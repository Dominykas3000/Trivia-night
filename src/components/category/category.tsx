/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import style from './category.module.css'
import CategoriesJson from './categorySelection.json'
import Triangle from '../../../public/triangle.svg'
import Link from 'next/link';

interface Category {
  value: string;
  name: string;
  link: string;
}

interface Categories {
  categories: Category[];
}

export default function Category() {

  const { categories } = CategoriesJson as Categories;

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
              key={category.value}>
              {category.name}
            </option>
          ))}

        </select>
        <div className={style.iconContainer} >
          <Triangle height={14} width={12} />
        </div>
      </div>
      <Link href={'/play'}>
        <button className={style.startButton}>
          Start Playing!
        </button>
      </Link>
    </section>
  )
}
