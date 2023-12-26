import style from './Close.module.scss'
import closeIcon from 'src/shared/assets/close.svg'
import { classNames } from 'src/shared/lib/classNames/classNames'
import { Button } from '../Button/Button'
import { HTMLAttributes } from 'react'


export enum CloseButtonSize {
  S = 'size_s',
  M = 'size_m'
}

interface CloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  size?: CloseButtonSize
}

export const CloseButton = ({ onClick, className = '', size = CloseButtonSize.M, ...props }: CloseButtonProps) => {
  return (
    <Button
      aria-label='Закрыть'
      onClick={onClick}
      className={classNames(style.closeButton, {}, [className, style[size]])}
      {...props}
    >
      <img src={closeIcon} alt='Закрыть' className={style.closeButton__image} />
    </Button>
  )
}