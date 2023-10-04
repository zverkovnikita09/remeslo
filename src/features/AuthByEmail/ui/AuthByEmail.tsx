import { Input } from 'src/shared/ui/Input/Input'
import { Title } from 'src/shared/ui/Title/TItile'
import style from './AuthByEmail.module.scss'
import { Link } from 'react-router-dom'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { classNames } from 'src/shared/lib/classNames/classNames'

export const AuthByEmail = () => {
  return (
    <div className={style.authByEmail}>
      <Title className={style.authByEmail__title}>Войти</Title>
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
      </div>
      <Link to='' className={classNames(style.authByEmail__link, {}, [style.textUnderline])}>
        <GreyText>Забыли пароль?</GreyText>
      </Link>
      <GreyText className={style.authByEmail__link}>
        Еще нет аккаунта? &nbsp;
        <Link to='/registration' className={style.textUnderline}>Зарегестрируйтесь</Link>
      </GreyText>
    </div>
  )
}