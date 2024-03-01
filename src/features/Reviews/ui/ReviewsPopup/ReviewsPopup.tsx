import style from './ReviewsPopup.module.scss'
import { GoodEstimaions } from '../Reviews'
import { useSession } from 'next-auth/react'
import { Popup } from '@shared/ui/Popup'
import { Title, TitleSize } from '@shared/ui/Title'
import { OverallRating } from '@shared/ui/OverallRating'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import {ReviewsCount} from "@features/ReviewsCount";
import {ReviewsList} from "@entities/ReviewsList";

interface ReviewsPopupProps {
  isActive: boolean
  closePopup: () => void
  overall_rating?: number
  marks?: number
  dataEstimations?: GoodEstimaions[]
  openReviewForm: () => void
  setNeedPreviousPopup?(need: boolean): void
}

export const ReviewsPopup = ({
  marks,
  overall_rating,
  closePopup,
  openReviewForm,
  isActive,
  dataEstimations,
  setNeedPreviousPopup,
}: ReviewsPopupProps) => {
  const { status } = useSession();

  const openForm = () => {
    closePopup();
    openReviewForm();
    setNeedPreviousPopup?.(true);
  }

  return (
    <Popup isActive={isActive} closePopup={closePopup}>
      <div className={style.reviewsPopup}>
        <Title size={TitleSize.S}>Отзывы о товаре</Title>
        <div className={style.ratingInfo}>
          <OverallRating
            overall_rating={overall_rating}
            marks={marks}
          />
          {status === 'authenticated' &&
            <Button
              className={style.newOpinion}
              size={ButtonSize.M}
              theme={ButtonTheme.GREY}
              onClick={openForm}
            >
              Оставить отзыв
            </Button>}
        </div>
         <div className={style.reviewStats}>
          <ReviewsCount stats={dataEstimations} />
        </div>
        <div className={style.reviews}>
          <ReviewsList reviews={dataEstimations} />
        </div>
      </div>
    </Popup>
  )
}