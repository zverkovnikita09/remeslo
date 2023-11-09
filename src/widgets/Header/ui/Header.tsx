import { MainLogo } from 'src/shared/ui/MainLogo/MainLogo'
import style from './Header.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { Link } from 'react-router-dom'
import { HeaderProfile } from 'src/widgets/HeaderProfile/ui/HeaderProfile'
import { SearchInput } from 'src/features/SearchInput'
import { Geolocation } from 'src/features/Geolocation'
import { useContext } from 'react'
import { AuthContext } from 'src/app/providers/AuthProvider'

export const Header = () => {
  const { user } = useContext(AuthContext);
  const isAuthed = Boolean(Object.keys(user).length);

  return (
    <Container className={style.header}>
      <MainLogo />
      <div className={style.header__rightBlock}>
        <Geolocation />
        <SearchInput />
        {isAuthed ?
          <>
            <Link to='' className={style.header__link}>
              <Button
                size={ButtonSize.M}
                theme={ButtonTheme.RED}
              >
                Разместить
              </Button>
            </Link>
            <HeaderProfile profileInfo={user.profile} />
          </>
          :
          <Link to='/login' className={style.header__link}>
            <Button
              size={ButtonSize.M}
              theme={ButtonTheme.RED}
            >
              Войти
            </Button>
          </Link>
        }
      </div>
    </Container>
  )
}