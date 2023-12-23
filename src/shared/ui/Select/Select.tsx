import { forwardRef, useState } from "react"
import style from './Select.module.scss'
import { Button } from "../Button/Button";

interface SelectProps {
    multiple?: boolean
}

export const Select = forwardRef<HTMLDivElement, SelectProps>((props: SelectProps, ref) => {
    const [value, setValue] = useState<string>('Залупа');
    const [isFocused, setIsFocused] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const options: string[] | { key: string, value: string }[] = [];

    return (
        <div
            className={style.select}
            ref={ref}
            tabIndex={0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            <div className={style.select__dropdown}>
                {options.map((option) => {
                    if (typeof option === "string") {
                        return (
                            <Button
                                key={option}
                                className={style.select__option}
                                onClick={() => setValue(option)}
                            >
                                {option}
                            </Button>
                        )
                    }
                    return (
                        <Button
                            key={option.key}
                            className={style.select__option}
                            onClick={() => setValue(option.value)}
                        >
                            {option.key}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
})