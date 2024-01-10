import { Container } from 'src/shared/ui/Container/Container'
import { MainLogo } from 'src/shared/ui/MainLogo/MainLogo'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import background from '../assets/registration_background.png'
import style from './RegistrationPage.module.scss'
import { RegisterByEmail } from 'src/features/RegisterByEmail'

export const RegistrationPage = () => {
  return (
    <Container className={style.registrationPage}>
      <div className={style.registrationPage__content}>
        <MainLogo className={style.registrationPage__logo} />
        <RegisterByEmail />
        <GreyText>© 2023 Remeslo</GreyText>
      </div>
      <div className={style.registrationPage__image}>
        <img src={background} width={687} height={832} alt="Фоновое изображение" />
      </div>
    </Container>
  )
}