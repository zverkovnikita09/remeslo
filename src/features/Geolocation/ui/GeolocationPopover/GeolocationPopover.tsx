import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import style from './GeolocationPopover.module.scss'
import cn from 'classnames'
import { useCallback } from 'react'
import { CloseButton } from '@shared/ui/CloseButton'
import { useCookies } from 'next-client-cookies'

interface GeolocationPopoverProps {
  city: string
  className?: string
  onClose?: () => void
  openPopup: () => void
}

export const GeolocationPopover = ({ city, className, onClose, openPopup }: GeolocationPopoverProps) => {
  const { set: setCookie } = useCookies();

  const handleSetCity = useCallback(() => {
    setCookie('city', city);
    onClose?.()
  }, [])

  return (
    <div className={cn(style.geolocationPopover, className)}>
      <CloseButton
        className={style.close}
        onClick={onClose}
      />
      <p className={style.text}>
        Ваш регион <br /> {city}
      </p>
      <div className={style.buttonContainer}>
        <Button
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
          onClick={openPopup}
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