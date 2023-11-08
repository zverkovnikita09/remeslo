import { InputHTMLAttributes, forwardRef } from 'react'
import style from './Input.module.scss'
import { FieldError } from 'react-hook-form';
import { classNames } from 'src/shared/lib/classNames/classNames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: FieldError
  touched?: boolean | undefined
  wrapperClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      className = '',
      wrapperClassName = '',
      error,
      touched,
      ...otherProps
    } = props

    return (
      <div className={classNames(style.input, {}, [wrapperClassName])} data-status={error ? 'error' : touched ? 'success' : ''}>
        <input ref={ref}
          className={classNames(style.input__textField, {}, [className])}
          {...otherProps}
        />
        {error?.message && <p className={style.input__helpBlock}>{error?.message}</p>}
      </div>
    )
  }
)