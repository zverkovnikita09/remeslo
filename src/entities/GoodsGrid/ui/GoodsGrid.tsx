import style from './GoodsGrid.module.scss'
import { GoodsSkeleton } from './GoodsSkeleton/GoodsSkeleton'
import cn from 'classnames'
import { GoodsImage } from './GoodsImage/GoodsImage'
import { Goods } from '..'
import Link from 'next/link'
import { GoodsFavorite } from './GoodsFavorite'
import { IBreadcrumb } from '@entities/Breadcrumbs'
import { Title } from '@shared/ui/Title'
import { Rating, RatingType } from '@shared/ui/Rating'

interface GoodsGridProps {
  goods?: Goods[]
  isLoading?: boolean
  isArchived?: boolean
  categoryState?: IBreadcrumb[]
  title?: string;
}

export const GoodsGrid = ({ goods, isLoading = false, isArchived = false, categoryState = [], title }: GoodsGridProps) => {
  if (isLoading) {
    return <GoodsSkeleton />
  }

  return (
    <>
      {title && <Title as='h2' className={style.title}>{title}</Title>}
      <div className={style.goodsGrid}>
        {goods?.map(({ price, published_at, title, id, overall_rating, files }, index) => {
          const formattedDate = new Date(published_at ?? '').toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric'
          }).replace(' в ', ' ');
          return (
            <div key={index} className={cn(style.item, { [style.itemArchived]: isArchived })}>
              <Link
                href={`/main/view/${id}`}
                className={style.itemImage}
              /* state={categoryState} */
              >
                <GoodsImage title={title} files={files} />
              </Link>
              <Link
                href={`/main/view/${id}`}
                className={style.itemTitle}
              /* state={categoryState} */
              >
                {title}
              </Link>
              <p className={style.itemPrice}>{price} ₽</p>
              <p className={style.temDate}>{formattedDate}</p>
              <GoodsFavorite className={style.favoriteButton} />
              <Rating className={style.rating} type={RatingType.Numeric} overall_rating={overall_rating} />
            </div>
          )
        })}
      </div>
    </>
  )
}