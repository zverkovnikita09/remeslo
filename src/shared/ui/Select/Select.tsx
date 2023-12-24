import { forwardRef, useCallback, useRef, useState } from "react"
import style from './Select.module.scss'
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";

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

export const Select = (props: SelectProps) => {
    const { multiple } = props

    const [value, setValue] = useState<string | string[]>('Залупа');
    const [isFocused, setIsFocused] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const options: (string | { name: string; value: string; })[] = [];
    const [availableOptions, setAvailableOptions] = useState(options);
    const elementRef = useRef<HTMLDivElement>(null)

    const isOptionStringArray = (options: (string | { name: string; value: string; })[]): options is string[] => {
        return !!(options?.length && typeof options[0] === 'string')
    }

    const addValue = useCallback((selectValue: string) => () => {
        if (multiple) {
            setValue([...value, selectValue]);
            setAvailableOptions(prev => prev.filter(option => {
                if (typeof option === 'string') {
                    return selectValue !== option;
                }

                return selectValue !== option.value;
            }))
            return;
        }

        setValue(selectValue);
    }, [])

    const deleteValue = (selectValue: string) => {
        const optionValue = isOptionStringArray(options)
            ? selectValue
            : options.find(option => selectValue === (option as { name: string; value: string; }).value);
        setAvailableOptions(prev => [...prev, optionValue!]);
    }

    return (
        <div
            className={style.select}
            tabIndex={0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={elementRef}
            onClick={() => setIsDropdownOpen(pr => !pr)}
        >
            {isDropdownOpen &&
                <Dropdown
                    targetRef={elementRef}
                    horizontalPosition="left"
                >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non quam fugit repellat quaerat id similique. Eveniet quos animi quibusdam libero numquam aliquam magnam illum accusantium vero delectus distinctio velit asperiores debitis ratione quisquam rerum id officiis consectetur eaque, nostrum non earum a aut voluptas? Quas sit asperiores exercitationem reiciendis sunt aperiam nisi, totam labore vel alias possimus eligendi laborum veritatis qui consequuntur maiores officiis modi sed sequi, quae soluta dicta? Quaerat nemo, ipsa quo commodi fuga exercitationem voluptas aut vero autem at sit obcaecati asperiores laboriosam similique magnam dignissimos, repellat doloribus excepturi sed? Sequi, excepturi! Atque quos quisquam dolorem quia.
                    {/*   {availableOptions.map((option) => {
                        if (typeof option === "string") {
                            return (
                                <Button
                                    key={option}
                                    className={style.dropdown__item}
                                    onClick={addValue(option)}
                                >
                                    {option}
                                </Button>
                            )
                        }
                        return (
                            <Button
                                key={option.name}
                                className={style.dropdown__item}
                                onClick={addValue(option.value)}
                            >
                                {option.name}
                            </Button>
                        )
                    })} */}
                </Dropdown>}
        </div>
    )
}