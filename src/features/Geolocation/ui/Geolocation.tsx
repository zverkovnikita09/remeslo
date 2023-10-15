import { useState } from 'react'
import style from './Geolocation.module.scss'
import geoIcon from 'src/shared/assets/location.svg'
import { GeolocationPopover } from './GeolocationPopover/GeolocationPopover'

export const Geolocation = () => {
  const [city, setCity] = useState("Ростов-на-Дону")
  const [isCityPopover, setCityPopover] = useState(true)

  const closePopover = () => {
    setCityPopover(false)
  }

  return (
    <div className={style.geolocation}>
      <img src={geoIcon} alt="Геолокация" />
      <p className={style.geolocation__city}>{city}</p>
      {
        isCityPopover &&
        <GeolocationPopover
          region={city}
          className={style.geolocation__popover}
          onClose={closePopover}
        />
      }
    </div>
  )
}