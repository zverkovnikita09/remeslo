import { Button, ButtonSize, ButtonTheme } from "../Button"
import { HeartIcon } from "../HeartIcon"
import { Popup, PopupProps } from "../Popup"
import style from './ConfirmPopup.module.scss'

export interface ConfirmPopupProps extends Omit<PopupProps, "children"> {
  confirmText: string
  primaryButtonText?: string
  onPrimaryButtonClick?: () => void
  secondaryButtonText?: string
  onSecondaryButtonClick?: () => void
}

export const ConfirmPopup = ({
  confirmText,
  onPrimaryButtonClick,
  primaryButtonText,
  onSecondaryButtonClick,
  secondaryButtonText,
  closePopup,
  ...props
}: ConfirmPopupProps) => {

  const onCancel = () => {
    onSecondaryButtonClick?.();
    closePopup()
  }

  const onConfirm = () => {
    onPrimaryButtonClick?.()
    closePopup()
  }

  return (
    <Popup {...props} closePopup={closePopup}>
      <div className={style.confirmPopup}>
        <HeartIcon iconHeight={51} iconWidth={51} />
        <p className={style.text}>{confirmText}</p>
        <div className={style.buttons}>
          <Button
            theme={ButtonTheme.OUTLINE}
            size={ButtonSize.S}
            onClick={onCancel}
          >
            {secondaryButtonText || 'Отменить'}
          </Button>
          <Button
            theme={ButtonTheme.BLACK}
            size={ButtonSize.S}
            onClick={onConfirm}
          >
            {primaryButtonText || 'Подтвердить'}
          </Button>
        </div>
      </div>
    </Popup>
  )
}