import style from "./RadioButton.module.scss";
import { forwardRef, useId } from "react";
import { classNames } from "src/shared/lib/classNames/classNames";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode,
    checked?: boolean,
    className?: string
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
    const id = useId();
    const {
        children,
        className = '',
        checked,
        ...otherProps
    } = props;

    return (
        <div className={classNames(style.radioButton, {}, [className])}>

            <input
                id={id}
                className={style.radioButton__input}
                type='radio'
                ref={ref}
                {...otherProps}
            />
            <label htmlFor={id} className={style.radioButton__label}>

                {children}

            </label>
        </div>
    )
}
)
