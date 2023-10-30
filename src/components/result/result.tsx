import Link from 'next/link';
import style from './result.module.css'
import CategorySvg from '../../../public/category.svg';
import RestartSvg from '../../../public/restart.svg';
import MainMenuSvg from '../../../public/mainMenu.svg';

interface Answers {
  selectedAnswers: string[];
  correctAnswers: string[];
  questionsCount: string;
  categoryLink: string;
  categoryName: string;
  categoryId: string;
}

export default function Result(props: Answers) {
  const {
    selectedAnswers,
    correctAnswers,
    questionsCount,
    categoryLink,
    categoryName,
    categoryId
  } = props;
  const correct = countCorrect();
  const label = resultLabel();
  const emoji = resultEmoji();

  function countCorrect() {
    let correct = 0;
    let selectedAnswersArray = Array.isArray(selectedAnswers) ? selectedAnswers : JSON.parse(selectedAnswers);
    let correctAnswersArray = Array.isArray(correctAnswers) ? correctAnswers : JSON.parse(correctAnswers);

    for (let i = 0; i < selectedAnswersArray.length; i++) {
      if (selectedAnswersArray[i] === correctAnswersArray[i]) {
        correct++;
      }
    }
    return correct;
  }

  function resultLabel() {
    const count = parseInt(questionsCount, 10);
    if (correct / count * 100 >= 80) {
      return 'Excellent Job ! How Did you managed that?';
    } else if (correct / count * 100 >= 50) {
      return 'Good ! Not Bad ! However you can do better, and if you want to improve your score, you can try again!';
    } else {
      return 'Ugh that was though! You can do better, and if you want to improve your score, you can try again!';
    }
  }

  console.log(categoryLink)
  function resultEmoji() {
    const count = parseInt(questionsCount, 10);
    if (correct / count * 100 >= 80) {
      return '😮';
    } else if (correct / count * 100 >= 50) {
      return '✨';
    } else {
      return '🗑️';
    }
  }


  return (
    <div>
      <h1 className={style.resultTitle}>{label}</h1>
      <h2 className={style.resultLabel}>
        {emoji} Your current result: {correct + '/' + questionsCount} {emoji}
      </h2>
      <div className={style.buttonContainer}>

        <Link href={'/'}>
          <button className={style.resultButton}>
            <MainMenuSvg height={25} width={25} />
            Main Menu
          </button>
        </Link>

        <Link
          href={{
            pathname: '/play',
            query: {
              categoryId: categoryId,
              category: categoryName,
              categoryLink: categoryLink
            }
          }}>
          <button className={style.resultButton}>
            <RestartSvg height={25} width={25} />
            Try Again!
          </button>
        </Link>

        <Link href={'/categorySelection'}>
          <button className={style.resultButton}>
            <CategorySvg height={25} width={25} />
            Change Category
          </button>
        </Link>

      </div>
    </div>
  )
}
