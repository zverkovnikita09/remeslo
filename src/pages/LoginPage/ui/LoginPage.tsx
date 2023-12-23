import { Container } from 'src/shared/ui/Container/Container'
import { MainLogo } from 'src/shared/ui/MainLogo/MainLogo'
import style from './LoginPage.module.scss'
import background from '../assets/login_background.png'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Outlet } from 'react-router-dom'
import { Select } from 'src/shared/ui/Select/Select'

export const LoginPage = () => {
  return (
    <Container className={style.loginPage}>
      <div className={style.loginPage__content}>
        <MainLogo />
        <Outlet />
{/*         <Select /> */}
        <GreyText>© 2023 Remeslo</GreyText>
      </div>
      <div className={style.loginPage__image}>
        <img src={background} height={832} width={687} alt="Фоновое изображение" />
      </div>
    </Container>
  )
}