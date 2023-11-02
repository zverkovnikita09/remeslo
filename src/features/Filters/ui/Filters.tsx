import { Button } from 'src/shared/ui/Button/Button'
import style from './Filters.module.scss'
import { useState } from 'react'
import { FiltersPopup } from './FiltersPopup/FiltersPopup'

export const Filters = () => {
  const [isPopupActive, setIsPopupActive] = useState(false)

  const openPopup = () => {
    setIsPopupActive(true)
  }

  const closePopup = () => {
    setIsPopupActive(false)
  }

  return (
    <>
      <FiltersPopup isActive={isPopupActive} closePopup={closePopup} />
      <Button className={style.filters} onClick={openPopup}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21.6004 19.2H2.40039M21.6004 12H2.40039M21.6004 4.79999H2.40039" stroke="#122533" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Настроить
      </Button>
    </>
  )
}