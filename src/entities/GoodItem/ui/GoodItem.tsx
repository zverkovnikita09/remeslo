import { GoodsImage } from '@entities/GoodsGrid/ui/GoodsImage'
import style from './GoodItem.module.scss'
import { Goods } from '@entities/GoodsGrid'
import Link from 'next/link'
import { Rating, RatingType } from '@shared/ui/Rating'

interface GoodItemProps extends Goods {

}

export const GoodItem = ({ files, title, id, overall_rating, price, published_at }: GoodItemProps) => {
  const formattedDate = new Date(published_at ?? '').toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric'
  }).replace(' в ', ' ');
  return (
    <div className={style.goodItem}>
      <Link
        href={`/main/view/${id}`}
        className={style.itemImage}
      >
        <GoodsImage title={title} files={files} />
      </Link>
      <Link
        href={`/main/view/${id}`}
        className={style.itemTitle}
      >
        {title}
      </Link>
      <p className={style.itemPrice}>{price} ₽</p>
      <p className={style.temDate}>{formattedDate}</p>
      <Rating className={style.rating} type={RatingType.Numeric} overall_rating={overall_rating} />
    </div>
  )
}