import { ReactNode } from 'react'
import style from './Container.module.scss'
import cn from 'classnames'

interface ContainerProps {
  className?: string
  children?: ReactNode
}

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={cn(style.container, className)}>
      {children}
    </div>
  )
}