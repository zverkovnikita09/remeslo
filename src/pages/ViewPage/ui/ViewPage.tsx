import { Container } from 'src/shared/ui/Container/Container'
import style from './ViewPage.module.scss'
import { Title } from 'src/shared/ui/Title/TItle'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import image from '../assets/view.png'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { getData } from 'src/shared/lib/api/api'
import { phoneFormatter } from 'src/shared/lib/phoneFormatter/phoneFormatter'
import { useState } from 'react'
import { TextArea } from 'src/shared/ui/TextArea/TextArea'
import { labelsCounterFormatter } from 'src/shared/lib/labelsCounterFormatter/labelsCounterFormatter'
import { IUser } from 'src/app/providers/AuthProvider'
import { Rating } from 'src/features/Rating'
import { UserPhoto } from 'src/shared/ui/UserPhoto/UserPhoto'
import { VendorProfile } from 'src/features/VendorProfile'

const phoneNumber = '8 (999) 999-99-99'

export interface SingleGoods {
  all_time_views: number
  description: string
  file: { path: string }[] | null
  id: string
  marks: number
  moderate: number
  overall_rating: number
  price: number
  price_old: number
  publish: number
  published_at: string
  store: StoreType
  tags: TagType[]
  title: string
  views_today: number

}

export interface StoreType {
  address: string
  avatar: { path: string }[] | null
  banner: { path: string }[] | null
  description: string
  id: string
  moderate: number
  phone_number: string
  published_at: string
  title: string
  user: IUser
}

export interface TagType {
  name: string
  slug: string
  image: string
}

export const ViewPage = () => {
  const { slug } = useParams();
  const { data } = useQuery({
    queryKey: slug,
    queryFn: () => getData<SingleGoods>({
      url: `/api/v1/good/${slug}`,
      dataFlag: true
    }),
  })

  const {
    title,
    price,
    description,
    published_at,
    all_time_views,
    views_today,
    store,
    overall_rating,
    marks
  } = data ?? {};
  /*   console.log(data);
  
    console.log(marks);
    
    console.log(store); */


  const [isPhoneShown, setIsPhoneShown] = useState(false);
  const [phoneHref, setPhoneHref] = useState('');

  const formattedDate = new Date(published_at ?? '').toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric'
  }).replace(' в ', ' ');

  const handlePhoneClick = () => {
    if (!isPhoneShown) {
      setIsPhoneShown(true);
      setPhoneHref(`tel:${phoneNumber}`)
    }
  }

  return (
    <Container className={style.viewPage}>
      <div className={style.viewPage__main}>
        <img src={image} alt={title} className={style.viewPage__mainImage} />
        <Title className={style.viewPage__title}>Адрес</Title>
        <div className={style.viewPage__addressBlock}>
          {store?.address}
          {/*           <Button className={style.viewPage__location}>
            <GeoIcon
              strokeColor='#FC8080'
            />
            Показать на карте
          </Button> */}
        </div>
        <Title className={style.viewPage__title}>Характеристики</Title>
        <div className={style.viewPage__feature}></div>
        <Title className={style.viewPage__title}>Описание</Title>
        <div className={style.viewPage__description} dangerouslySetInnerHTML={{ __html: description ?? '' }} />
        <Title className={style.viewPage__title}>Написать продавцу</Title>
        <TextArea
          className={style.viewPage__textArea}
          placeholder='Что вы хотите спросить?'
        />
        <Button
          theme={ButtonTheme.RED}
          size={ButtonSize.M}
          className={style.viewPage__sendMessage}
        >
          Отправить
        </Button>
        <div className={style.viewPage__views}>
          {labelsCounterFormatter(all_time_views ?? 0, ['просмотр', 'просмотра', 'просмотров'])} <GreyText>(+{views_today} сегодня)</GreyText>
        </div>
      </div>
      <div className={style.viewPage__rightBlock}>
        <Title>{title}</Title>
        <div className={style.viewPage__rating}>
          <Rating overall_rating={overall_rating ?? 0}></Rating>
          <Button className={style.viewPage__reviews}>{/* {marks || 'нет'} */ labelsCounterFormatter(2, ['Отзыв', 'Отзыва', 'Отзывов'])}</Button>
        </div>
        <GreyText className={style.viewPage__greyText}>Цена:</GreyText>
        <p className={style.viewPage__price}>{price} ₽</p>
        <GreyText className={style.viewPage__greyText}>Опубликовано</GreyText>
        <p className={style.viewPage__date}>{formattedDate}</p>
        <Link to={'/'} className={style.viewPage__vendor}>
          <VendorProfile store={store as StoreType}/>
        </Link>
        <Link to={phoneHref}>
          <Button
            className={style.viewPage__phoneButton}
            theme={ButtonTheme.RED}
            size={ButtonSize.M}
            onClick={handlePhoneClick}
          >
            Позвонить {phoneFormatter(phoneNumber, isPhoneShown)}
          </Button>
        </Link>
        <Button
          className={style.viewPage__messageButton}
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.M}
        >
          Написать сообщение
        </Button>
      </div>
    </Container>
  )
}