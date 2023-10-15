import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import style from './GeolocationPopover.module.scss'
import { CloseButton } from 'src/shared/ui/CloseButton/CloseButton'
import { classNames } from 'src/shared/lib/classNames/classNames'

interface GeolocationPopoverProps {
  region: string
  className?: string
  onClose?: () => void
}

export const GeolocationPopover = ({ region, className = '', onClose }: GeolocationPopoverProps) => {
  return (
    <div className={classNames(style.geolocationPopover, {}, [className])}>
      <CloseButton
        className={style.geolocationPopover__close}
        onClick={onClose}
      />
      <p className={style.geolocationPopover__text}>
        Ваш регион <br /> {region}
      </p>
      <div className={style.geolocationPopover__buttonContainer}>
        <Button
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
        >
          Изменить
        </Button>
        <Button
          theme={ButtonTheme.BLACK}
          size={ButtonSize.S}
          onClick={onClose}
        >
          Верно
        </Button>
      </div>
    </div>
  )
}