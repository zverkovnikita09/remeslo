import { FC } from 'react'
import style from './Close.module.scss'
import closeIcon from 'src/shared/assets/close.svg'
import { classNames } from 'src/shared/lib/classNames/classNames'
import { Button } from '../Button/Button'

interface CloseButtonProps {
  onClick?: () => void
  className?: string
}

export const CloseButton: FC<CloseButtonProps> = ({ onClick, className = '' }) => {
  return (
    <Button
      aria-label='Закрыть'
      onClick={onClick}
      className={classNames(style.closeButton, {}, [className])}
    >
      <img src={closeIcon} alt='Закрыть' className={style.closeButton__image} />
    </Button>
  )
}