import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useToggleDropdown } from "src/shared/hooks/useToggle";
import { Dropdown } from "src/shared/ui/Dropdown/Dropdown";
import style from './ReviewSortDropdown.module.scss'
import { classNames } from "src/shared/lib/classNames/classNames";
import { Button } from "src/shared/ui/Button/Button";
import FocusTrap from "@mui/material/Unstable_TrapFocus";

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
    <Button
      ref={elementRef}
      className={style.reviewSortDropdown}
      onClick={toggleDropdown}
    >
      {selectedValue}
      <Dropdown
        isOpen={isDropdownOpen}
        onClose={toggleDropdown}
        targetRef={elementRef}
        horizontalPosition="left"
        className={style.reviewSortDropdown__dropdown}
        width={225}
        closeOnItemClick={false}
      >
        <FocusTrap open={isDropdownOpen}>
          <div>
            {options.map(option => (
              <Button
                key={option}
                className={classNames(style.reviewSortDropdown__item, { [style.selected]: selectedValue === option })}
                contentClassname={style.reviewSortDropdown__itemText}
                onClick={handleSelectValue(option)}
                tabIndex={selectedValue === option ? -1 : 0}
              >
                {option}
                {selectedValue === option && <FaCheck />}
              </Button>
            ))}
          </div>
        </FocusTrap>
      </Dropdown>
    </Button>
  )
}