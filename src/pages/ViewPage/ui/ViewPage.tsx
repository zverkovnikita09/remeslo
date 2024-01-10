import { Container } from 'src/shared/ui/Container/Container'
import style from './ViewPage.module.scss'
import { Title } from 'src/shared/ui/Title/TItle'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { useQuery } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import { getData } from 'src/shared/lib/api/api'
import { useMemo } from 'react'
import { TextArea } from 'src/shared/ui/TextArea/TextArea'
import { labelsCounterFormatter } from 'src/shared/lib/labelsCounterFormatter/labelsCounterFormatter'
import { IUser, useAuth } from 'src/app/providers/AuthProvider'
import { Breadcrumbs } from 'src/features/Breadcrumbs'
import { IBreadcrumb } from 'src/features/Breadcrumbs/ui/Breadcrumbs'
import { SliderGallery } from 'src/features/SliderGallery'
import { ViewPageRightBlock } from './ViewPageRightBlock/ViewPageRightBlock'
import { SkeletonPlaceholder } from 'src/shared/ui/SkeletonPlaceholder/SkeletonPlaceholder'

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
  const { isAuthed } = useAuth()
  const { slug } = useParams();

  const { data: goodInfo, isLoading: isGoodLoading } = useQuery({
    queryKey: slug,
    queryFn: () => getData<SingleGoods>({
      url: `/api/v1/good/${slug}`,
      dataFlag: true
    }),
  })

  const {
    title,
    description,
    files,
    all_time_views,
    views_today,
    store_id,
  } = goodInfo ?? {};

  const { data: store, isLoading: isStoreLoading } = useQuery({
    queryKey: ['storeInfo', store_id],
    queryFn: () => getData<StoreType>({
      url: `/api/v1/store/${store_id}`,
      dataFlag: true,
    }),
    enabled: !!store_id,
  })

  const { state } = useLocation();

  const breadcrubms = useMemo(() => {
    if (Array.isArray(state)) {
      return [...(state as IBreadcrumb[]), { name: title ?? '', link: '' }]
    }

    return [{ name: title ?? '', link: '' }]
  }, [state, title])

  return (
    <Container className={style.viewPage}>
      <Breadcrumbs links={breadcrubms} />
      <div className={style.viewPage__content}>
        <div className={style.viewPage__main}>
          <SliderGallery title={title} files={files ?? []} isLoading={isGoodLoading} />

          <Title className={style.viewPage__title}>Адрес</Title>
          {
            isGoodLoading
              ? <SkeletonPlaceholder width="90%" height={19} />
              : <div className={style.viewPage__addressBlock}>
                {store?.address}
              </div>
          }
          <Title className={style.viewPage__title}>Характеристики</Title>
          <div className={style.viewPage__feature}></div>
          <Title className={style.viewPage__title}>Описание</Title>
          <div className={style.viewPage__description} dangerouslySetInnerHTML={{ __html: description ?? '' }} />
          {isAuthed &&
            <>
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
            </>}
          <div className={style.viewPage__views}>
            {
              isGoodLoading
                ? <SkeletonPlaceholder height={19} width="40%" />
                : <>{labelsCounterFormatter(all_time_views ?? 0, ['просмотр', 'просмотра', 'просмотров'])} <GreyText>(+{views_today} сегодня)</GreyText></>
            }
          </div>
        </div>
        <ViewPageRightBlock goodInfo={goodInfo} store={store} isLoading={isGoodLoading || isStoreLoading} />
      </div>
    </Container>
  )
}