import { classNames } from 'src/shared/lib/classNames/classNames';
import style from './Dropdown.module.scss'
import { PropsWithChildren, RefObject, useLayoutEffect, useState } from 'react';

interface SelectDropdownProps {
  targetRef: RefObject<HTMLElement>
  horizontalPosition?: "left" | "right"
  width?: number | "auto"
  maxHeight?: number
  className?: string
}

export const Dropdown = (props: PropsWithChildren<SelectDropdownProps>) => {
  const {
    targetRef,
    horizontalPosition = "right",
    children,
    width = "auto",
    maxHeight = 300,
    className = ''
  } = props;

  const [vertivalPosition, setVerticalPosition] = useState<"top" | "bottom">("top")

  const calcCoords = () => {
    const rect = targetRef.current?.getBoundingClientRect();

    /**
     * Проверка достаточно ли места для отображения контента (10 - размер margin)
     */
    if (window.innerHeight - rect!.bottom < maxHeight + 10) {
      setVerticalPosition("bottom")
    }
    else {
      setVerticalPosition("top")
    }
  }

  useLayoutEffect(() => {
    targetRef.current && calcCoords();
  }, [])

  return (
    <div
      onClick={e => e.stopPropagation()}
      className={classNames(style.dropdown, {}, [className, style[vertivalPosition]])}
      style={{ [horizontalPosition]: 0, width, maxHeight }}>
      {children}
    </div>
  )
}