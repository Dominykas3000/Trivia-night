"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from 'react';
import CategoriesJson from '../../../public/categorySelection.json';
import Card from "../card/card";
import CategorySelectionCard from "../category-selection-card/categorySelectionCard";
import style from './category.module.css';

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
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);
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

  useEffect(() => {
    if (categories) {
      setTimeout(() => {
        setLoading(false);
      }, 5);
    }
  });

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
        {loading ? (<h2 className={style.loading}>Loading..</h2>)
          :
          <>
            <div ref={ref} className={"keen-slider"}>
              {categories.map((category, index) => (
                <div key={index} className="keen-slider__slide" >
                  <CategorySelectionCard
                    categoryName={category.name}
                    categoryId={category.value}
                    categoryImage={category.image}
                    categoryLink={category.link}
                    questionCount={questionCount}
                  />
                </div>
              ))}
            </div>
            <h2 className={style.mainText}>
              Number of questions:
            </h2>
            <div className={style.radioContainer}>
              <label
                className={
                  questionCount == 5 ?
                    `${style.radioLabel} ${style.radioLabelClicked}`
                    : style.radioLabel
                }
                htmlFor="input-5"
                onClick={() => { setQuestionCount(5) }}
              >5</label>
              <input
                className={style.radioButton}
                type="radio"
                name="input-5" />

              <label
                className={
                  questionCount == 10 ?
                    `${style.radioLabel} ${style.radioLabelClicked}`
                    : style.radioLabel
                }
                htmlFor="input-10"
                onClick={() => { setQuestionCount(10) }}
              >10</label>
              <input
                className={style.radioButton}
                type="radio"
                name="input-10" />
            </div>

          </>
        }
      </div >
    </Card>
  )
}
