import { Container } from 'src/shared/ui/Container/Container'
import style from './ViewPage.module.scss'
import { Title } from 'src/shared/ui/Title/TItle'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { useQuery } from 'react-query'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getData } from 'src/shared/lib/api/api'
import { phoneFormatter } from 'src/shared/lib/phoneFormatter/phoneFormatter'
import { useMemo, useState } from 'react'
import { TextArea } from 'src/shared/ui/TextArea/TextArea'
import { labelsCounterFormatter } from 'src/shared/lib/labelsCounterFormatter/labelsCounterFormatter'
import { IUser } from 'src/app/providers/AuthProvider'
import { Rating } from 'src/features/Rating'
import { VendorProfile } from 'src/features/VendorProfile'
import { Reviews } from 'src/features/Reviews'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { ShareButton } from 'src/features/ShareButton'
import { Breadcrumbs } from 'src/features/Breadcrumbs'
import { IBreadcrumb } from 'src/features/Breadcrumbs/ui/Breadcrumbs'
import { SliderGallery } from 'src/features/SliderGallery'

export interface SingleGoods {
  all_time_views: number
  description: string
  files: { path: string }[] | null
  id: string
  marks: number
  moderate: number
  overall_rating: number
  price: number
  price_old: number
  publish: number
  published_at: string
  store_id: string
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
  subcategories: []
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
    files,
    published_at,
    all_time_views,
    views_today,
    store_id,
    overall_rating,
    marks,
  } = data ?? {};

  const { data: store } = useQuery({
    queryKey: ['storeInfo', store_id],
    queryFn: () => getData<StoreType>({
      url: `/api/v1/store/${store_id}`,
      dataFlag: true,

    }),
    enabled: !!store_id,
  })

  const [isPhoneShown, setIsPhoneShown] = useState(false);

  const formattedDate = new Date(published_at ?? '').toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric'
  }).replace(' в ', ' ');

  const phoneNumber = store?.phone_number ?? ''

  const handlePhoneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isPhoneShown) {
      setIsPhoneShown(true);
    }
    else {
      const link = document.createElement('a');
      link.setAttribute('href', `tel:${phoneNumber}`);
      link.click();
      link.remove();
    }
  }

  const { state } = useLocation();
  const breadcrubms = useMemo(() => {
    if (Array.isArray(state)) {
      return [...(state as IBreadcrumb[]), { name: title ?? '', link: '' }]
    }

    return [{ name: title ?? '', link: '' }]
  }, [state, data])

  return (
    <Container className={style.viewPage}>
      <Breadcrumbs links={breadcrubms} />
      <div className={style.viewPage__content}>
        <div className={style.viewPage__main}>
          <SliderGallery title={title} files={files ?? []}/>

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
          <div className={style.viewPage__heading}>
            <Title>{title}</Title>
            <ShareButton />
          </div>
          <div className={style.viewPage__rating}>
            <Rating overall_rating={overall_rating ?? 0}></Rating>
            <div className={style.viewPage__reviews}>
              <Reviews marks={marks} overall_rating={overall_rating} />

            </div>
          </div>
          <GreyText className={style.viewPage__greyText}>Цена:</GreyText>
          <p className={style.viewPage__price}>{price} ₽</p>
          <GreyText className={style.viewPage__greyText}>Опубликовано</GreyText>
          <p className={style.viewPage__date}>{formattedDate}</p>
          <Link to={`/main/profile/${store?.id}`} className={style.viewPage__vendor}>
            <VendorProfile store={store as StoreType} />
          </Link>
          <Button
            className={style.viewPage__phoneButton}
            theme={ButtonTheme.RED}
            size={ButtonSize.M}
            onClick={handlePhoneClick}
          >
            Позвонить {phoneFormatter(phoneNumber, isPhoneShown)}
          </Button>
          <Button
            className={style.viewPage__messageButton}
            theme={ButtonTheme.OUTLINE}
            size={ButtonSize.M}
          >
            Написать сообщение
          </Button>
          <Button
            className={style.viewPage__reviewButton}
            theme={ButtonTheme.GREY}
            size={ButtonSize.M}
          >
            Оставить отзыв
          </Button>
        </div>
      </div>
    </Container>
  )
}