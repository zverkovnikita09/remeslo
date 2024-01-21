import cn from 'classnames';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode, RefCallback, RefObject } from 'react'
import { Spinner } from '../Spinner/Spinner';
import style from './Button.module.scss'
import Link from 'next/link';

export enum ButtonSize {
  PRIMARY = '',
  S = 'size_s',
  M = 'size_m'
}

export enum ButtonTheme {
  PRIMARY = '',
  RED = 'red',
  OUTLINE = 'outline',
  BLACK = 'black',
  GREY = 'grey',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  size?: ButtonSize
  theme?: ButtonTheme
  isLoading?: boolean
  loadingText?: string
  as?: "button"
  to?: string
  buttonRef?: RefObject<HTMLButtonElement> | RefCallback<HTMLButtonElement>
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: "a" | typeof Link
  children?: ReactNode
  size?: ButtonSize
  theme?: ButtonTheme
  isLoading?: boolean
  loadingText?: string
  buttonRef?: RefObject<HTMLAnchorElement> | RefCallback<HTMLAnchorElement>
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
}

type ComponentButtonProps = ButtonProps | AnchorProps;

export const Button = (props: ComponentButtonProps) => {
  const {
    type = 'button',
    className,
    children,
    size = ButtonSize.PRIMARY,
    theme = ButtonTheme.PRIMARY,
    isLoading,
    disabled,
    loadingText,
    as = "button",
    buttonRef,
    ...otherProps
  } = props;

  const additionalClasses = [
    className,
    style[size],
    style[theme]
  ]

  const Component = as;

  return (
    <Component
      className={cn(style.button, additionalClasses)}
      type={as === 'button' ? type : undefined}
      disabled={isLoading || disabled}
      //@ts-ignore
      ref={buttonRef}
      {...otherProps}
    >
      {isLoading ?
        <div className={style.loading}>
          {loadingText ?? 'Отправка'} <Spinner />
        </div>
        : children
      }
    </Component>
  )
}