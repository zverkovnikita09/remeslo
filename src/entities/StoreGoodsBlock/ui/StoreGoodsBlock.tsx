"use client"
import style from './StoreGoodsBlock.module.scss'
import { Title } from '@shared/ui/Title';
import Link from 'next/link';
import cn from 'classnames';
import { Goods, GoodsGrid } from '@entities/GoodsGrid';
import { useParams, usePathname } from 'next/navigation';

interface StoreGoodsBlock {
  goods: Goods[]
}

export const StoreGoodsBlock = ({ goods }: StoreGoodsBlock) => {
  const params = useParams()
  const pathname = usePathname()

  return (
    <div className={style.storeGoodsBlock}>
      <div className={style.heading}>
        <Title className={style.title}>Объявления пользователя</Title>
        <div className={style.toggler}>
          <Link href={`/main/store/${params.slug}`}
            className={cn(style.link, { [style.activeLink]: !pathname.includes("/complete") })}>
            Активные {goods?.length ?? 0}
          </Link>
          <Link href={`/main/store/${params.slug}/complete`}
            className={cn(style.link, { [style.activeLink]: pathname.includes("/complete") })}>
            Завершенные {goods?.length ?? 0}
          </Link>
        </div>
      </div>
      {!goods?.length ?
        <p className='greyText'>У пользователя нет объявлений</p> :
        <GoodsGrid goods={goods} isArchived={pathname.includes("/complete")} />
      }
    </div>
  )
}