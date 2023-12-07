import { Popup } from 'src/shared/ui/Popup/Popup'
import style from './GeolocationPopup.module.scss'
import { Title, TitleSize } from 'src/shared/ui/Title/TItle'
import { CloseButton } from 'src/shared/ui/CloseButton/CloseButton'
import { Input } from 'src/shared/ui/Input/Input'
import { Button } from 'src/shared/ui/Button/Button'

interface GeolocationPopupProps {
    isActive: boolean
    closePopup: () => void
    setCity: (city: string) => void
}

const cities = [
    { city: 'Москва', region: 'Москва' },
    { city: 'Ростов-на-Дону', region: 'Ростовская область' },
    { city: 'Краснодар', region: 'Краснодарский край' },
    { city: 'Воронеж', region: 'Воронежская область' },
    { city: 'Липецк', region: 'Липецкая область' },
]

export const GeolocationPopup = ({ closePopup, isActive, setCity }: GeolocationPopupProps) => {
    const chooseCity = (city: string) => {
        setCity(city);
        closePopup();
    }
    return (
        <Popup isActive={isActive} closePopup={closePopup}>
            <div className={style.geolocationPopup}>
                <CloseButton className={style.geolocationPopup__close} />
                <Title size={TitleSize.S}>Выберите город</Title>
                <Input placeholder='Ваш город' />
                {cities.map(({ city, region }, index) => {
                    return (
                        <Button
                            key={index}
                            className={style.geolocationPopup__item}
                            onClick={() => chooseCity(city)}
                        >
                            <p className={style.geolocationPopup__itemName}>{city}</p>
                            {region}
                        </Button>
                    )
                })}
            </div>
        </Popup>
    )
}