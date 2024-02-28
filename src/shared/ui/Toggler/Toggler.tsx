import style from "./Toggler.module.scss";
import { forwardRef, useId } from "react";
import cn from "classnames";

interface TogglerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode,
  checked?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className?: string
  textPosition?: 'left' | 'right'
}

export const Toggler = forwardRef<HTMLInputElement, TogglerProps>((props, ref) => {
  const {
    children,
    className = '',
    textPosition = 'left',
    ...otherProps
  } = props;

  const id = useId();

  return (
    <label htmlFor={id} className={cn(style.toggler, className)}>
      <input id={id} className={cn(style.input, 'hiddenInput')} type='checkbox' ref={ref} {...otherProps} />
      {textPosition === 'left' &&
        <span>{children}</span>
      }
      <span className={style.check}>

      </span>
      {textPosition === 'right' &&
        <span>{children}</span>
      }
    </label>
  )
}
)

Toggler.displayName = "Toggler"