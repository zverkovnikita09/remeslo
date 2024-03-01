

import style from './ReviewsCount.module.scss'
import {GoodEstimaions} from "@features/Reviews/ui/Reviews";
import {labelsCounterFormatter} from "@shared/lib/labelsCounterFormatter";


interface ReviewsCountProps {
  starsAmount?: number
  stats?: GoodEstimaions[]
}

export const ReviewsCount = ({ starsAmount = 5, stats }: ReviewsCountProps) => {

  const renderStarCategory = (starCount: number) => {
    const reviewsCount = stats?.length ?? 0;
    const estimations = stats?.filter(({ estimation }) => estimation === starCount).length;
    const widthPercentage = estimations ? (estimations / reviewsCount) * 100 : 0;

    return (
      <div key={starCount} className={style.group}>
        <span className={style.starsTitle}>{labelsCounterFormatter(starCount, ['Звезда', 'Звезды', 'Звезд'])}</span>
        <div className={style.groupBar}>
          <div
            className={style.groupBarFilled}
            style={{ width: `${widthPercentage}%` }}
          ></div>
        </div>
        <span className={style.starsCount}>{estimations}</span>
      </div>
    );
  };

  const starCategories = Array.from(
    { length: starsAmount },
    (_, i) => renderStarCategory(starsAmount - i)
  );

  return (
    <div className={style.reviewsCount}>
      {starCategories}
    </div>
  )
}