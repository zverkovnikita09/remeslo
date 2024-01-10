import { MainLogo } from 'src/shared/ui/MainLogo/MainLogo'
import style from './Header.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { Link } from 'react-router-dom'
import { HeaderProfile } from 'src/widgets/HeaderProfile/ui/HeaderProfile'
import { SearchInput } from 'src/features/SearchInput'
import { Geolocation } from 'src/features/Geolocation'
import { useAuth } from 'src/app/providers/AuthProvider'
import { Spinner } from 'src/shared/ui/Spinner/Spinner'

export const Header = () => {
  const { user, isFetching, logout, isAuthed } = useAuth();

  return (
    <Container className={style.header}>
      <MainLogo />
      <div className={style.header__rightBlock}>
        <Geolocation />
        <SearchInput />
        {isFetching ?
          <div className={style.header__spinner}>
            <Spinner />
          </div> :
          isAuthed ?
            <>
              <Button to='' className={style.header__link}
                size={ButtonSize.M}
                theme={ButtonTheme.RED}
                // @ts-ignore
                as={Link}
              >
                Разместить
              </Button>
              <HeaderProfile profileInfo={user.profile} logout={logout} />
            </>
            :
            <Button
              size={ButtonSize.M}
              theme={ButtonTheme.RED}
              // @ts-ignore
              as={Link}
              to='/login'
              className={style.header__link}
            >
              Войти
            </Button>
        }
      </div>
    </Container>
  )
}