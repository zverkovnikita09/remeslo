"use client"
import style from './Reviews.module.scss'
import { useState } from 'react'
import { ReviewsPopup } from './ReviewsPopup/ReviewsPopup'
import { SingleGoods } from '@fullpages/ViewPage'
import { ProfileInfo, User } from '@shared/models/user.model'
import { useSession } from 'next-auth/react'
import { Button } from '@shared/ui/Button'
import { labelsCounterFormatter } from '@shared/lib/labelsCounterFormatter'
import { ReviewFormPopup } from '@features/ReviewFormPopup'
import { usePopupState } from '@shared/hooks/usePopupState'

interface ReviewsProps {
  good?: SingleGoods
  openReviewForm: () => void
  closeReviewForm: () => void
  reviewFormState: boolean
  estimations?: GoodEstimaions[]
}

export interface GoodEstimaions {
  estimation: number
  id: string
  user: User
  profile: ProfileInfo
  review: string
  files: { path: string }[]
}

export const Reviews = ({ good, closeReviewForm, openReviewForm, reviewFormState, estimations }: ReviewsProps) => {
  const { isOpen: isPopupActive, openPopup: openReviewPopup, closePopup } = usePopupState();
  const { status } = useSession();
  const [needPreviousPopup, setNeedPreviousPopup] = useState(false);

  const closeReviewPopup = () => {
    closePopup()
    setNeedPreviousPopup(false)
  }

  const closeFormPopup = () => {
    setNeedPreviousPopup(false);
    closeReviewForm();
  }

  return (
    <>
      <ReviewsPopup
        isActive={isPopupActive}
        closePopup={closeReviewPopup}
        openReviewForm={openReviewForm}
        overall_rating={good?.overall_rating}
        marks={good?.marks}
        dataEstimations={estimations}
        setNeedPreviousPopup={setNeedPreviousPopup}
      />
      <Button className={style.reviews} onClick={openReviewPopup}>
        {good?.marks ? labelsCounterFormatter(good?.marks, ['Отзыв', 'Отзыва', 'Отзывов']) : 'нет отзывов'}
      </Button>
      {status === 'authenticated' &&
        <ReviewFormPopup
          goodInfo={good}
          closePopup={closeFormPopup}
          isActive={reviewFormState}
          backToReview={needPreviousPopup}
          openReviewPopup={openReviewPopup}
        />
      }
    </>
  )
}