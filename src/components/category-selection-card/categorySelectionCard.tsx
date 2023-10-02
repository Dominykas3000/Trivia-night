/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import style from './category-selection-card.module.css'
interface Category {
  categoryName: string;
  categoryId: string;
  categoryImage: string;
  categoryLink: string;
}

export default function CategorySelectionCard(props: Category) {
  const { categoryName, categoryImage, categoryId } = props;
  return (
    <div className={style.categoryContainer}>
      <img className={style.categoryImage} src={categoryImage} alt="" />
      <h3 className={style.categoryName}>{categoryName}</h3>
      <Link
        href={{
          pathname: '/play',
          query: {
            categoryId: categoryId ,
            category: categoryName,
          }
        }}>
        <button className={style.startButton}>
          Start Playing!
        </button>
      </Link>
    </div>
  );
}
