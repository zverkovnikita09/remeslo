import { FC, ReactNode } from 'react'
import style from './Container.module.scss'
import { classNames } from 'src/shared/lib/classNames/classNames'

interface ContainerProps {
  className?: string
  children?: ReactNode
}

export const Container: FC<ContainerProps> = ({ className = '', children }) => {
  return (
    <div className={classNames(style.container, {}, [className])}>
      {children}
    </div>
  )
}