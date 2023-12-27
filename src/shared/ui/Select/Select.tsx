import { useCallback, useRef, useState } from "react"
import { Dropdown } from "../Dropdown/Dropdown";
import style from './Select.module.scss'
import { GreyText } from "../GreyText/GreyText";
import { SlArrowDown } from "react-icons/sl";
import { classNames } from "src/shared/lib/classNames/classNames";
import { IoClose } from "react-icons/io5";
import { Button } from "../Button/Button";
import { useToggleDropdown } from "src/shared/hooks/useToggleDropdown";

interface OptionType {
    name: string
    value: string
}

interface CommonSelectProps {
    options: (string | OptionType)[]
    placeholder?: string
}

interface MultipleSelectProps {
    multiple: true
    value?: string[]
    setValue: (value: string[]) => void
}

interface SingleSelectProps {
    multiple?: false
    value?: string
    setValue: (value: string) => void
}

type SelectProps = CommonSelectProps & (MultipleSelectProps | SingleSelectProps)

export const Select = (props: SelectProps) => {
    const { multiple, placeholder, value, setValue, options } = props

    const [, setIsFocused] = useState(false);
    const [isDropdownOpen, toggleDropdown] = useToggleDropdown();
    const [availableOptions, setAvailableOptions] = useState(options);
    const elementRef = useRef<HTMLDivElement>(null)

    const isOptionStringArray = (options: (string | OptionType)[]): options is string[] => {
        return !!(options?.length && typeof options[0] === 'string')
    }

    const addValue = useCallback((selectValue: string) => () => {
        if (multiple) {
            setValue([...(value ?? []), selectValue]);
            setAvailableOptions(prev => prev.filter(option => {
                if (typeof option === 'string') {
                    return selectValue !== option;
                }

                return selectValue !== option.value;
            }))
            toggleDropdown();
            return;
        }

        setValue(selectValue);
    }, [value])

    const deleteValue = useCallback((selectValue: string) => () => {
        if (multiple) {
            setValue(value?.filter(item => item !== selectValue) ?? [])

            const optionValue = isOptionStringArray(options)
                ? selectValue
                : options.find(option => selectValue === (option as OptionType).value);
            setAvailableOptions(prev => [...prev, optionValue!]);
        }
    }, [value])

    const valueToShow = (value: string) => {
        if (isOptionStringArray(options)) {
            return value
        }

        return (options.find(item => (item as OptionType).value === value) as OptionType)?.name || ''
    }

    return (
        <div className={style.select}>
            <div
                className={style.select__toggler}
                tabIndex={0}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                ref={elementRef}
                onClick={toggleDropdown}
            >
                <SlArrowDown
                    className={classNames(style.select__arrowDown, { [style.rotated]: isDropdownOpen })}
                    color="#9B9B9B"
                />
                {!multiple && (valueToShow(value ?? '') || placeholder)}
                {multiple && (value?.length ?
                    (value.map((item) => (
                        <div key={item} className={style.select__valueItem} onClick={e => e.stopPropagation()}>
                            {valueToShow(item)}
                            <Button onClick={deleteValue(item)}><IoClose /></Button>
                        </div>
                    )))
                    : placeholder)}
                <Dropdown
                    isOpen={isDropdownOpen}
                    onClose={toggleDropdown}
                    targetRef={elementRef}
                    horizontalPosition="left"
                    width="100%"
                    className={style.select__dropdown}
                >
                    {availableOptions?.length
                        ? availableOptions.map((option) => {
                            if (typeof option === "string") {
                                return (
                                    <div
                                        key={option}
                                        className={classNames(style.select__item, { [style.selected]: option === value })}
                                        onClick={addValue(option)}
                                    >
                                        {option}
                                    </div>
                                )
                            }
                            return (
                                <div
                                    key={option.name}
                                    className={classNames(style.select__item, { [style.selected]: option.value === value })}
                                    onClick={addValue(option.value)}
                                >
                                    {option.name}
                                </div>
                            )
                        })
                        : <GreyText className={style.select__text}>Нет доступных элементов</GreyText>
                    }
                </Dropdown>
            </div>

        </div>
    )
}