import { Popup } from 'src/shared/ui/Popup/Popup'
import style from './FiltersPopup.module.scss'
import { Title, TitleSize } from 'src/shared/ui/Title/TItle'
import { CloseButton } from 'src/shared/ui/CloseButton/CloseButton'
import { Input } from 'src/shared/ui/Input/Input'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'

interface FiltersPopupProps {
  isActive: boolean
  closePopup: () => void
}

export const FiltersPopup = ({ closePopup, isActive }: FiltersPopupProps) => {
  return (
    <Popup isActive={isActive} closePopup={closePopup}>
      <div className={style.filtersPopup}>
        <CloseButton className={style.filtersPopup__close} />
        <Title size={TitleSize.S}>Настройки</Title>
        <p className={style.filtersPopup__sectionTitle}>Категории</p>
        <div className={style.filtersPopup__categories}>

        </div>
        <p className={style.filtersPopup__sectionTitle}>Цена ₽</p>
        <p className={style.filtersPopup__sectionTitle}>Состояние</p>
        <p className={style.filtersPopup__sectionTitle}>Слова в описании</p>
        <Input placeholder='Что-то важное для вас' />
        {/* <p className={style.filtersPopup__sectionTitle}>Выберите цвет</p> */}
        <div className={style.filtersPopup__buttons}>
          <Button
            theme={ButtonTheme.OUTLINE}
            size={ButtonSize.M}
          >
            Отмена
          </Button>
          <Button
            theme={ButtonTheme.RED}
            size={ButtonSize.M}
          >
            Применить
          </Button>
        </div>
      </div>
    </Popup>
  )
}