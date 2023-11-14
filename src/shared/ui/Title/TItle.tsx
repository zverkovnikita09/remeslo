import { classNames } from 'src/shared/lib/classNames/classNames'
import style from './Title.module.scss'
import { FC, ReactNode } from 'react'

export enum TitleHeading {

}

export enum TitleSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l'
}


interface TitleProps {
  head?: TitleHeading
  size?: TitleSize
  className?: string
  children?: ReactNode
}

export const Title: FC<TitleProps> = ({ children, className = '', size = TitleSize.M }) => {
  const additionalClasses = [
    className,
    style[size],
  ]

  return <h1 className={classNames(style.title, {}, additionalClasses)}>{children}</h1>
}