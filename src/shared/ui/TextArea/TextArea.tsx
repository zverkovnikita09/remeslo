import { ChangeEvent, TextareaHTMLAttributes, forwardRef } from "react";
import style from "./TextArea.module.scss";
import { classNames } from "src/shared/lib/classNames/classNames";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  autosize?: boolean
  maxSize?: number | string
  defaultHeight?: number
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      className = '',
      onChange,
      autosize,
      maxSize,
      value,
      defaultHeight,
      ...otherProps
    } = props

    const onValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e)

      if (autosize) {
        e.target.style.height = `${defaultHeight}px`;
        e.target.style.height = `${e.target.scrollHeight + 2}px`;
      }
    }

    return (
      <div className={style.textarea}>
        <textarea ref={ref}
          className={classNames(style.textarea__textField, {}, [className])}
          onChange={onValueChange}
          style={{ height: defaultHeight, maxHeight: maxSize }}
          {...otherProps}
        />
      </div>
    )
  }
)

