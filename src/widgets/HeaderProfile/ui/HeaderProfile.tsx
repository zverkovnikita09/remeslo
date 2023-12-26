import style from './HeaderProfile.module.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import { classNames } from 'src/shared/lib/classNames/classNames'
import { ProfileInfo } from 'src/app/providers/AuthProvider'
import { Button } from 'src/shared/ui/Button/Button'
import { UserPhoto } from 'src/shared/ui/UserPhoto/UserPhoto'

interface HeaderProfileProps {
  profileInfo?: ProfileInfo
  logout?: () => void
}

export const HeaderProfile = ({ profileInfo, logout }: HeaderProfileProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const listButtonRef = useRef<HTMLParagraphElement>(null)

  const toggleList = () => {
    setIsOpen(pr => !pr)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const closeOutsideClick = useCallback((e: any) => {
    const currentTarget = e.target;
    if (!currentTarget.closest(`.${style.headerProfile__linksContainer}`) && currentTarget !== listButtonRef.current) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', closeOutsideClick)
    }
    else {
      document.removeEventListener('click', closeOutsideClick)
    }
  }, [isOpen, closeOutsideClick])

  return (
    <div className={style.headerProfile}>
      <UserPhoto profileInfo={profileInfo} />
      <p className={style.headerProfile__name} onClick={toggleList} ref={listButtonRef}>{profileInfo?.firstname}</p>
      <div className={classNames(style.headerProfile__linksContainer, { [style.open]: isOpen })}>
        <div className={style.headerProfile__linksInner}>
          <Link to='' className={style.headerProfile__link} onClick={toggleList}>Личный кабинет</Link>
          <Link to='' className={style.headerProfile__link} onClick={toggleList}>Мои объявления</Link>
          <Link to='' className={style.headerProfile__link} onClick={toggleList}>Сообщения</Link>
          <Link to='' className={style.headerProfile__link} onClick={toggleList}>Избранное</Link>
          <Link to='' className={style.headerProfile__link} onClick={toggleList}>Уведомления</Link>
          <Link to='' className={style.headerProfile__link} onClick={toggleList}>Настройки</Link>
          <Button className={style.headerProfile__link} onClick={logout}>Выйти</Button>
        </div>
      </div>
    </div>
  )
}