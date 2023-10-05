import { Title } from 'src/shared/ui/Title/TItile'
import style from './RegisterByEmail.module.scss'
import { Input } from 'src/shared/ui/Input/Input'
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button'
import googleIcon from 'src/shared/assets/googleIcon.svg'
import vkIcon from 'src/shared/assets/vkIcon.svg'
import { Link } from 'react-router-dom'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'

export const RegisterByEmail = () => {
  return (
    <div className={style.registerByEmail}>
      <Title>Регистрация</Title>
      <p className={style.registerByEmail__text}>Стань покупателем или начни продавать свое</p>
      <div className={style.registerByEmail__inputGroup}>
        <Input
          placeholder='Введите ваш E-mail'
          className={style.registerByEmail__input}
        />
        <Input
          placeholder='Введите ваше имя'
          className={style.registerByEmail__input}
        />
        <Input
          placeholder='Введите пароль'
          className={style.registerByEmail__input}
          type='password'
        />
        <Input
          placeholder='Подтвердить пароль'
          className={style.registerByEmail__input}
          type='password'
        />
        <Button
          theme={ButtonTheme.RED}
        >
          Регистрация
        </Button>
      </div>
      <Button
        theme={ButtonTheme.OUTLINE}
        className={style.registerByEmail__socialButton}
      >
        <img src={googleIcon} alt="Google" height={24} width={24} />
        Войти с помощью Google
      </Button>
      <Button
        theme={ButtonTheme.OUTLINE}
        className={style.registerByEmail__socialButton}
      >
        <img src={vkIcon} alt="VK" width={24} height={24} />
        Войти с помощью Vkontakte
      </Button>
      <GreyText className={style.registerByEmail__link}>
        Уже есть аккаунт? &nbsp;
        <Link to='/login' className='textUnderline'>Войти</Link>
      </GreyText>
    </div>
  )
}