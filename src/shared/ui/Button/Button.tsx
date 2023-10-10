import { classNames } from 'src/shared/lib/classNames/classNames';
import style from './Button.module.scss'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

export enum ButtonSize {
  PRIMARY = '',
  S = 'size_s',
  M = 'size_m'
}

export enum ButtonTheme {
  PRIMARY = '',
  RED = 'red',
  OUTLINE = 'outline',
  BLACK = 'black'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  size?: ButtonSize,
  theme?: ButtonTheme
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    type,
    className = '',
    children,
    size = ButtonSize.PRIMARY,
    theme = ButtonTheme.PRIMARY,
    ...otherProps
  } = props;

  const additionalClasses = [
    className,
    style[size],
    style[theme]
  ]

  return (
    <button
      className={classNames(style.button, {}, additionalClasses)}
      type={type ?? 'button'}
      {...otherProps}
    >
      {children}
    </button>
  )
}