import { Link } from "react-router-dom"
import { Reviews } from "src/features/Reviews"
import { Share } from "src/features/Share"
import { VendorProfile } from "src/features/VendorProfile"
import { phoneFormatter } from "src/shared/lib/phoneFormatter/phoneFormatter"
import { Button, ButtonSize, ButtonTheme } from "src/shared/ui/Button/Button"
import { GreyText } from "src/shared/ui/GreyText/GreyText"
import { Title } from "src/shared/ui/Title/TItle"
import style from './ViewPageRightBlock.module.scss'
import { SingleGoods, StoreType } from "../ViewPage"
import { useState } from "react"
import { Rating } from "src/features/Rating"
import { useAuth } from "src/app/providers/AuthProvider"
import { NotificationType, useNotification } from "src/app/providers/NotificationsProvider"
import { SkeletonPlaceholder } from "src/shared/ui/SkeletonPlaceholder/SkeletonPlaceholder"

interface ViewPageRightBlockProps {
  goodInfo?: SingleGoods
  isLoading?: boolean
  store?: StoreType
}

export const ViewPageRightBlock = ({ goodInfo, isLoading, store }: ViewPageRightBlockProps) => {
  const {
    title,
    files,
    overall_rating,
    price,
    published_at
  } = goodInfo ?? {}

  const {
    phone_number
  } = store ?? {};
  const { isAuthed } = useAuth();
  const { addNotification } = useNotification();

  const [isPhoneShown, setIsPhoneShown] = useState(false);

  const [isReviewFormActive, setIsReviewFormActive] = useState(false);

  const openReviewForm = () => {
    if (!isAuthed) {
      addNotification('Оставлять отзывы могут только авторизованные пользователи', NotificationType.Error)
      return
    }
    setIsReviewFormActive(true)
  }

  const closeReviewForm = () => {
    setIsReviewFormActive(false)
  }

  const formattedDate = new Date(published_at ?? '').toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric'
  }).replace(' в ', ' ');

  const handlePhoneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isPhoneShown) {
      setIsPhoneShown(true);
    }
    else {
      const link = document.createElement('a');
      link.setAttribute('href', `tel:${phone_number ?? ''}`);
      link.click();
      link.remove();
    }
  }

  if (isLoading) return (
    <div className={style.viewPageRightBlock}>
      <SkeletonPlaceholder className={style.viewPageRightBlock__titlePlaceholder} heightUnset widthUnset />
      <SkeletonPlaceholder className={style.viewPageRightBlock__titlePlaceholder} heightUnset widthUnset />
      <SkeletonPlaceholder className={style.viewPageRightBlock__ratingPlaceholder} heightUnset widthUnset />
      <GreyText className={style.viewPageRightBlock__greyText}>Цена:</GreyText>
      <SkeletonPlaceholder className={style.viewPageRightBlock__pricePlaceholder} heightUnset widthUnset />
      <GreyText className={style.viewPageRightBlock__greyText}>Опубликовано</GreyText>
      <SkeletonPlaceholder className={style.viewPageRightBlock__datePlaceholder} heightUnset widthUnset />
      <SkeletonPlaceholder className={style.viewPageRightBlock__buttonPlaceholder} heightUnset widthUnset />
      <SkeletonPlaceholder className={style.viewPageRightBlock__buttonPlaceholder} heightUnset widthUnset />
      <SkeletonPlaceholder className={style.viewPageRightBlock__buttonPlaceholder} heightUnset widthUnset />
    </div>
  )

  return (
    <div className={style.viewPageRightBlock}>
      <div className={style.viewPageRightBlock__heading}>
        <Title>{title}</Title>
        <Share title={title} imagePath={files?.[0].path} />
      </div>
      <div className={style.viewPageRightBlock__rating}>
        <Rating overall_rating={overall_rating ?? 0}></Rating>
        <div className={style.viewPageRightBlock__reviews}>
          <Reviews
            good={goodInfo}
            closeReviewForm={closeReviewForm}
            openReviewForm={openReviewForm}
            reviewFormState={isReviewFormActive}
          />
        </div>
      </div>
      <GreyText className={style.viewPageRightBlock__greyText}>Цена:</GreyText>
      <p className={style.viewPageRightBlock__price}>{price} ₽</p>
      <GreyText className={style.viewPageRightBlock__greyText}>Опубликовано</GreyText>
      <p className={style.viewPageRightBlock__date}>{formattedDate}</p>
      <Link to={`/main/profile/${store?.id}`} className={style.viewPageRightBlock__vendor}>
        <VendorProfile store={store as StoreType} />
      </Link>
      <Button
        className={style.viewPageRightBlock__phoneButton}
        theme={ButtonTheme.RED}
        size={ButtonSize.M}
        onClick={handlePhoneClick}
      >
        Позвонить {phoneFormatter(phone_number ?? '', isPhoneShown)}
      </Button>
      <Button
        className={style.viewPageRightBlock__messageButton}
        theme={ButtonTheme.OUTLINE}
        size={ButtonSize.M}
      >
        Написать сообщение
      </Button>
      <Button
        className={style.viewPageRightBlock__reviewButton}
        theme={ButtonTheme.GREY}
        size={ButtonSize.M}
        onClick={openReviewForm}
      >
        Оставить отзыв
      </Button>
    </div>
  )
}