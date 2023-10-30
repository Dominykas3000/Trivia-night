import Image from 'next/image';
import Link from 'next/link';
import style from './category-selection-card.module.css';

interface Category {
  categoryName: string;
  categoryId: string;
  categoryImage: string;
  categoryLink: string;
  questionCount: number;
}

export default function CategorySelectionCard(props: Category) {
  const {
    categoryName,
    categoryImage,
    categoryId,
    categoryLink,
    questionCount
  } = props;

  function getTriviaLink() {
    // console.log(categoryLink.replace("amount=1", "amount=" + questionCount))
    return categoryLink.replace("amount=1", "amount=" + questionCount);
  }

  console.log(getTriviaLink());

  return (
    <div className={style.categoryContainer}>
      <Image className={style.categoryImage}
        src={categoryImage}
        priority={true}
        alt="category"
        width={400}
        height={400}
      />
      <h3 className={style.categoryName}>{categoryName}</h3>
      <Link
        href={{
          pathname: '/play',
          query: {
            categoryId: categoryId,
            category: categoryName,
            categoryLink: getTriviaLink()
          }
        }}>
        <button className={style.startButton}>
          Start Playing!
        </button>
      </Link>
    </div>
  );
}
