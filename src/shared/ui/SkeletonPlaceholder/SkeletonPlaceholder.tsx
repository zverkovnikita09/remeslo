import cn from "classnames"
import style from './SkeletonPlaceholder.module.scss'
import { ReactNode } from 'react'

interface SkeletonPlaceholderProps {
  className?: string
  width?: number | string
  height?: number | string
  heightUnset?: boolean
  widthUnset?: boolean
  children?: ReactNode
}

export const SkeletonPlaceholder = ({ className, width = 'auto', height = 'auto', widthUnset, heightUnset, children }: SkeletonPlaceholderProps) => {
  return (
    <div
      className={cn(style.skeletonPlaceholder, className)}
      style={{
        width: !widthUnset ? width : undefined,
        height: !heightUnset ? height : undefined
      }}
    >
      <div className={style.skeletonPlaceholder__activity} />
      {children}
    </div>
  )
}
