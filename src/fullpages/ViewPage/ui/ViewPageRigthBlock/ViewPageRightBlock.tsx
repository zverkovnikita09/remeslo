"use client"
import { SingleGoods } from "@fullpages/ViewPage"
import { Store } from "@shared/models/store.model";
import { Title } from "@shared/ui/Title";
import { useState } from "react";
import cn from 'classnames'
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { phoneFormatter } from "@shared/lib/phoneFormatter";
import style from './ViewPageRigthBlock.module.scss'
import Link from "next/link";
import { Share } from "@features/Share/ui/Share";
import { VendorProfile } from "@entities/VendorProfile";
import { Rating } from "@shared/ui/Rating";
import { Reviews } from "@features/Reviews";
import { GoodEstimaions } from "@features/Reviews/ui/Reviews";

interface ViewPageRightBlockProps {
  goodInfo?: SingleGoods;
  store?: Store;
  estimations?: GoodEstimaions[]
}

export const ViewPageRightBlock = ({ goodInfo, store, estimations }: ViewPageRightBlockProps) => {
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

  const [isPhoneShown, setIsPhoneShown] = useState(false);

  const [isReviewFormActive, setIsReviewFormActive] = useState(false);

  const openReviewForm = () => {
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

  const sendMessage = () => {

  }

  return (
    <div className={style.viewPageRightBlock}>
      <div className={style.heading}>
        <Title>{title}</Title>
        <Share title={title} imagePath={files?.[0].path} />
      </div>
      <div className={style.rating}>
        <Rating overall_rating={overall_rating ?? 0} />
        <div className={style.reviews}>
          <Reviews
            good={goodInfo}
            closeReviewForm={closeReviewForm}
            openReviewForm={openReviewForm}
            reviewFormState={isReviewFormActive}
            estimations={estimations}
          />
        </div>
      </div>
      <p className={cn(style.greyText, 'greyText')}>Цена:</p>
      <p className={style.price}>{price} ₽</p>
      <p className={cn(style.greyText, 'greyText')}>Опубликовано</p>
      <p className={style.date}>{formattedDate}</p>
      <Link href={`/main/store/${store?.id}`} className={style.vendor}>
        <VendorProfile profile={store?.user?.profile} registered_at={store?.user.email_verified}/>
      </Link>
      <Button
        className={style.phoneButton}
        theme={ButtonTheme.RED}
        size={ButtonSize.M}
        onClick={handlePhoneClick}
      >
        Позвонить {phoneFormatter(phone_number ?? '', isPhoneShown)}
      </Button>
      <Button
        className={style.messageButton}
        theme={ButtonTheme.OUTLINE}
        size={ButtonSize.M}
        onClick={sendMessage}
      >
        Написать сообщение
      </Button>
      <Button
        className={style.reviewButton}
        theme={ButtonTheme.GREY}
        size={ButtonSize.M}
        onClick={openReviewForm}
      >
        Оставить отзыв
      </Button>
    </div>
  )
}