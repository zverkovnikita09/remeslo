"use client"
import { ProfileInfo } from '@shared/models/user.model'
import style from './HeaderProfile.module.scss'
import { useToggleDropdown } from '@shared/hooks/useToggleDropdown'
import { useRef } from 'react'
import { Button } from '@shared/ui/Button'
import { UserPhoto } from '@shared/ui/UserPhoto'
import { Dropdown } from '@shared/ui/Dropdown'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
/* import FocusTrap from '@mui/material/Unstable_TrapFocus' */

interface HeaderProfileProps {
  profileInfo?: ProfileInfo
}

export const HeaderProfile = ({ profileInfo: staticProfileInfo }: HeaderProfileProps) => {
  const { data } = useSession();
  const [isDropdownOpen, toggleDropdown] = useToggleDropdown()
  const listButtonRef = useRef<HTMLButtonElement>(null)

  const profileInfo = staticProfileInfo || data?.user.user?.profile;

  return (
    <div className={style.headerProfile}>
      <Button className={style.button} buttonRef={listButtonRef} onClick={toggleDropdown}>
        <UserPhoto avatar={profileInfo?.avatar} />
        <p className={style.name}>{profileInfo?.firstname}</p>
      </Button>
      <Dropdown
        isOpen={isDropdownOpen}
        onClose={toggleDropdown}
        targetRef={listButtonRef}
        className={style.dropdown}
        width={256}
        maxHeight={310}
      >
        {/* <FocusTrap open={isDropdownOpen}> */}
        <div>
          <Link href='/profile' className={style.link} onClick={toggleDropdown}>Мои объявления</Link>
          <Link href='/chat' className={style.link} onClick={toggleDropdown}>Сообщения</Link>
          <Link href='/profile/favorite' className={style.link} onClick={toggleDropdown}>Избранное</Link>
          <Link href='/profile/notifications' className={style.link} onClick={toggleDropdown}>Уведомления</Link>
          <Link href='/profile/settings' className={style.link} onClick={toggleDropdown}>Настройки</Link>
          <Button className={style.link} onClick={() => signOut()}>Выйти</Button>
        </div>
        {/*   </FocusTrap> */}
      </Dropdown>
    </div>
  )
}