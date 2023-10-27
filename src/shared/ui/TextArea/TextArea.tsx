import { TextareaHTMLAttributes, forwardRef } from "react";
import style from "./TextArea.module.scss";
import { classNames } from "src/shared/lib/classNames/classNames";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props, ref) => {
      const {
        className = '',
        ...otherProps
      } = props
    
      return (
        <div className={style.textarea}>
          <textarea ref={ref}
            className={classNames(style.textarea__textField, {}, [className])}
            {...otherProps}
          />
        </div>
      )
    }
  )

