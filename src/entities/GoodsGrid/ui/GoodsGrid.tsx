import style from './GoodsGrid.module.scss'
import templateLogo from 'src/shared/assets/templateLogo.png'
import { Link } from 'react-router-dom'
import { GoodsFavorite } from 'src/features/GoodsFavorite/ui'
import { Rating, RatingType } from 'src/features/Rating/ui/Rating'
import { GoodsSkeleton } from './GoodsSkeleton/GoodsSkeleton'

export interface IGoods {
  imagePath: string
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
}

export const GoodsGrid = ({ goods, isLoading = false }: GoodsGridProps) => {
  if (isLoading) {
    return <GoodsSkeleton />
  }

  return (
    <div className={style.goodsGrid}>
      {goods?.map(({ price, published_at, title, id, overall_rating, imagePath }, index) => {
        const formattedDate = new Date(published_at ?? '').toLocaleString('ru', {
          day: 'numeric',
          month: 'long',
          hour: 'numeric',
          minute: 'numeric'
        }).replace(' в ', ' ');
        return (
          <div key={index} className={style.goodsGrid__item}>
            <Link to={`/main/view/${id}`} className={style.goodsGrid__itemImage}>
              <img
                src={imagePath ? imagePath : templateLogo}
                className={imagePath ? '' : style.templateLogo}
                alt={title}
              />
            </Link>
            <Link to={`/main/view/${id}`} className={style.goodsGrid__itemTitle}>{title}</Link>
            <p className={style.goodsGrid__itemPrice}>{price} ₽</p>
            <p className={style.goodsGrid__itemDate}>{formattedDate}</p>
            <GoodsFavorite className={style.goodsGrid__favoriteButton} />
            <Rating className={style.goodsGrid__rating} type={RatingType.Numeric} overall_rating={overall_rating} />
          </div>
        )
      })}
    </div>
  )
}