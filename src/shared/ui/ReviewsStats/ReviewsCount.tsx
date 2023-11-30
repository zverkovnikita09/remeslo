
import { GoodEstimaions } from 'src/features/Reviews/ui/Reviews'
import style from './ReviewsCount.module.scss'
import { labelsCounterFormatter } from 'src/shared/lib/labelsCounterFormatter/labelsCounterFormatter'

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
            <div key={starCount} className={style.reviewsCount__group}>
                <span className={style.reviewsCount__starsTitle}>{labelsCounterFormatter(starCount, ['Звезда', 'Звезды', 'Звезд'])}</span>
                <div className={style.reviewsCount__groupBar}>
                    <div
                        className={style.reviewsCount__groupBarFilled}
                        style={{ width: `${widthPercentage}%` }}
                    ></div>
                </div>
                <span className={style.reviewsCount__starsCount}>{estimations}</span>
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