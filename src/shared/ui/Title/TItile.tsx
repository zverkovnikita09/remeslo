import { classNames } from 'src/shared/lib/classNames/classNames'
import style from './Title.module.scss'
import { FC, ReactNode } from 'react'

export enum TitleHeading {

}

interface TitleProps {
  head?: TitleHeading
  className?: string
  children?: ReactNode
}

export const Title: FC<TitleProps> = ({ children, className = '' }) => {
  return <h1 className={classNames(style.title, {}, [className])}>{children}</h1>
}