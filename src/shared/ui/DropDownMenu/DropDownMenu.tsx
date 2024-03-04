import { JSXElementConstructor, ReactChild, ReactElement, ReactNode, useRef } from 'react'
import style from './DropDownMenu.module.scss'
import { Button, ButtonTheme } from '../Button'
import cn from 'classnames'
import { useToggleDropdown } from '@shared/hooks/useToggleDropdown'
import Image from 'next/image'
import { Dropdown } from '../Dropdown'

interface DropDownMenuProps {
  buttonImage?: string | ReactElement<any, string | JSXElementConstructor<any>>
  children?: (toggleDropdown: () => void, itemClassName?: string) => ReactNode
}

export const DropDownMenu = ({ buttonImage, children }: DropDownMenuProps) => {
  const elementRef = useRef<HTMLButtonElement>(null)
  const [isDropdownOpen, toggleDropdown] = useToggleDropdown();

  return (
    <div className={style.dropDownMenu}>
      <Button
        className={cn(style.button, { [style.open]: isDropdownOpen })}
        theme={ButtonTheme.GREY}
        onClick={toggleDropdown}
        buttonRef={elementRef}
      >
        {
          buttonImage && typeof buttonImage === "string" ?
            <Image src={buttonImage} alt='' width={24} height={24} />
            : buttonImage
        }
      </Button>
      <Dropdown
        className={style.dropdown}
        isOpen={isDropdownOpen}
        targetRef={elementRef}
        onClose={toggleDropdown}
      >
        {/* <FocusTrap open={isDropdownOpen}> */}
        <div>
          {children?.(toggleDropdown, style.linkButton)}
        </div>
        {/* </FocusTrap> */}
      </Dropdown>
    </div>
  )
}