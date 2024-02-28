import style from './GeolocationPopup.module.scss'
import { Input } from '@shared/ui/Input'
import { Button } from '@shared/ui/Button'
import { Title, TitleSize } from '@shared/ui/Title'
import { Popup } from '@shared/ui/Popup'
import { useCookies } from 'next-client-cookies';

interface GeolocationPopupProps {
  isActive: boolean
  closePopup: () => void
}

const cities = [
  { city: 'Москва', region: 'Москва' },
  { city: 'Ростов-на-Дону', region: 'Ростовская область' },
  { city: 'Краснодар', region: 'Краснодарский край' },
  { city: 'Воронеж', region: 'Воронежская область' },
  { city: 'Липецк', region: 'Липецкая область' },
]

export const GeolocationPopup = ({ closePopup, isActive }: GeolocationPopupProps) => {
  const { set: setCookie } = useCookies();
  
  const chooseCity = (city: string) => {
    setCookie('city', city);
    closePopup();
  }
  
  return (
    <Popup isActive={isActive} closePopup={closePopup}>
      <div className={style.geolocationPopup}>
        <Title size={TitleSize.S}>Выберите город</Title>
        <Input placeholder='Ваш город' />
        {cities.map(({ city, region }, index) => {
          return (
            <Button
              key={index}
              className={style.item}
              onClick={() => chooseCity(city)}
            >
              <p className={style.itemName}>{city}</p>
              {region}
            </Button>
          )
        })}
      </div>
    </Popup>
  )
}