import { useEffect, useState } from 'react'
import style from './Geolocation.module.scss'
import { GeolocationPopover } from './GeolocationPopover/GeolocationPopover'
import { GeoIcon } from 'src/shared/ui/GeoIcon/GeoIcon'
import { useLocalStorage } from 'src/shared/useLocalStorage'
import { getData } from 'src/shared/lib/api/api'


interface cityResponseData{
  location: {
    data:{
      city: string
    }
  }
}

const getUserIp = async () => {
  const data: { ip: string } = await getData({baseUrl: '', url: 'https://api.ipify.org?format=json&callback=getIP' })

  return data?.ip;
}

const API_KEY = 'bfb0bf13ebd33709d153118f550bf36c73f78430'

const getUserCity = async (ipAdress: string, token: string) => {
  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";

  const data = await getData<cityResponseData>({
    baseUrl: '',
    url: url + ipAdress,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Token " + token
    }
  })
  
  return data;
}

export const Geolocation = () => {
  const [city, setCity] = useLocalStorage('city', '');
  const [proposedCity, setProposedCity] = useState('');
  const [isCityPopover, setCityPopover] = useState(false);
  

  useEffect(() => {
    async function getCityWrapper() {
      const userIp = await getUserIp();
      const userCity = await getUserCity(userIp, API_KEY)
      setProposedCity(userCity.location.data.city);
      
    }
    getCityWrapper()
  }, [])

  useEffect(() => {
    if (!city && proposedCity) {
      setCityPopover(true)
    }
  }, [city, proposedCity])



  const closePopover = () => {
    setCityPopover(false)
  }

  return (
    <div className={style.geolocation}>
      {
        city ?       
        <>
        <GeoIcon />
        {city}
        </> :
        'Выбрать город'
      }

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