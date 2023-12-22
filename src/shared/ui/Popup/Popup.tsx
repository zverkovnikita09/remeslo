import { classNames } from 'src/shared/lib/classNames/classNames';
import style from './Popup.module.scss'
import { Portal } from '../Portal/Portal';
import { CloseButton } from '../CloseButton/CloseButton';

export interface PopupProps {
  children?: React.ReactNode,
  isActive: boolean,
  closePopup: () => void,
}

export const Popup: React.FC<PopupProps> = ({ children, isActive, closePopup }) => {
  return (
    <Portal>
      <div
        className={classNames(style.overlay, { [style.active]: isActive })}
        onClick={closePopup}
        tabIndex={isActive ? 0 : -1}
      >
        <div className={style.content} onClick={e => e.stopPropagation()}>
          <CloseButton className={style.popup__close} onClick={closePopup} />
          {children}
        </div>
      </div>
    </Portal>
  )
}