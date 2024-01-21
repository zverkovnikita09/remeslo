import { useEffect, useState } from 'react'
import style from './Geolocation.module.scss'
import { GeolocationPopover } from './GeolocationPopover/GeolocationPopover'
/* import { GeoIcon } from 'src/shared/ui/GeoIcon/GeoIcon'
import { useLocalStorage } from 'src/shared/hooks/useLocalStorage' */
import { getUserCity, getUserIp } from '../lib/api'
import { GeolocationPopup } from './GeolocationPopup/GeolocationPopup'
import { Button } from '@shared/ui/Button'

export const Geolocation = () => {
  const [city, setCity] = useState('city');
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
        setCity={setCity}
      />
      <Button
        className={style.geolocation__button}
        onClick={togglePopup}
      >
        {
          city ?
            <>
              {/* <GeoIcon /> */}
              {city}
            </> :
            'Выбрать город'
        }
      </Button>
      {
        isCityPopover &&
        <GeolocationPopover
          city={proposedCity}
          className={style.geolocation__popover}
          onClose={togglePopover}
          setCity={setCity}
        />
      }
    </div>
  )
}