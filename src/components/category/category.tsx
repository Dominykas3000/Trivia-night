/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from 'react';
import CategoriesJson from '../../../public/categorySelection.json';
import style from './category.module.css';
import CategorySelectionCard from "../category-selection-card/categorySelectionCard";
import Card from "../card/card";

interface Category {
  value: string;
  name: string;
  link: string;
  image: string;
}

interface Categories {
  categories: Category[];
}

export default function Category() {
  const [categoryPassed, setCategoryPassed] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const { categories } = CategoriesJson as Categories;
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3.15,
      spacing: 15,
    },
    breakpoints: {
      '(max-width: 768px)': {
        vertical: true,
        mode: "free-snap",
        slides: {
          perView: 1,
          spacing: 0,
        },
      },
    },
  })

  function handleSelectCategory(categoryId: string, categoryName: string) {
    setCategoryPassed(categoryId);
    setCategoryName(categoryName);
  }

  return (
    <Card>
    <div className={style.mainCard}>
      <h1 className={style.mainText}>
        Select a category that you are interested in !
      </h1>
      <hr className={style.sectionTab} />

      <h2 className={style.categorySelectionLabel}>
        Categories to choose from:
      </h2>

      
      <div ref={ref} className={"keen-slider"}>
        {categories.map((category, index) => (
          <div key={index} className="keen-slider__slide" >
            <CategorySelectionCard
              categoryName={category.name}
              categoryId={category.value}
              categoryImage={category.image || ''}
              categoryLink={category.link}
            />
          </div>
        ))}
      </div>
      </div >
    </Card>  
  )
}
