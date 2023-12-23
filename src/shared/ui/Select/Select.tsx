import { forwardRef, useState } from "react"
import style from './Select.module.scss'
import { Button } from "../Button/Button";

interface CommonSelectProps {
    option: (string | { name: string; value: string; })[]
}

interface MultipleSelectProps {
    multiple: true
    value: string[]
    setValue: (value: string[]) => void
}

interface SingleSelectProps {
    multiple?: false
    value: string
    setValue: (value: string) => void
}

type SelectProps = CommonSelectProps & (MultipleSelectProps | SingleSelectProps)

export const Select = forwardRef<HTMLDivElement, SelectProps>((props: SelectProps, ref) => {
    const { multiple } = props

    const [value, setValue] = useState<string | string[]>('Залупа');
    const [isFocused, setIsFocused] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const options: (string | { name: string; value: string; })[] = [];
    const [availableOptions, setAvailableOptions] = useState(options);

    const isOptionStringArray = (options: (string | { name: string; value: string; })[]): options is string[] => {
        return !!(options?.length && typeof options[0] === 'string')
    }

    const addValue = (selectValue: string) => {
        if (multiple) {
            setValue([...value, selectValue]);
            setAvailableOptions(availableOptions.filter(option => {
                if (typeof option === 'string') {
                    return selectValue !== option;
                }

                return selectValue !== option.value;
            }))
            return;
        }

        setValue(selectValue);
    }

    const deleteValue = (selectValue: string) => {
        const optionValue = isOptionStringArray(options)
            ? selectValue
            : options.find(option => selectValue === (option as { name: string; value: string; }).value);
        setAvailableOptions([...availableOptions, optionValue!]);
    }

    return (
        <div
            className={style.select}
            ref={ref}
            tabIndex={0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            <div className={style.select__dropdown}>
                {availableOptions.map((option) => {
                    if (typeof option === "string") {
                        return (
                            <Button
                                key={option}
                                className={style.select__option}
                                onClick={() => addValue(option)}
                            >
                                {option}
                            </Button>
                        )
                    }
                    return (
                        <Button
                            key={option.name}
                            className={style.select__option}
                            onClick={() => addValue(option.value)}
                        >
                            {option.name}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
})