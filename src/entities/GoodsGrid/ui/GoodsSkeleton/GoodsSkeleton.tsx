import { SkeletonPlaceholder } from '@shared/ui/SkeletonPlaceholder'
import style from './GoodsSkeleton.module.scss'
import templateLogo from '@images/templateLogo.png'
import Image from 'next/image'

interface GoodsSkeletonProps {
  count?: number
}

export const GoodsSkeleton = ({ count = 10 }: GoodsSkeletonProps) => {
  return (
    <div className={style.goodsSkeleton}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={style.item}>
          <SkeletonPlaceholder className={style.image} height={239}>
            <Image src={templateLogo} alt='Ремесло плейсхолдер' />
          </SkeletonPlaceholder>
          <div className={style.info}>
            <SkeletonPlaceholder height={27} width='90%' />
            <SkeletonPlaceholder height={24} width='60%' />
            <SkeletonPlaceholder height={26} width='30%' />
          </div>
        </div>
      ))}
    </div>
  )
}