import { InputHTMLAttributes, forwardRef } from 'react'
import style from './Input.module.scss'
import { classNames } from 'src/shared/lib/classNames/classNames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      className = '',
      ...otherProps
    } = props
  
    return (
      <div className={style.input}>
        <input ref={ref}
          className={classNames(style.input__textField, {}, [className])}
          {...otherProps}
        />
      </div>
    )
  }
)