import cn from 'classnames'
import style from './Title.module.scss'
import { FC, ReactNode } from 'react'

export enum TitleSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l'
}

interface TitleProps {
  size?: TitleSize
  className?: string
  children?: ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export const Title: FC<TitleProps> = ({ children, className, size = TitleSize.M, as = "h1" }) => {
  const additionalClasses = [
    className,
    style[size],
  ]

  const Component = as;

  return <Component className={cn(style.title, additionalClasses)}>{children}</Component>
}