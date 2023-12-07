import { Container } from 'src/shared/ui/Container/Container'
import style from './ViewPage.module.scss'
import { Title } from 'src/shared/ui/Title/TItle'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { getData } from 'src/shared/lib/api/api'
import { phoneFormatter } from 'src/shared/lib/phoneFormatter/phoneFormatter'
import { useState } from 'react'
import { TextArea } from 'src/shared/ui/TextArea/TextArea'
import { labelsCounterFormatter } from 'src/shared/lib/labelsCounterFormatter/labelsCounterFormatter'
import { IUser } from 'src/app/providers/AuthProvider'
import { Rating } from 'src/features/Rating'
import { VendorProfile } from 'src/features/VendorProfile'
import { Reviews } from 'src/features/Reviews'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { classNames } from 'src/shared/lib/classNames/classNames'





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
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();
  const [activeThumbSlide, setActiveThumbSlide] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType>();



  return (
    <Container className={style.viewPage}>
      <div className={style.viewPage__main}>
        <div className={style.viewPage__sliderGallery}>
          <Swiper className={style.viewPage__bigSlider}
            spaceBetween={50}
            slidesPerView={1}
            thumbs={{ swiper: thumbsSwiper }}
            onSwiper={setMainSwiper}
            onSlideChange={() => setActiveThumbSlide(mainSwiper?.activeIndex ?? 0)}
            modules={[Thumbs]}
          >
            {files?.map((img, index) => (

              <SwiperSlide key={index} className={style.viewPage__bigItem}>
                <img src={img.path} alt={title} className={style.viewPage__mainImage} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper className={style.viewPage__smallSlider}
            spaceBetween={12}
            slidesPerView={4.5}
            onSwiper={setThumbsSwiper}
            modules={[Thumbs]}
          >
            {files?.map((img, index) => (
              <SwiperSlide key={index} className={classNames(style.viewPage__smallItem, { [style.activeItem]: activeThumbSlide === index })}>
                <img src={img.path} alt={title} className={style.viewPage__mainImage} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

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
      </div>
    </Container>
  )
}