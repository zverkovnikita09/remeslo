import { classNames } from 'src/shared/lib/classNames/classNames';
import style from './Dropdown.module.scss'
import { PropsWithChildren, RefObject, useEffect, useLayoutEffect, useState } from 'react';

interface SelectDropdownProps {
  targetRef: RefObject<HTMLElement>
  horizontalPosition?: "left" | "right"
  width?: number | "auto" | "100%"
  maxHeight?: number
  className?: string
  isOpen: boolean
  onClose: () => void
  closeOnItemClick?: boolean
}

export const Dropdown = (props: PropsWithChildren<SelectDropdownProps>) => {
  const {
    targetRef,
    horizontalPosition = "right",
    children,
    width = "auto",
    maxHeight = 300,
    className = '',
    isOpen,
    onClose,
    closeOnItemClick = true,
  } = props;

  const [vertivalPosition, setVerticalPosition] = useState<"top" | "bottom">("top")

  const calcCoords = () => {
    const rect = targetRef.current?.getBoundingClientRect();

    /**
     * Проверка достаточно ли места для отображения контента (8 - размер margin)
     */
    if (window.innerHeight - rect!.bottom < maxHeight + 8) {
      setVerticalPosition("bottom")
    }
    else {
      setVerticalPosition("top")
    }
  }

  useLayoutEffect(() => {
    targetRef.current && calcCoords();
  }, [])

  useEffect(() => {
    const closeDropdownByOutsideClick = (e: MouseEvent) => {
      if (e.target === targetRef.current) return
      onClose()
    }

    if (isOpen) document.addEventListener("click", closeDropdownByOutsideClick)

    return () => document.removeEventListener("click", closeDropdownByOutsideClick)
  }, [isOpen])

  const stopClickPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    !closeOnItemClick && e.stopPropagation()
  }

  if (!isOpen) return null

  return (
    <div
      onClick={stopClickPropagation}
      className={classNames(style.dropdown, {}, [className, style[vertivalPosition]])}
      style={{ [horizontalPosition]: 0, width, maxHeight }}>
      {children}
    </div>
  )
}