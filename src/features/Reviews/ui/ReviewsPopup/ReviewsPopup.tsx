import { Popup } from 'src/shared/ui/Popup/Popup'
import style from './ReviewsPopup.module.scss'
import { Title, TitleSize } from 'src/shared/ui/Title/TItle'
import { CloseButton } from 'src/shared/ui/CloseButton/CloseButton'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { OverallRating } from 'src/shared/ui/OverallRating/OverallRating'
import { ReviewsCount } from 'src/shared/ui/ReviewsStats/ReviewsCount'
import { GoodEstimaions } from '../Reviews'
import { ReviewsList } from 'src/shared/ui/ReviewsList/ReviewsList'

interface ReviewsPopupProps {
  isActive: boolean
  closePopup: () => void
  overall_rating?: number
  marks?: number
  dataEstimations?: GoodEstimaions[]
}

export const ReviewsPopup = ({ marks, overall_rating, closePopup, isActive, dataEstimations }: ReviewsPopupProps) => {


  return (
    <Popup isActive={isActive} closePopup={closePopup}>
      <div className={style.reviewsPopup}>
        <CloseButton className={style.reviewsPopup__close} />
        <Title size={TitleSize.S}>Отзывы о товаре</Title>
        <div className={style.reviewsPopup__ratingInfo}>
          <OverallRating
            overall_rating={overall_rating}
            marks={marks}
          />
          <Button 
          className={style.reviewsPopup__newOpinion}
          size={ButtonSize.M}
          theme={ButtonTheme.GREY}
          >
            Оставить отзыв
            </Button>
        </div>
        <div className={style.reviewsPopup__reviewStats}>
          <ReviewsCount stats={dataEstimations} />
        </div>
        <div className={style.reviewsPopup__reviews}>
          <ReviewsList reviews={dataEstimations} />
        </div>

      </div>
    </Popup>
  )
}