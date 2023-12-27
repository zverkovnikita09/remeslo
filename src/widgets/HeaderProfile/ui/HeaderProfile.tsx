import style from './HeaderProfile.module.scss'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ProfileInfo } from 'src/app/providers/AuthProvider'
import { Button } from 'src/shared/ui/Button/Button'
import { UserPhoto } from 'src/shared/ui/UserPhoto/UserPhoto'
import { useToggleDropdown } from 'src/shared/hooks/useToggleDropdown'
import { Dropdown } from 'src/shared/ui/Dropdown/Dropdown'
/* import FocusTrap from '@mui/material/Unstable_TrapFocus' */

interface HeaderProfileProps {
  profileInfo?: ProfileInfo
  logout?: () => void
}

export const HeaderProfile = ({ profileInfo, logout }: HeaderProfileProps) => {
  const [isDropdownOpen, toggleDropdown] = useToggleDropdown()
  const listButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className={style.headerProfile}>
      <Button className={style.headerProfile__button} ref={listButtonRef} onClick={toggleDropdown}>
        <UserPhoto profileInfo={profileInfo} />
        <p className={style.headerProfile__name}>{profileInfo?.firstname}</p>
      </Button>
      <Dropdown
        isOpen={isDropdownOpen}
        onClose={toggleDropdown}
        targetRef={listButtonRef}
        className={style.headerProfile__dropdown}
        width={256}
        maxHeight={310}
      >
        {/* <FocusTrap open={isDropdownOpen}> */}
        <div>
          <Link to='' className={style.headerProfile__link} onClick={toggleDropdown}>Личный кабинет</Link>
          <Link to='' className={style.headerProfile__link} onClick={toggleDropdown}>Мои объявления</Link>
          <Link to='' className={style.headerProfile__link} onClick={toggleDropdown}>Сообщения</Link>
          <Link to='' className={style.headerProfile__link} onClick={toggleDropdown}>Избранное</Link>
          <Link to='' className={style.headerProfile__link} onClick={toggleDropdown}>Уведомления</Link>
          <Link to='' className={style.headerProfile__link} onClick={toggleDropdown}>Настройки</Link>
          <Button className={style.headerProfile__link} onClick={logout}>Выйти</Button>
        </div>
        {/*   </FocusTrap> */}
      </Dropdown>

    </div>
  )
}