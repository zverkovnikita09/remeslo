import { Container } from '@shared/ui/Container';
import { MainLogo } from "@shared/ui/MainLogo";
import style from './Header.module.scss'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import Link from 'next/link';
import { SearchInput } from '@features/SearchInput';
import { Geolocation } from '@features/Geolocation';

interface HeaderProps {
  isAuthed: boolean
}

export const Header = ({ isAuthed }: HeaderProps) => {
  return (
    <Container className={style.header}>
      <MainLogo />
      <div className={style.rightBlock}>
        {/* <Geolocation /> */}
        <SearchInput />
        <Button
          href={isAuthed ? '' : '/login'}
          className={style.link}
          size={ButtonSize.M}
          theme={ButtonTheme.RED}
          as={Link}
        >
          {isAuthed ? 'Разместить' : 'Войти'}
        </Button>
        {/* <HeaderProfile profileInfo={user.profile} logout={logout} /> */}
      </div>
    </Container>
  )
}