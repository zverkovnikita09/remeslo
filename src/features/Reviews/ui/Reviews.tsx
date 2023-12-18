import { Button } from 'src/shared/ui/Button/Button'
import style from './Reviews.module.scss'
import { useState } from 'react'
import { ReviewsPopup } from './ReviewsPopup/ReviewsPopup'
import { labelsCounterFormatter } from 'src/shared/lib/labelsCounterFormatter/labelsCounterFormatter'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { IUser, ProfileInfo } from 'src/app/providers/AuthProvider'
import { getData } from 'src/shared/lib/api/api'
import { SingleGoods } from 'src/pages/ViewPage/ui/ViewPage'
import { ReviewFormPopup } from 'src/features/ReviewFormPopup'


interface ReviewsProps {
  good?: SingleGoods
}

export interface GoodEstimaions {
  estimation: number
  id: string
  user: IUser
  profile: ProfileInfo
  review: string
  files: { path: string }[]
}

export const Reviews = ({ good }: ReviewsProps) => {
  const [isPopupActive, setIsPopupActive] = useState(false)

  const { slug } = useParams();
  const { data: dataEstimations } = useQuery({
    queryKey: ['goodEstimations', slug],
    queryFn: () => getData<GoodEstimaions[]>({
      url: `/api/v1/mark?markable_id=${slug}`,
      dataFlag: true
    }),
  })

  const openPopup = () => {
    setIsPopupActive(true)
  }

  const closePopup = () => {
    setIsPopupActive(false)
  }

  return (
    <>
      <ReviewFormPopup goodInfo={good} closePopup={() => { }} isActive={true} />
      <ReviewsPopup
        isActive={isPopupActive}
        closePopup={closePopup}
        overall_rating={good?.overall_rating}
        marks={good?.marks}
        dataEstimations={dataEstimations}
      />
      <Button className={style.reviews} onClick={openPopup}>
        {good?.marks ? labelsCounterFormatter(good?.marks, ['Отзыв', 'Отзыва', 'Отзывов']) : 'нет отзывов'}
      </Button>

    </>
  )
}