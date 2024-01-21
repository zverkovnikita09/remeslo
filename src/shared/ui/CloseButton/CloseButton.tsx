import style from './Close.module.scss'
import closeIcon from '@images/close.svg'
import { Button } from '../Button/Button'
import { HTMLAttributes } from 'react'
import cn from 'classnames'
import Image from 'next/image'


export enum CloseButtonSize {
  S = 'size_s',
  M = 'size_m'
}

interface CloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  size?: CloseButtonSize
}

export const CloseButton = ({ onClick, className, size = CloseButtonSize.M, ...props }: CloseButtonProps) => {
  return (
    <Button
      aria-label='Закрыть'
      onClick={onClick}
      className={cn(style.closeButton, className, style[size])}
      {...props}
    >
      <Image
        src={closeIcon}
        alt='Закрыть'
        className={style.image}
      />
    </Button>
  )
}