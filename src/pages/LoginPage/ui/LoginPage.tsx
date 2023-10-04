import { AuthByEmail } from 'src/features/AuthByEmail'
import { Container } from 'src/shared/ui/Container/Container'
import { MainLogo } from 'src/shared/ui/MainLogo/MainLogo'
import style from './LoginPage.module.scss'
import background from 'src/shared/assets/login_background.png'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'

export const LoginPage = () => {
  return (
    <Container className={style.loginPage}>
      <div className={style.loginPage__content}>
        <MainLogo />
        <AuthByEmail />
        <GreyText>© 2023 Remeslo</GreyText>
      </div>
      <div className={style.loginPage__image}>
        <img src={background} alt="Фоновое изображение" />
      </div>
    </Container>
  )
}