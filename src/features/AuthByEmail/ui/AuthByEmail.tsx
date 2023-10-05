import { Input } from 'src/shared/ui/Input/Input'
import { Title } from 'src/shared/ui/Title/TItile'
import style from './AuthByEmail.module.scss'
import { Link } from 'react-router-dom'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { classNames } from 'src/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button'
import googleIcon from 'src/shared/assets/googleIcon.svg'
import vkIcon from 'src/shared/assets/vkIcon.svg'

export const AuthByEmail = () => {
  return (
    <div className={style.authByEmail}>
      <Title>Войти</Title>
      <p className={style.authByEmail__text}>Стань покупателем или начни продавать свое</p>
      <div className={style.authByEmail__inputGroup}>
        <Input
          placeholder='Введите ваш E-mail'
          className={style.authByEmail__input}
        />
        <Input
          placeholder='Введите пароль'
          className={style.authByEmail__input}
          type='password'
        />
        <Button
          theme={ButtonTheme.RED}
        >
          Войти
        </Button>
      </div>
      <Button
        theme={ButtonTheme.OUTLINE}
        className={style.authByEmail__socialButton}
      >
        <img src={googleIcon} alt="Google" height={24} width={24} />
        Войти с помощью Google
      </Button>
      <Button
        theme={ButtonTheme.OUTLINE}
        className={style.authByEmail__socialButton}
      >
        <img src={vkIcon} alt="VK" width={24} height={24} />
        Войти с помощью Vkontakte
      </Button>
      <Link to='' className={classNames(style.authByEmail__link, {}, ['textUnderline'])}>
        <GreyText>Забыли пароль?</GreyText>
      </Link>
      <GreyText className={style.authByEmail__link}>
        Еще нет аккаунта? &nbsp;
        <Link to='/registration' className='textUnderline'>Зарегестрируйтесь</Link>
      </GreyText>
    </div>
  )
}