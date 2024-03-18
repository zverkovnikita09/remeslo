"use client"
import { useEffect, useState } from 'react'
import style from './Geolocation.module.scss'
import { GeolocationPopover } from './GeolocationPopover/GeolocationPopover'
import { getUserCity, getUserIp } from '../lib/api'
import { GeolocationPopup } from './GeolocationPopup/GeolocationPopup'
import { Button } from '@shared/ui/Button'
import { GeoIcon } from '@shared/ui/GeoIcon'
import { useCookies } from 'next-client-cookies'
import { usePopupState } from '@shared/hooks/usePopupState'

export const Geolocation = () => {
  const { get: getCookie } = useCookies();
  const city = getCookie("city");
  const [proposedCity, setProposedCity] = useState('');
  const [isCityPopover, setCityPopover] = useState(false);
  const { isOpen: isCityPopup, closePopup, openPopup } = usePopupState();

  useEffect(() => {
    async function getCityWrapper() {
      const userIp = await getUserIp();
      const userCity = await getUserCity(userIp)
      setProposedCity(userCity.location.data.city);
    }
    getCityWrapper()
  }, [])

  useEffect(() => {
    if (!city && proposedCity) {
      setCityPopover(true)
    }
    else {
      setCityPopover(false);
    }
  }, [city, proposedCity])

  const togglePopover = () => {
    setCityPopover(pr => !pr);
  }

  return (
    <div className={style.geolocation}>
      <GeolocationPopup
        isActive={isCityPopup}
        closePopup={closePopup}
      />
      <Button
        className={style.button}
        onClick={closePopup}
      >
        {
          city ?
            <>
              <GeoIcon />
              {city}
            </> :
            'Выбрать город'
        }
      </Button>
      {
        isCityPopover &&
        <GeolocationPopover
          city={proposedCity}
          className={style.popover}
          onClose={togglePopover}
          openPopup={openPopup}
        />
      }
    </div>
  )
}