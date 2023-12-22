import { classNames } from 'src/shared/lib/classNames/classNames';
import style from './Button.module.scss'
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
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
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      type,
      className = '',
      children,
      size = ButtonSize.PRIMARY,
      theme = ButtonTheme.PRIMARY,
      isLoading,
      disabled,
      loadingText,
      contentClassname = '',
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
        ref={ref}
        disabled={isLoading || disabled}
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
      </button>
    )
  }
)