import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import style from './GeolocationPopover.module.scss'
import { CloseButton } from 'src/shared/ui/CloseButton/CloseButton'
import { classNames } from 'src/shared/lib/classNames/classNames'
import { useCallback } from 'react'

interface GeolocationPopoverProps {
  city: string
  className?: string
  onClose?: () => void
  setCity?: (proposedCity: string) => void
}

export const GeolocationPopover = ({ city, className = '', onClose, setCity }: GeolocationPopoverProps) => {
  const handleSetCity = useCallback(()=>{
    setCity?.(city)
    onClose?.()
  }, [])
  return (
    <div className={classNames(style.geolocationPopover, {}, [className])}>
      <CloseButton
        className={style.geolocationPopover__close}
        onClick={onClose}
      />
      <p className={style.geolocationPopover__text}>
        Ваш регион <br /> {city}
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
          onClick={handleSetCity}
        >
          Верно
        </Button>
      </div>
    </div>
  )
}