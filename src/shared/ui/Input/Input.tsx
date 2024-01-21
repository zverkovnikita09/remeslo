import { InputHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames';
import style from './Input.module.scss'
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: FieldError
  touched?: boolean | undefined
  wrapperClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    wrapperClassName,
    error,
    touched,
    ...otherProps
  } = props

  return (
    <div className={cn(style.input, wrapperClassName)} data-status={error ? 'error' : touched ? 'success' : ''}>
      <input
        className={cn(style.textField, className)}
        ref={ref}
        {...otherProps}
      />
      {error?.message && <p className={style.helpBlock}>{error?.message}</p>}
    </div>
  )
})

Input.displayName = "Input"