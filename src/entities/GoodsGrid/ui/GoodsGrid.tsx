import style from './GoodsGrid.module.scss'
import templateLogo from 'src/shared/assets/templateLogo.png'
import { Link } from 'react-router-dom'
import { GoodsFavorite } from 'src/features/GoodsFavorite/ui'
import { Rating, RatingType } from 'src/features/Rating/ui/Rating'
import { GoodsSkeleton } from './GoodsSkeleton/GoodsSkeleton'
import { classNames } from 'src/shared/lib/classNames/classNames'
import { IBreadcrumb } from 'src/features/Breadcrumbs/ui/Breadcrumbs'

export interface IGoods {
  files?: { path: string }[]
  title: string
  price: string
  published_at: string
  isFavorite: boolean
  id: string
  overall_rating: number
}

interface GoodsGridProps {
  goods?: IGoods[]
  isLoading?: boolean
  isArchived?: boolean
  categoryState?: IBreadcrumb[]
}

export const GoodsGrid = ({ goods, isLoading = false, isArchived = false, categoryState = [] }: GoodsGridProps) => {
  if (isLoading) {
    return <GoodsSkeleton />
  }

  return (
    <div className={style.goodsGrid}>
      {goods?.map(({ price, published_at, title, id, overall_rating, files }, index) => {
        const formattedDate = new Date(published_at ?? '').toLocaleString('ru', {
          day: 'numeric',
          month: 'long',
          hour: 'numeric',
          minute: 'numeric'
        }).replace(' в ', ' ');
        return (
          <div key={index} className={classNames(style.goodsGrid__item, { [style.goodsGrid__itemArchived]: isArchived })}>
            <Link
              to={`/main/view/${id}`}
              className={style.goodsGrid__itemImage}
              state={categoryState}
            >
              <img
                src={files?.length ? files[0].path : templateLogo}
                className={files?.length ? '' : style.templateLogo}
                alt={title}
              />
            </Link>
            <Link
              to={`/main/view/${id}`}
              className={style.goodsGrid__itemTitle}
              state={categoryState}
            >
              {title}
            </Link>
            <p className={style.goodsGrid__itemPrice}>{price} ₽</p>
            <p className={style.goodsGrid__itemDate}>{formattedDate}</p>
            {<GoodsFavorite className={style.goodsGrid__favoriteButton} />}
            <Rating className={style.goodsGrid__rating} type={RatingType.Numeric} overall_rating={overall_rating} />
          </div>
        )
      })}
    </div>
  )
}