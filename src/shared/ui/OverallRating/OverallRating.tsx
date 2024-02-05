import style from './OverallRating.module.scss'
import cn from 'classnames'
import { labelsCounterFormatter } from '@shared/lib/labelsCounterFormatter'
import { Rating } from '../Rating'

interface OverallRatingProps {
  overall_rating?: number
  marks?: number
}

export const OverallRating = ({ marks, overall_rating }: OverallRatingProps) => {
  return (
    <div className={style.overallRating}>
      <div className={style.overallRating__ratingInfo}>
        <div className={style.overallRating__stars}>
          <div className={style.overallRating__numericValue}>
            {overall_rating}
          </div>
          <Rating overall_rating={overall_rating ?? 0} />
        </div>
        <p className={cn(style.overallRating__marks, 'greyText')}>
          {marks ? labelsCounterFormatter(marks, ['оценка', 'оценки', 'оценок']) : 'нет оценок'}
        </p>
      </div>

    </div>
  )
}