import { SkeletonPlaceholder } from 'src/shared/ui/SkeletonPlaceholder/SkeletonPlaceholder'
import style from './GoodsSkeleton.module.scss'
import templateLogo from 'src/shared/assets/templateLogo.png'

interface GoodsSkeletonProps {
    count?: number
}

export const GoodsSkeleton = ({ count = 10 }: GoodsSkeletonProps) => {
    return (
        <div className={style.goodsSkeleton}>
            {[...Array(count)].map((_, index) => (
                <div key={index} className={style.goodsSkeleton__item}>
                    <SkeletonPlaceholder className={style.goodsSkeleton__image} height={239}>
                        <img src={templateLogo} />
                    </SkeletonPlaceholder>
                    <div className={style.goodsSkeleton__info}>
                        <SkeletonPlaceholder height={27} width='90%' />
                        <SkeletonPlaceholder height={24} width='60%' />
                        <SkeletonPlaceholder height={26} width='30%' />
                    </div>
                </div>
            ))}
        </div>
    )
}