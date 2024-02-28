"use client"
import { useEffect, useState } from 'react'
import style from './Geolocation.module.scss'
import { GeolocationPopover } from './GeolocationPopover/GeolocationPopover'
import { getUserCity, getUserIp } from '../lib/api'
import { GeolocationPopup } from './GeolocationPopup/GeolocationPopup'
import { Button } from '@shared/ui/Button'
import { GeoIcon } from '@shared/ui/GeoIcon'
import { useCookies } from 'next-client-cookies'

export const Geolocation = () => {
  const { get: getCookie } = useCookies();
  const city = getCookie("city");
  const [proposedCity, setProposedCity] = useState('');
  const [isCityPopover, setCityPopover] = useState(false);
  const [isCityPopup, setCityPopup] = useState(false);

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

  const togglePopup = () => {
    setCityPopup(pr => !pr);
  }

  return (
    <div className={style.geolocation}>
      <GeolocationPopup
        isActive={isCityPopup}
        closePopup={togglePopup}
      />
      <Button
        className={style.button}
        onClick={togglePopup}
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
          openPopup={togglePopup}
        />
      }
    </div>
  )
}