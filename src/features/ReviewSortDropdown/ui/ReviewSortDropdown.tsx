import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import style from './ReviewSortDropdown.module.scss'
import {useToggleDropdown} from "@shared/hooks/useToggleDropdown";
import {Button} from "@shared/ui/Button";
import {Dropdown} from "@shared/ui/Dropdown";
import cn from "classnames";


interface ReviewSortDropdown {
  onValueChange?: (value: string) => void
}

const options = ["Сначала новые", "Сначала старые", "Сначала хорошие", "Сначала плохие"]

export const ReviewSortDropdown = ({ onValueChange }: ReviewSortDropdown) => {
  const [isDropdownOpen, toggleDropdown] = useToggleDropdown()
  const [selectedValue, setSelectedValue] = useState(options[0])
  const elementRef = useRef<HTMLButtonElement>(null)

  const handleSelectValue = (value: string) => () => {
    setSelectedValue(value);
    onValueChange?.(value)
    toggleDropdown()
  }

  return (
    <div className={style.reviewSortDropdown}>
      <Button
        buttonRef={elementRef}
        className={style.button}
        onClick={toggleDropdown}
      >
        {selectedValue}
      </Button>
      <Dropdown
        isOpen={isDropdownOpen}
        onClose={toggleDropdown}
        targetRef={elementRef}
        horizontalPosition="left"
        className={style.dropdown}
        width={225}
      >
        {/*         <FocusTrap open={isDropdownOpen}> */}
        <div>
          {options.map(option => (
            <Button
              key={option}
              className={cn(style.item, { [style.selected]: selectedValue === option })}
              onClick={handleSelectValue(option)}
              /* tabIndex={selectedValue === option ? -1 : 0} */
            >
              {option}
              {selectedValue === option && <FaCheck />}
            </Button>
          ))}
        </div>
        {/*         </FocusTrap> */}
      </Dropdown>
    </div>
  )
}