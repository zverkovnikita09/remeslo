import { Container } from 'src/shared/ui/Container/Container'
import { MainLogo } from 'src/shared/ui/MainLogo/MainLogo'
import style from './LoginPage.module.scss'
import background from '../assets/login_background.png'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Outlet } from 'react-router-dom'

export const LoginPage = () => {
  return (
    <Container className={style.loginPage}>
      <div className={style.loginPage__content}>
        <MainLogo className={style.loginPage__logo} />
        <Outlet />
        <GreyText>© 2023 Remeslo</GreyText>
      </div>
      <div className={style.loginPage__image}>
        <img src={background} alt="Фоновое изображение" />
      </div>
    </Container>
  )
}