import { FC, ReactNode } from 'react'
import style from './GreyText.module.scss'
import { classNames } from 'src/shared/lib/classNames/classNames'

interface GreyTextProps {
  className?: string
  children?: ReactNode
}

export const GreyText: FC<GreyTextProps> = ({ children, className = '' }) => {
  return (
    <p className={classNames(style.greyText, {}, [className])}>{children}</p>
  )
}