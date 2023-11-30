import { Rating } from 'src/features/Rating'
import style from './OverallRating.module.scss'
import { labelsCounterFormatter } from 'src/shared/lib/labelsCounterFormatter/labelsCounterFormatter'
import { GreyText } from '../GreyText/GreyText'


interface OverallRatingProps {
    overall_rating?: number
    marks?: number
}

export const OverallRating = ({marks, overall_rating }: OverallRatingProps) => {
    return (
        <div className={style.overallRating}>
            <div className={style.overallRating__ratingInfo}>
                <div className={style.overallRating__stars}>
                    <div className={style.overallRating__numericValue}>
                        {overall_rating}
                    </div>
                    <Rating overall_rating={overall_rating ?? 0} />
                </div>
                <GreyText className={style.overallRating__marks}>{marks ? labelsCounterFormatter(marks, ['оценка', 'оценки', 'оценок']) : 'нет оценок'}</GreyText>
            </div>

        </div>
    )
}