import { classNames } from 'src/shared/lib/classNames/classNames';
import style from './Popup.module.scss'
import { Portal } from '../Portal/Portal';
import { CloseButton } from '../CloseButton/CloseButton';
import { MouseEvent, useCallback, useEffect, useRef } from 'react';
/* import FocusTrap from '@mui/material/Unstable_TrapFocus'; */

export interface PopupProps {
  children?: React.ReactNode,
  isActive: boolean,
  closePopup: () => void,
}

export const Popup: React.FC<PopupProps> = ({ children, isActive, closePopup }) => {
  const overlayRef = useRef<HTMLDivElement>(null)

  const closePopupOnEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closePopup()
  }, [closePopup])

  useEffect(() => {
    if (isActive) document.addEventListener("keydown", closePopupOnEsc)
    return () => document.removeEventListener("keydown", closePopupOnEsc)
  }, [closePopupOnEsc, isActive])

  const closePopupByOverlayClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === overlayRef.current) closePopup()
  }

  return (
    <Portal>
{/*       <FocusTrap open={isActive}> */}
        <div
          className={classNames(style.overlay, { [style.active]: isActive })}
          onClick={closePopupByOverlayClick}
          ref={overlayRef}
        >
          <div className={style.content}>
            <CloseButton className={style.popup__close} onClick={closePopup} />
            {children}
          </div>
        </div>
{/*       </FocusTrap> */}
    </Portal>
  )
}