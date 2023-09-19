import style from './category.module.css'
import CategoriesJson from './categorySelection.json'

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
      <div className={style.categorySelectionContainer}>
        <label
          htmlFor="categorySelection"
          className={style.categorySelectionLabel}
        >
          Categories to choose from:
        </label>
        <select
          name="categorySelection"
          id="categorySelection"
          className={style.categorySelection}
        >
          {categories.map((category) => (
            <option
              className={style.categorySelectionOption}
              value={category.value}
              key={category.value}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
