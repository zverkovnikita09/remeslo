import { classNames } from 'src/shared/lib/classNames/classNames'
import style from './SkeletonPlaceholder.module.scss'
import { ReactNode } from 'react'

interface SkeletonPlaceholderProps {
    className?: string
    width?: number | string
    height?: number | string
    children?: ReactNode
}

export const SkeletonPlaceholder = ({ className = '', width = 'auto', height = 'auto', children }: SkeletonPlaceholderProps) => {
    return (
        <div className={classNames(style.skeletonPlaceholder, {}, [className])} style={{ width, height }}>
            <div className={style.skeletonPlaceholder__activity} />
            {children}
        </div>
    )
}
