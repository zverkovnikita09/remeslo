import style from "./RadioButton.module.scss";
import { forwardRef, useCallback, useState } from "react";
import { classNames } from "src/shared/lib/classNames/classNames";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode,
    checked?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string
    id: string
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
    const {
        children,
        className = '',
        id,
        onChange,
        checked,
        ...otherProps
    } = props;

    const [isChecked, setIsChecked] = useState(checked ?? false);

    const onRadioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        setIsChecked(e.target.checked);
    }, [])

    return (
        <label htmlFor={id} className={classNames(style.radioButton, { [style.checked]: isChecked }, [className])}>
            <input
                onChange={onRadioChange}
                id={id}
                className={style.radioButton__input}
                type='radio'
                ref={ref}
                {...otherProps}
            />

            {children}

        </label>
    )
}
)
