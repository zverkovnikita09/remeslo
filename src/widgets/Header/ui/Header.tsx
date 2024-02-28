"use client"
import { Container } from '@shared/ui/Container';
import { MainLogo } from "@shared/ui/MainLogo";
import style from './Header.module.scss'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import Link from 'next/link';
import { SearchInput } from '@features/SearchInput';
import { Geolocation } from '@features/Geolocation';
import { HeaderProfile } from '@features/HeaderProfile';
import { User } from '@shared/models/user.model';
import { useSession } from 'next-auth/react';

interface HeaderProps {
  isAuthed: boolean
  user?: User
}

export const Header = ({ isAuthed: isServerAuthed, user }: HeaderProps) => {
  const { status } = useSession();
  const isAuthed = isServerAuthed || status === 'authenticated';
  return (
    <Container className={style.header}>
      <MainLogo />
      <div className={style.rightBlock}>
        <Geolocation />
        <SearchInput />
        <Button
          href={isAuthed ? '/user/new-post' : '/login'}
          className={style.link}
          size={ButtonSize.M}
          theme={ButtonTheme.RED}
          as={Link}
        >
          {isAuthed ? 'Разместить' : 'Войти'}
        </Button>
        {isAuthed && <HeaderProfile profileInfo={user?.profile} />}
      </div>
    </Container>
  )
}