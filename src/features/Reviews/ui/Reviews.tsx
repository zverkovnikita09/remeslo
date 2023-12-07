import { Button } from 'src/shared/ui/Button/Button'
import style from './Reviews.module.scss'
import { useState } from 'react'
import { ReviewsPopup } from './ReviewsPopup/ReviewsPopup'
import { labelsCounterFormatter } from 'src/shared/lib/labelsCounterFormatter/labelsCounterFormatter'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { IUser, ProfileInfo } from 'src/app/providers/AuthProvider'
import { getData } from 'src/shared/lib/api/api'

interface ReviewsProps {
  marks?: number
  overall_rating?: number
}

export interface GoodEstimaions {
  estimation: number
  id: string
  user: IUser
  profile: ProfileInfo
}

export const Reviews = ({marks, overall_rating}: ReviewsProps) => {
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
      <ReviewsPopup
      isActive={isPopupActive} 
      closePopup={closePopup}
      overall_rating={overall_rating}
      marks={marks}
      dataEstimations={dataEstimations}
      />
      <Button className={style.reviews} onClick={openPopup}>
            {marks ? labelsCounterFormatter(marks, ['Отзыв', 'Отзыва', 'Отзывов']) : 'нет отзывов'}
      </Button>

    </>
  )
}