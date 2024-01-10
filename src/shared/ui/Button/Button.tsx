/* eslint-disable @typescript-eslint/ban-ts-comment */
import { classNames } from 'src/shared/lib/classNames/classNames';
import style from './Button.module.scss'
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode, RefCallback, RefObject } from 'react'
import { Spinner } from '../Spinner/Spinner';

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
  contentClassname?: string
  as?: "button"
  to?: string
  buttonRef?: RefObject<HTMLElement> | RefCallback<HTMLElement>
}

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: "a" | ComponentType
  to?: string
  children?: ReactNode
  size?: ButtonSize
  theme?: ButtonTheme
  isLoading?: boolean
  loadingText?: string
  contentClassname?: string
  buttonRef?: RefObject<HTMLElement> | RefCallback<HTMLElement>
}

type ComponentButtonProps = ButtonProps | AnchorProps;

export const Button = (props: ComponentButtonProps) => {
  const {
    type = 'button',
    className = '',
    children,
    size = ButtonSize.PRIMARY,
    theme = ButtonTheme.PRIMARY,
    isLoading,
    //@ts-ignore
    disabled,
    loadingText,
    contentClassname = '',
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
      className={classNames(style.button, {}, additionalClasses)}
      //@ts-ignore
      type={as === 'button' ? type : undefined}
      disabled={isLoading || disabled}
      ref={buttonRef}
      {...otherProps}
    >
      {isLoading &&
        <div className={style.button__loading}>
          {loadingText ?? 'Отправка'} <Spinner />
        </div>
      }
      <div className={classNames(style.button__content, { [style.isLoading]: !!isLoading }, [contentClassname])}>
        {children}
      </div>
    </Component>
  )
}