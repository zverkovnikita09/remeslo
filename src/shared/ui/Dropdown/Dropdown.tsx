import { classNames } from 'src/shared/lib/classNames/classNames';
import style from './Dropdown.module.scss'
import { PropsWithChildren, RefObject, useLayoutEffect, useRef, useState } from 'react';
import { useDocumentEvent } from 'src/shared/hooks/useDocumentEvent';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

interface SelectDropdownProps {
  targetRef: RefObject<HTMLElement>
  horizontalPosition?: "left" | "right"
  width?: number | "auto" | "100%"
  maxHeight?: number
  className?: string
  isOpen: boolean
  onClose: () => void
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
  } = props;

  const [vertivalPosition, setVerticalPosition] = useState<"top" | "bottom">("top")
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  };

  useDocumentEvent('keydown', closeOnEsc, isOpen);

  if (!isOpen) return null

  return (
    <ClickAwayListener onClickAway={onClose}>
      <div
        ref={dropdownRef}
        className={classNames(style.dropdown, {}, [className, style[vertivalPosition]])}
        style={{ [horizontalPosition]: 0, width, maxHeight }}>
        {children}
      </div>

    </ClickAwayListener>
  )
}