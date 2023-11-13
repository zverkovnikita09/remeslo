import { useEffect, useState } from 'react'
import style from './Geolocation.module.scss'
import { GeolocationPopover } from './GeolocationPopover/GeolocationPopover'
import { GeoIcon } from 'src/shared/ui/GeoIcon/GeoIcon'
import { useLocalStorage } from 'src/shared/useLocalStorage'
import { getUserCity, getUserIp } from '../lib/api'
import { GeolocationPopup } from './GeolocationPopup/GeolocationPopup'
import { Button } from 'src/shared/ui/Button/Button'

export const Geolocation = () => {
  const [city, setCity] = useLocalStorage('city', '');
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
    else{
      setCityPopover(false);
    }
  }, [city, proposedCity])



  const closePopover = () => {
    setCityPopover(false);
  }

  const openPopup = () => {

    setCityPopup(true);
  }
  const closePopup = () => {
    setCityPopup(false);
  }

  return (
    <div className={style.geolocation}>
      <GeolocationPopup
        isActive={isCityPopup}
        closePopup={closePopup}
        setCity={setCity}
      />
      <Button
        className={style.geolocation__button}
        onClick={openPopup}
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
          className={style.geolocation__popover}
          onClose={closePopover}
          setCity={setCity}
        />
      }
    </div>
  )
}