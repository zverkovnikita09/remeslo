"use client"
import { ChangeEvent, TextareaHTMLAttributes, forwardRef, useId } from "react";
import style from "./TextArea.module.scss";
import cn from "classnames";
import { FieldError } from "react-hook-form";
import { ErrorBlock } from "../ErrorBlock";

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  autosize?: boolean
  maxSize?: number | string
  defaultHeight?: number
  label?: string
  theme?: string
  error?: FieldError
  touched?: boolean
}

export enum TextAreaTheme {
  PRIMARY = '',
  INPUT_LIKE = 'inputLike'
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
      label,
      touched,
      theme = TextAreaTheme.PRIMARY,
      error,
      ...otherProps
    } = props

    const id = useId();

    const onValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e)

      if (autosize) {
        e.target.style.height = `${defaultHeight}px`;
        e.target.style.height = `${e.target.scrollHeight + 2}px`;
      }
    }

    return (
      <div className={style.textarea} data-status={error ? 'error' : touched ? 'success' : ''}>
        {label &&
          <label htmlFor={id} className={style.label}>{label}</label>
        }
        <textarea
          ref={ref}
          id={id}
          className={cn(style.textField, className, style[theme])}
          onChange={onValueChange}
          style={{ height: defaultHeight, maxHeight: maxSize }}
          {...otherProps}
        />
        {error?.message && <ErrorBlock>{error?.message}</ErrorBlock>}
      </div>
    )
  }
)

TextArea.displayName = "TextArea"