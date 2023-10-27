import { useState } from 'react'
import style from './Geolocation.module.scss'
import geoIcon from 'src/shared/assets/location.svg'
import { GeolocationPopover } from './GeolocationPopover/GeolocationPopover'
import { GeoIcon } from 'src/shared/ui/GeoIcon/GeoIcon'

export const Geolocation = () => {
  const [city] = useState("Ростов-на-Дону")
  // const [city, setCity] = useState("Ростов-на-Дону")
  const [isCityPopover, setCityPopover] = useState(true)

  const closePopover = () => {
    setCityPopover(false)
  }

  return (
    <div className={style.geolocation}>
      <GeoIcon />
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