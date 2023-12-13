import style from "./Checkbox.module.scss";
import { forwardRef } from "react";
import { classNames } from "src/shared/lib/classNames/classNames";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode,
    checked?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string
    textPosition?: 'left' | 'right'
    id: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
    const {
        children,
        className = '',
        textPosition = 'left',
        id,
        ...otherProps
    } = props;

    return (
        <label htmlFor={id} className={classNames(style.checkbox, {}, [className])}>
            <input id={id} className={style.checkbox__input} type='checkbox' ref={ref} {...otherProps} />
            { textPosition === 'left' &&
                <span>{children}</span>
            }
            <span className={style.checkbox__check}>

            </span>
            { textPosition === 'right' &&
                <span>{children}</span>
            }
        </label>
    )
}
)
