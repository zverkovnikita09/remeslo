import { Container } from 'src/shared/ui/Container/Container'
import style from './ViewPage.module.scss'
import { Title } from 'src/shared/ui/Title/TItile'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import image from '../assets/view.png'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { getData } from 'src/shared/lib/api/api'
import { phoneFormatter } from 'src/shared/lib/phoneFormatter/phoneFormatter'
import { useState } from 'react'
import { TextArea } from 'src/shared/ui/TextArea/TextArea'
import { viewsCounterFormatter } from 'src/shared/lib/viewsCounterFormatter/viewsCounterFormatter'

const phoneNumber = '8 (999) 999-99-99'

export interface SingleGoods {
  all_time_views: number
  description: string
  file: { path: string }[] | null
  id: string
  moderate: number
  price: number
  price_old: number
  publish: number
  published_at: string
  store_id: string
  tags: TagType[]
  title: string
  views_today: number

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
    views_today
  } = data ?? {};

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
        {/* <Title className={style.viewPage__title}>Адрес</Title>
        <div className={style.viewPage__addressBlock}>
          Ростовская область, Ростов-на-Дону, Будённовский пр-т,
          28 р-н Ленинский
          <Button className={style.viewPage__location}>
            <GeoIcon
              strokeColor='#FC8080'
            />
            Показать на карте
          </Button>
        </div> */}
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
          {viewsCounterFormatter(all_time_views ?? 0)} <GreyText>(+{views_today} сегодня)</GreyText>
        </div>
      </div>
      <div className={style.viewPage__rightBlock}>
        <Title>{title}</Title>
        <GreyText className={style.viewPage__greyText}>Цена:</GreyText>
        <p className={style.viewPage__price}>{price} ₽</p>
        <GreyText className={style.viewPage__greyText}>Опубликовано</GreyText>
        <p className={style.viewPage__date}>{formattedDate}</p>
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